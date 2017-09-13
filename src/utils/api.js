const url = 'http://localhost:3001'
const header = { headers: { 'Authorization': 'udacity-readable' } }

export function getCategories() {
    return fetch(url + '/categories', header)
        .then((res) => res.json())
}

export function getPosts(category) {
    var getPostsURL = url + '/posts';

    if (category) {
        // Why is 'LET' not reassiging the variable? Isn't that the behaviour of 'CONST'?
        var getPostsURL = url + '/' + category + '/posts';
    }

    return fetch(getPostsURL, header)
        .then((res) => res.json())
}

export function getPost(postID) {
    return fetch(url + '/posts/' + postID, header)
        .then((res) => res.json())
}