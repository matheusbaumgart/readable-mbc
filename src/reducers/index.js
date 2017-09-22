import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
    SHOW_CATEGORIES,
    SHOW_POSTS,
    SHOW_POST,
    SHOW_MODAL, HIDE_MODAL,
    SAVE_POST,
    CHANGE_SORT,
    CHANGE_ORDER,
    SHOW_COMMENTS
} from '../actions'

function categories(state = [], action) {
    switch (action.type) {
        case SHOW_CATEGORIES:
            return (
                action.categories
            )
        default:
            return state
    }
}

function posts(state = [], action) {
    switch (action.type) {
        case SHOW_POSTS:
            return action.posts
        default:
            return state
    }
}

function post(state = {}, action) {
    switch (action.type) {
        case SHOW_POST:
            return (
                action.post
            )
        default:
            return state
    }
}

function sortBy(state = 'voteScoreHighest', action) {
    switch (action.type) {
        case CHANGE_SORT:
            return action.sortBy
        default:
            return state
    }
}

function orderBy(state = 'vote', action) {
    switch (action.type) {
        case CHANGE_ORDER:
            return action.orderBy
        default:
            return state
    }
}

function comments(state = {}, action) {
    const comments = action.comments;

    switch (action.type) {
        case SHOW_COMMENTS:
            return Object.assign({}, state, {
                ...state.comments,
                comments
            })
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
    comments,
    sortBy,
    orderBy,
    post,
    modal,
    form: formReducer
})