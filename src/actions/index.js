export const SHOW_CATEGORIES = 'SHOW_CATEGORIES'
export const SHOW_POSTS = 'SHOW_POSTS'


export function showCategories (categories) {
  return {
    type: SHOW_CATEGORIES,
    categories
  }
}

export function showPosts (posts) {
  return {
    type: SHOW_POSTS,
    posts
  }
}
