export const INIT_POSTS = 'INIT_POSTS';

export function initPosts({ posts }) {
  return {
    type: INIT_POSTS,
    posts,
  }
}
