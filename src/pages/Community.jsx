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

import "../styles/Community.css";


function Community() {

    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [posting, setPosting] = useState(false);

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState(null);

    const [expandedPost, setExpandedPost] =
        useState(null);

    const [comments, setComments] =
        useState({});

    const [commentText, setCommentText] =
        useState({});


    // =====================================
    // LOAD POSTS
    // =====================================

    useEffect(() => {

        loadPosts();

    }, []);


    async function loadPosts() {

        try {

            setLoading(true);

            const data =
                await getAllPosts();

            setPosts(data);

        } catch (error) {

            console.error(
                "Failed to load posts:",
                error
            );

        } finally {

            setLoading(false);
        }
    }


    // =====================================
    // IMAGE SELECT
    // =====================================

    function handleImageChange(event) {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        setImage(file);

        setPreview(
            URL.createObjectURL(file)
        );
    }


    // =====================================
    // CREATE POST
    // =====================================

    async function handleCreatePost(event) {

        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        if (!content.trim()) {
            return;
        }

        try {

            setPosting(true);

            const newPost =
                await createPost(
                    title,
                    content,
                    image
                );

            setPosts(
                previous => [
                    newPost,
                    ...previous
                ]
            );

            setTitle("");

            setContent("");

            setImage(null);

            setPreview(null);

        } catch (error) {

            console.error(
                "Failed to create post:",
                error
            );

            alert(
                "Failed to create post"
            );

        } finally {

            setPosting(false);
        }
    }


    // =====================================
    // LIKE
    // =====================================

    async function handleLike(post) {

        try {

            if (post.likedByCurrentUser) {

                await unlikePost(post.id);

            } else {

                await likePost(post.id);
            }

            loadPosts();

        } catch (error) {

            console.error(
                "Like failed:",
                error
            );
        }
    }


    // =====================================
    // DELETE POST
    // =====================================

    async function handleDelete(postId) {

        const confirmed =
            window.confirm(
                "Delete this post?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deletePost(postId);

            setPosts(
                previous =>
                    previous.filter(
                        post =>
                            post.id !== postId
                    )
            );

        } catch (error) {

            console.error(
                "Delete failed:",
                error
            );
        }
    }


    // =====================================
    // LOAD COMMENTS
    // =====================================

    async function handleComments(postId) {

        if (expandedPost === postId) {

            setExpandedPost(null);

            return;
        }

        try {

            const data =
                await getComments(postId);

            setComments(
                previous => ({
                    ...previous,
                    [postId]: data
                })
            );

            setExpandedPost(postId);

        } catch (error) {

            console.error(
                "Failed to load comments:",
                error
            );
        }
    }


    // =====================================
    // ADD COMMENT
    // =====================================

    async function handleAddComment(postId) {

        const text =
            commentText[postId]?.trim();

        if (!text) {
            return;
        }

        try {

            const newComment =
                await addComment(
                    postId,
                    text
                );

            setComments(
                previous => ({
                    ...previous,

                    [postId]: [
                        ...(previous[postId] || []),
                        newComment
                    ]
                })
            );

            setCommentText(
                previous => ({
                    ...previous,
                    [postId]: ""
                })
            );

            loadPosts();

        } catch (error) {

            console.error(
                "Comment failed:",
                error
            );
        }
    }


    // =====================================
    // DELETE COMMENT
    // =====================================

    async function handleDeleteComment(
        postId,
        commentId
    ) {

        try {

            await deleteComment(
                commentId
            );

            setComments(
                previous => ({
                    ...previous,

                    [postId]:
                        previous[postId]
                            ?.filter(
                                comment =>
                                    comment.id !==
                                    commentId
                            )
                })
            );

            loadPosts();

        } catch (error) {

            console.error(
                "Delete comment failed:",
                error
            );
        }
    }


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (
            <div className="community-page">

                <div className="community-loading">

                    <div className="loading-spinner" />

                    <p>
                        Loading farmer community...
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="community-page">

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <header className="community-header">

                <div>

                    <span className="community-label">
                        🌾 FARMER COMMUNITY
                    </span>

                    <h1>
                        Grow Together.
                    </h1>

                    <p>
                        Share your farming experience,
                        ask questions and help fellow farmers.
                    </p>

                </div>

                <div className="community-stat">

                    <strong>
                        {posts.length}
                    </strong>

                    <span>
                        Posts
                    </span>

                </div>

            </header>


            <div className="community-layout">


                {/* ================================= */}
                {/* LEFT SIDE */}
                {/* ================================= */}

                <main className="community-feed">


                    {/* ============================== */}
                    {/* CREATE POST */}
                    {/* ============================== */}

                    <section className="create-post-card">

                        <div className="create-post-top">

                            <div className="avatar">
                                🌱
                            </div>

                            <div>

                                <h3>
                                    Share with farmers
                                </h3>

                                <p>
                                    What is happening in your field?
                                </p>

                            </div>

                        </div>


                        <form
                            onSubmit={handleCreatePost}
                        >

                            <input
                                type="text"
                                placeholder="Post title..."
                                value={title}
                                onChange={
                                    e =>
                                        setTitle(
                                            e.target.value
                                        )
                                }
                            />


                            <textarea
                                placeholder="Share your farming experience, ask a question or help another farmer..."
                                value={content}
                                onChange={
                                    e =>
                                        setContent(
                                            e.target.value
                                        )
                                }
                                rows="4"
                            />


                            {preview && (

                                <div className="image-preview">

                                    <img
                                        src={preview}
                                        alt="Preview"
                                    />

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

                                    📷
                                    <span>
                                        Add photo
                                    </span>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={
                                            handleImageChange
                                        }
                                        hidden
                                    />

                                </label>


                                <button
                                    className="post-button"
                                    type="submit"
                                    disabled={posting}
                                >

                                    {posting
                                        ? "Posting..."
                                        : "Post"
                                    }

                                </button>

                            </div>

                        </form>

                    </section>


                    {/* ============================== */}
                    {/* POSTS */}
                    {/* ============================== */}

                    {posts.length === 0 ? (

                        <div className="empty-community">

                            <div className="empty-icon">
                                🌱
                            </div>

                            <h2>
                                Start the conversation
                            </h2>

                            <p>
                                Be the first farmer to
                                share something with the community.
                            </p>

                        </div>

                    ) : (

                        posts.map(post => (

                            <article
                                className="post-card"
                                key={post.id}
                            >

                                {/* POST HEADER */}

                                <div className="post-header">

                                    <div className="post-user">

                                        <div className="user-avatar">
                                            {post.userName
                                                ?.charAt(0)
                                                ?.toUpperCase()
                                                || "F"}
                                        </div>

                                        <div>

                                            <strong>
                                                {post.userName}
                                            </strong>

                                            <span>
                                                {formatDate(
                                                    post.createdAt
                                                )}
                                            </span>

                                        </div>

                                    </div>


                                    <button
                                        className="post-menu"
                                        onClick={() =>
                                            handleDelete(
                                                post.id
                                            )
                                        }
                                    >
                                        ⋮
                                    </button>

                                </div>


                                {/* POST CONTENT */}

                                <div className="post-content">

                                    <h2>
                                        {post.title}
                                    </h2>

                                    <p>
                                        {post.content}
                                    </p>

                                </div>


                                {/* IMAGE */}

                                {post.imageUrl && (

                                    <div className="post-image">

                                        <img
                                            src={
                                                post.imageUrl
                                            }
                                            alt={
                                                post.title
                                            }
                                        />

                                    </div>

                                )}


                                {/* ACTIONS */}

                                <div className="post-actions">

                                    <button
                                        onClick={() =>
                                            handleLike(
                                                post
                                            )
                                        }
                                        className={
                                            post.likedByCurrentUser
                                                ? "liked"
                                                : ""
                                        }
                                    >

                                        ❤️

                                        <span>
                                            {post.likeCount || 0}
                                        </span>

                                    </button>


                                    <button
                                        onClick={() =>
                                            handleComments(
                                                post.id
                                            )
                                        }
                                    >

                                        💬

                                        <span>
                                            {post.commentCount || 0}
                                        </span>

                                    </button>

                                </div>


                                {/* COMMENTS */}

                                {expandedPost === post.id && (

                                    <div className="comments-section">

                                        <div className="comment-input">

                                            <input
                                                type="text"
                                                placeholder="Write a comment..."
                                                value={
                                                    commentText[
                                                        post.id
                                                    ] || ""
                                                }
                                                onChange={
                                                    e =>
                                                        setCommentText(
                                                            previous => ({
                                                                ...previous,
                                                                [post.id]:
                                                                    e.target.value
                                                            })
                                                        )
                                                }
                                                onKeyDown={
                                                    e => {

                                                        if (
                                                            e.key ===
                                                            "Enter"
                                                        ) {

                                                            handleAddComment(
                                                                post.id
                                                            );

                                                        }

                                                    }
                                                }
                                            />

                                            <button
                                                onClick={() =>
                                                    handleAddComment(
                                                        post.id
                                                    )
                                                }
                                            >
                                                Send
                                            </button>

                                        </div>


                                        <div className="comments-list">

                                            {(
                                                comments[
                                                    post.id
                                                ] || []
                                            ).map(comment => (

                                                <div
                                                    className="comment"
                                                    key={
                                                        comment.id
                                                    }
                                                >

                                                    <div className="comment-avatar">

                                                        {comment.userName
                                                            ?.charAt(0)
                                                            ?.toUpperCase()
                                                            || "F"}

                                                    </div>

                                                    <div className="comment-body">

                                                        <strong>
                                                            {
                                                                comment.userName
                                                            }
                                                        </strong>

                                                        <p>
                                                            {
                                                                comment.content
                                                            }
                                                        </p>

                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            handleDeleteComment(
                                                                post.id,
                                                                comment.id
                                                            )
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


                {/* ================================= */}
                {/* RIGHT SIDEBAR */}
                {/* ================================= */}

                <aside className="community-sidebar">

                    <div className="community-info-card">

                        <div className="info-icon">
                            🌾
                        </div>

                        <h3>
                            Farmer Community
                        </h3>

                        <p>
                            A place for farmers to connect,
                            share knowledge and solve
                            farming problems together.
                        </p>

                        <div className="info-items">

                            <div>
                                <span>🌱</span>
                                <p>
                                    Share crop problems
                                </p>
                            </div>

                            <div>
                                <span>💡</span>
                                <p>
                                    Exchange farming knowledge
                                </p>
                            </div>

                            <div>
                                <span>🤝</span>
                                <p>
                                    Help fellow farmers
                                </p>
                            </div>

                        </div>

                    </div>


                    <div className="community-guidelines">

                        <h3>
                            Community Guidelines
                        </h3>

                        <ul>

                            <li>
                                Be respectful
                            </li>

                            <li>
                                Share genuine experiences
                            </li>

                            <li>
                                Avoid misleading information
                            </li>

                            <li>
                                Help others whenever possible
                            </li>

                        </ul>

                    </div>

                </aside>

            </div>

        </div>
    );
}


// =========================================
// DATE FORMAT
// =========================================

function formatDate(date) {

    if (!date) {
        return "";
    }

    const value =
        new Date(date);

    const now =
        new Date();

    const diff =
        Math.floor(
            (now - value) / 1000
        );

    if (diff < 60) {
        return "Just now";
    }

    if (diff < 3600) {
        return `${Math.floor(diff / 60)}m ago`;
    }

    if (diff < 86400) {
        return `${Math.floor(diff / 3600)}h ago`;
    }

    if (diff < 604800) {
        return `${Math.floor(diff / 86400)}d ago`;
    }

    return value.toLocaleDateString();
}


export default Community;