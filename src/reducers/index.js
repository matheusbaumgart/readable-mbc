import { combineReducers } from 'redux'
import {
    SHOW_CATEGORIES,
    SHOW_POSTS,
    SHOW_POST,
    SHOW_MODAL, HIDE_MODAL,
    ADD_POST
} from '../actions'

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

function post(state = [], action) {
    switch (action.type) {
        case SHOW_POST:
            const { post } = action
            return (
                post
            )
        case ADD_POST:
            const { newPost } = action
            return (
                newPost
            )
        default:
            return state
    }
}

const modalInitialState = {
    modalType: null,
    modalProps: {
        modalIsOpen: false
    }
}

function modal(state = modalInitialState, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                modalType: action.modalType,
                modalProps: action.modalProps
            }
        case HIDE_MODAL:
            return modalInitialState
        default:
            return state
    }
}


export default combineReducers({
    categories,
    posts,
    post,
    modal
})