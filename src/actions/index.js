export const SHOW_CATEGORIES = 'SHOW_CATEGORIES'
export const SHOW_POSTS = 'SHOW_POSTS'
export const SHOW_POST = 'SHOW_POST'
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const ADD_POST = 'ADD_POST'


export function showCategories(categories) {
  return {
    type: SHOW_CATEGORIES,
    categories
  }
}

export function showPosts(posts) {
  return {
    type: SHOW_POSTS,
    posts
  }
}

export function showPost(post) {
  return {
    type: SHOW_POST,
    post
  }
}

export function addPost(post){
  return {
    type: ADD_POST,
    post
  }
}

export function showModal(modalType){
  return {
    type: SHOW_MODAL,
    modalType: modalType,
    modalProps: {
      modalIsOpen: true
    }
  }
}

export function hideModal(modal){
  return {
    type: HIDE_MODAL,
    modal
  }
}
