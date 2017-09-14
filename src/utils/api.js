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