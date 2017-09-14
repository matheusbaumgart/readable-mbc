export const SHOW_CATEGORIES = 'SHOW_CATEGORIES'
export const SHOW_POSTS = 'SHOW_POSTS'
export const CHANGE_SORT = 'CHANGE_SORT'
export const SHOW_POST = 'SHOW_POST'
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const SAVE_POST = 'SAVE_POST'

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

export function changeSorting(sortBy){
  return {
    type: CHANGE_SORT,
    sortBy
  }
}

export function showPost(post) {
  return {
    type: SHOW_POST,
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

export function savePost(values){
  return {
    type: SAVE_POST,
    values
  }
}
