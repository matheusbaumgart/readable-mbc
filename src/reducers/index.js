import { combineReducers } from 'redux'
import {
    SHOW_CATEGORIES,
    SHOW_POSTS,
    SHOW_POST,
    SHOW_MODAL, HIDE_MODAL,
    SAVE_POST,
    CHANGE_SORT,
    CHANGE_ORDER
} from '../actions'
import { reducer as formReducer } from 'redux-form'

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
            return posts
        default:
            return state
    }
}

function post(state = {}, action) {
    switch (action.type) {
        case SHOW_POST:
            const { post } = action
            return (
                post
            )
        default:
            return state
    }
}

function sortBy(state = 'voteScoreHighest', action) {
    switch (action.type) {
        case CHANGE_SORT:
            const { sortBy } = action
            return sortBy
        default:
            return state
    }
}

function orderBy(state = 'vote', action) {
    switch (action.type) {
        case CHANGE_ORDER:
            const { orderBy } = action
            return orderBy
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
    sortBy,
    orderBy,
    post,
    modal,
    form: formReducer
})