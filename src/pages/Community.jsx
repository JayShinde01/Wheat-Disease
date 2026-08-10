import React, { useEffect, useState } from "react";

import {
  getAllPosts,
  createPost,
  likePost,
  unlikePost,
  deletePost,
  getComments,
  addComment,
  deleteComment
} from "../service/communityService";

import { useTranslation } from "../i18n/LanguageContext";
import EmptyState from "../component/EmptyState";
import { ListSkeleton } from "../component/LoadingSkeleton";
import { Modal, message } from "antd";

import "../styles/Community.css";

function Community() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [expandedPost, setExpandedPost] = useState(null);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data || []);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleCreatePost(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      message.warning("Please provide both title and content for your post.");
      return;
    }

    try {
      setPosting(true);
      const newPost = await createPost(title, content, image);
      setPosts((previous) => [newPost, ...previous]);
      setTitle("");
      setContent("");
      setImage(null);
      setPreview(null);
      message.success("Post published to community!");
    } catch (error) {
      console.error("Failed to create post:", error);
      message.error("Failed to create post");
    } finally {
      setPosting(false);
    }
  }

  async function handleLike(post) {
    try {
      if (post.likedByCurrentUser) {
        await unlikePost(post.id);
      } else {
        await likePost(post.id);
      }
      loadPosts();
    } catch (error) {
      console.error("Like failed:", error);
    }
  }

  async function handleDelete(postId) {
    Modal.confirm({
      title: t("community.deleteConfirm") || "Delete this post?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deletePost(postId);
          setPosts((previous) => previous.filter((p) => p.id !== postId));
          message.success("Post deleted");
        } catch (error) {
          console.error("Delete failed:", error);
          message.error("Delete failed");
        }
      },
    });
  }

  async function handleComments(postId) {
    if (expandedPost === postId) {
      setExpandedPost(null);
      return;
    }

    try {
      const data = await getComments(postId);
      setComments((previous) => ({
        ...previous,
        [postId]: data,
      }));
      setExpandedPost(postId);
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
  }

  async function handleAddComment(postId) {
    const text = commentText[postId]?.trim();
    if (!text) return;

    try {
      const newComment = await addComment(postId, text);
      setComments((previous) => ({
        ...previous,
        [postId]: [...(previous[postId] || []), newComment],
      }));
      setCommentText((previous) => ({
        ...previous,
        [postId]: "",
      }));
      loadPosts();
    } catch (error) {
      console.error("Comment failed:", error);
    }
  }

  async function handleDeleteComment(postId, commentId) {
    try {
      await deleteComment(commentId);
      setComments((previous) => ({
        ...previous,
        [postId]: previous[postId]?.filter((c) => c.id !== commentId),
      }));
      loadPosts();
    } catch (error) {
      console.error("Delete comment failed:", error);
    }
  }

  return (
    <div className="community-page">
      {/* HEADER */}
      <header className="community-header">
        <div>
          <span className="community-label">{t("community.badge")}</span>
          <h1>{t("community.title")}</h1>
          <p>{t("community.subtitle")}</p>
        </div>

        <div className="community-stat">
          <strong>{posts.length}</strong>
          <span>{t("community.postCount")}</span>
        </div>
      </header>

      <div className="community-layout">
        {/* LEFT FEED */}
        <main className="community-feed">
          {/* CREATE POST CARD */}
          <section className="create-post-card">
            <div className="create-post-top">
              <div className="avatar">🌱</div>
              <div>
                <h3>{t("community.createTitle")}</h3>
                <p>{t("community.createSubtitle")}</p>
              </div>
            </div>

            <form onSubmit={handleCreatePost}>
              <input
                type="text"
                placeholder={t("community.titlePlaceholder")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder={t("community.contentPlaceholder")}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="3"
              />

              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="Preview" />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setPreview(null);
                    }}
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="create-post-actions">
                <label className="image-button">
                  📷 <span>{t("community.addPhoto")}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>

                <button
                  className="post-button"
                  type="submit"
                  disabled={posting}
                >
                  {posting ? t("community.posting") : t("community.postButton")}
                </button>
              </div>
            </form>
          </section>

          {/* POSTS LIST */}
          {loading ? (
            <ListSkeleton count={3} />
          ) : posts.length === 0 ? (
            <EmptyState
              icon="🌱"
              title={t("community.emptyTitle")}
              description={t("community.emptySubtitle")}
            />
          ) : (
            posts.map((post) => (
              <article className="post-card" key={post.id}>
                {/* POST HEADER */}
                <div className="post-header">
                  <div className="post-user">
                    <div className="user-avatar">
                      {post.userName?.charAt(0)?.toUpperCase() || "F"}
                    </div>
                    <div>
                      <strong>{post.userName || "Farmer"}</strong>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>

                  <button
                    className="post-menu"
                    title="Delete post"
                    onClick={() => handleDelete(post.id)}
                  >
                    ⋮
                  </button>
                </div>

                {/* POST CONTENT */}
                <div className="post-content">
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                </div>

                {/* IMAGE */}
                {post.imageUrl && (
                  <div className="post-image">
                    <img src={post.imageUrl} alt={post.title} />
                  </div>
                )}

                {/* ACTIONS */}
                <div className="post-actions">
                  <button
                    onClick={() => handleLike(post)}
                    className={post.likedByCurrentUser ? "liked" : ""}
                  >
                    ❤️ <span>{post.likeCount || 0}</span>
                  </button>

                  <button onClick={() => handleComments(post.id)}>
                    💬 <span>{post.commentCount || 0}</span>
                  </button>
                </div>

                {/* COMMENTS SECTION */}
                {expandedPost === post.id && (
                  <div className="comments-section">
                    <div className="comment-input">
                      <input
                        type="text"
                        placeholder={t("community.writeComment")}
                        value={commentText[post.id] || ""}
                        onChange={(e) =>
                          setCommentText((prev) => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddComment(post.id);
                        }}
                      />
                      <button onClick={() => handleAddComment(post.id)}>
                        {t("community.send")}
                      </button>
                    </div>

                    <div className="comments-list">
                      {(comments[post.id] || []).map((comment) => (
                        <div className="comment" key={comment.id}>
                          <div className="comment-avatar">
                            {comment.userName?.charAt(0)?.toUpperCase() || "F"}
                          </div>
                          <div className="comment-body">
                            <strong>{comment.userName}</strong>
                            <p>{comment.content}</p>
                          </div>
                          <button
                            onClick={() =>
                              handleDeleteComment(post.id, comment.id)
                            }
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="community-sidebar">
          <div className="community-info-card">
            <div style={{ fontSize: 32, marginBottom: 8 }}>🌾</div>
            <h3>{t("community.sidebarTitle")}</h3>
            <p>{t("community.sidebarDesc")}</p>

            <div className="info-items">
              <div>
                <span>🌱</span>
                <p>Share crop problems & solutions</p>
              </div>
              <div>
                <span>💡</span>
                <p>Exchange field observations</p>
              </div>
              <div>
                <span>🤝</span>
                <p>Help fellow regional farmers</p>
              </div>
            </div>
          </div>

          <div className="community-guidelines">
            <h3>{t("community.guidelinesTitle")}</h3>
            <ul>
              <li>{t("community.guideline1")}</li>
              <li>{t("community.guideline2")}</li>
              <li>{t("community.guideline3")}</li>
              <li>{t("community.guideline4")}</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "";
  const value = new Date(date);
  const now = new Date();
  const diff = Math.floor((now - value) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return value.toLocaleDateString();
}

export default Community;