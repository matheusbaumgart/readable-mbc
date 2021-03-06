const url = 'http://localhost:3001'
const header = { headers: { 'Authorization': 'udacity-readable' } }

const uuidv1 = require('uuid/v1');

export function getCategories() {
    return fetch(`${url}/categories/`, header)
        .then((res) => res.json())
}

export function getPosts(category) {
    let getPostsURL = `${url}/posts/`;

    if (category) {
        getPostsURL = `${url}/${category}/posts`
    }

    return fetch(getPostsURL, header)
        .then((res) => res.json())
}

export function getPost(postID) {
    return fetch(`${url}/posts/${postID}`, header)
        .then((res) => res.json())
}

export function addPost(post) {
    return fetch(`${url}/posts`, {
        method: 'POST',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            author: post.author,
            body: post.body,
            title: post.title,
            category: post.category,
            timestamp: Date.now(),
            id: uuidv1()
        })
    }).then(res => res.json())
        .then(data => data)
}

export function editPost(post) {
    return fetch(`${url}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: post.title,
            body: post.body
        })
    }).then(res => res.json())
        .then(data => data)
}

export function deletePost(postId) {
    return fetch(`${url}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        }
    })
}

export function changeScore(postID, option) {

    return fetch(`${url}/posts/${postID}`, {
        method: 'POST',
        headers: {
            'Authorization': 'udacity-readable',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: option
        })
    }).then(res => res.json())
        .then(data => data)
}

// GET /posts/:id/comments
export function getComments(postID) {
    return fetch(`${url}/posts/${postID}/comments`, header)
        .then((res) => res.json())
}
