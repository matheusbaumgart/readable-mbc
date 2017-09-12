import { combineReducers } from 'redux'
import { SHOW_CATEGORIES, SHOW_POSTS } from '../actions'

function categories(state = [], action) {
    switch (action.type) {
        case SHOW_CATEGORIES:
            const { categories } = action
            return (
                categories
            )
        default:
            return state
    }
}

function posts(state = [], action) {
    switch (action.type) {
        case SHOW_POSTS:
            const { posts } = action
            return (
                posts
            )
        default:
            return state
    }
}

export default combineReducers({
    categories,
    posts,
})