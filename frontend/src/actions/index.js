import * as PostsAPI from '../utils/api.js';

export const INIT_POSTS = 'INIT_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const CHANGE_CURR_POST = 'CHANGE_CURR_POST';
export const TOGGLE_EXPAND_POST = 'TOGGLE_EXPAND_POST';
export const TOGGLE_EXPAND_ALL = 'TOGGLE_EXPAND_ALL';

export const INIT_CATEGORIES = 'INIT_CATEGORIES';
export const CHANGE_CURR_CATEGORY = 'CHANGE_CURR_CATEGORY';

export const INIT_COMMENTS = 'INIT_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const TOGGLE_EDIT_COMMENT = 'TOGGLE_EDIT_COMMENT';

export const _initPosts = (posts) => ({
  type: INIT_POSTS,
  posts,
});

export const initPosts = () => dispatch => (
  PostsAPI
    .getAllPosts()
    .then((posts) => dispatch(_initPosts(posts)))
);

export const _createPost = (post) => ({
  type: CREATE_POST,
  post,
});

export const createPost = (post) => dispatch => (
  PostsAPI
    .createPost(post)
    .then(() => dispatch(_createPost(post)))
);

export const _updatePost = (post) => ({
  type: UPDATE_POST,
  post,
});

export const updatePost = (post) => dispatch => (
  PostsAPI
    .updatePost(post)
    .then(() => dispatch(_updatePost(post)))
);

export const _upvotePost = (post) => ({
  type: UPVOTE_POST,
  post,
});

export const upvotePost = (post) => dispatch => (
  PostsAPI
    .votePost(post, {option: 'upVote'})
    .then(() => dispatch(_upvotePost(post)))
);

export const _downvotePost = (post) => ({
  type: DOWNVOTE_POST,
  post,
});

export const downvotePost = (post) => dispatch => (
  PostsAPI
    .votePost(post, {option: 'downVote'})
    .then(() => dispatch(_downvotePost(post)))
);

export const _deletePost = (post) => ({
  type: DELETE_POST,
  post,
});

export const deletePost = (post) => dispatch => (
  PostsAPI
    .deletePost(post)
    .then(() => dispatch(_deletePost(post)))
);

//UI only
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

export function toggleExpandAll({expand}) {
  return {
    type: TOGGLE_EXPAND_ALL,
    expand,
  }
}

/* Categories */
export const _initCategories = (categories) => ({
  type: INIT_CATEGORIES,
  categories,
});

export const initCategories = (categories) => dispatch => (
  PostsAPI
    .getAllCategories()
    .then((categories) => dispatch(_initCategories(categories)))
);

//UI only
export function changeCurrCategory(newCategory) {
  return {
    type: CHANGE_CURR_CATEGORY,
    newCategory
  }
}

/* Comments */
export const _initComments = (comments) => ({
  type: INIT_COMMENTS,
  comments,
});

export const initComments = (post) => dispatch => (
  PostsAPI
    .getCommentsForPost(post)
    .then((comments) => dispatch(_initComments(comments)))
);

export const _createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment,
});

export const createComment = (comment) => dispatch => (
  PostsAPI
    .createComment(comment)
    .then(() => dispatch(_createComment(comment)))
);

export const _updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

export const updateComment = (comment) => dispatch => (
  PostsAPI
    .updateComment(comment)
    .then(() => dispatch(_updateComment(comment)))
);

export const _upvoteComment = (comment) => ({
  type: UPVOTE_COMMENT,
  comment,
});

export const upvoteComment = (comment) => dispatch => (
  PostsAPI
    .voteComment(comment, {option: "upVote"})
    .then(() => dispatch(_upvoteComment(comment)))
);

export const _downvoteComment = (comment) => ({
  type: DOWNVOTE_COMMENT,
  comment,
});

export const downvoteComment = (comment) => dispatch => (
  PostsAPI
    .voteComment(comment, {option: "downVote"})
    .then(() => dispatch(_downvoteComment(comment)))
);

export const _deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment,
});

export const deleteComment = (comment) => dispatch => (
  PostsAPI
    .deleteComment(comment)
    .then(() => dispatch(_deleteComment(comment)))
);

//UI only
export function toggleEditComment(comment) {
  return {
    type: TOGGLE_EDIT_COMMENT,
    comment,
  }
}
