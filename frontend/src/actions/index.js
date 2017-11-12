export const INIT_POSTS = 'INIT_POSTS';
export const CHANGE_CURR_POST = 'CHANGE_CURR_POST';
export const TOGGLE_EXPAND_POST = 'TOGGLE_EXPAND_POST';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const INIT_CATEGORIES = 'INIT_CATEGORIES';
export const CHANGE_CURR_CATEGORY = 'CHANGE_CURR_CATEGORY';
export const INIT_COMMENTS = 'INIT_COMMENTS';

export function initPosts({posts}) {
  return {
    type: INIT_POSTS,
    posts,
  }
}

export function changeCurrPost({post}) {
  return {
    type: CHANGE_CURR_POST,
    post,
  }
}

export function toggleExpandPost({post}) {
  return {
    type: TOGGLE_EXPAND_POST,
    post,
  }
}

export function createPost({post}) {
  return {
    type: CREATE_POST,
    post,
  }
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post,
  }
}

export function upvotePost({post}) {
  return {
    type: UPVOTE_POST,
    post,
  }
}

export function downvotePost({post}) {
  return {
    type: DOWNVOTE_POST,
    post,
  }
}

export function deletePost({post}) {
  return {
    type: DELETE_POST,
    post,
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

export function initComments({comments}) {
  return {
    type: INIT_COMMENTS,
    comments,
  }
}
