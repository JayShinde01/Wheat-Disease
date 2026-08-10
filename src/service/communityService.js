import api from "../constant/api";

// ===============================
// GET ALL POSTS
// ===============================

export async function getAllPosts() {

    const response = await api.get(
        "/api/community/posts"
    );

    return response.data;
}


// ===============================
// GET SINGLE POST
// ===============================

export async function getPostById(postId) {

    const response = await api.get(
        `/api/community/posts/${postId}`
    );

    return response.data;
}


// ===============================
// CREATE POST
// ===============================

export async function createPost(
    title,
    content,
    image
) {

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (image) {
        formData.append("image", image);
    }

    const response = await api.post(
        "/api/community/posts",
        formData
    );

    return response.data;
}


// ===============================
// UPDATE POST
// ===============================

export async function updatePost(
    postId,
    title,
    content,
    image
) {

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (image) {
        formData.append("image", image);
    }

    const response = await api.put(
        `/api/community/posts/${postId}`,
        formData
    );

    return response.data;
}


// ===============================
// DELETE POST
// ===============================

export async function deletePost(postId) {

    await api.delete(
        `/api/community/posts/${postId}`
    );
}


// ===============================
// LIKE POST
// ===============================

export async function likePost(postId) {

    await api.post(
        `/api/community/posts/${postId}/like`
    );
}


// ===============================
// UNLIKE POST
// ===============================

export async function unlikePost(postId) {

    await api.delete(
        `/api/community/posts/${postId}/like`
    );
}


// ===============================
// GET COMMENTS
// ===============================

export async function getComments(postId) {

    const response = await api.get(
        `/api/community/posts/${postId}/comments`
    );

    return response.data;
}


// ===============================
// ADD COMMENT
// ===============================

export async function addComment(
    postId,
    content
) {

    const response = await api.post(
        `/api/community/posts/${postId}/comments`,
        {
            content
        }
    );

    return response.data;
}


// ===============================
// DELETE COMMENT
// ===============================

export async function deleteComment(
    commentId
) {

    await api.delete(
        `/api/community/comments/${commentId}`
    );
}