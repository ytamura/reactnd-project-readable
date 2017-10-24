export const INIT_POSTS = 'INIT_POSTS';
export const INIT_CATEGORIES = 'INIT_CATEGORIES';

export function initPosts({ posts }) {
  return {
    type: INIT_POSTS,
    posts,
  }
}

export function initCategories({ categories }) {
  return {
    type: INIT_CATEGORIES,
    categories,
  }
}
