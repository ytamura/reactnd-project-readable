export const INIT_POSTS = 'INIT_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const INIT_CATEGORIES = 'INIT_CATEGORIES';
export const CHANGE_CURR_CATEGORY = 'CHANGE_CURR_CATEGORY';

export function initPosts({posts}) {
  return {
    type: INIT_POSTS,
    posts,
  }
}

export function createPost({post}) {
  return {
    type: CREATE_POST,
    post,
  }
}

export function deletePost({postId}) {
  return {
    type: DELETE_POST,
    postId,
  }
}

export function initCategories({categories}) {
  return {
    type: INIT_CATEGORIES,
    categories,
  }
}

export function changeCurrCategory(newCategory) {
  return {
    type: CHANGE_CURR_CATEGORY,
    newCategory
  }
}
