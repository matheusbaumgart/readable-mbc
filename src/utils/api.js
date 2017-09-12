const url = 'http://localhost:3001'
const header = { headers: { 'Authorization': 'udacity-readable' } }

export function getCategories() {
    return fetch(url + '/categories', header)
        .then((res) => res.json())
}

export function getPosts() {
    return fetch(url + '/posts', header)
        .then((res) => res.json())
}