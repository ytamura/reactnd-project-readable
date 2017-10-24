import { combineReducers } from 'redux';

import {
  INIT_POSTS,
  INIT_CATEGORIES,
  CHANGE_CURR_CATEGORY,
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
} from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case INIT_POSTS:
      action.posts.map((post) => post.collaped = true);
      return action.posts;
    case CREATE_POST:
      return state.concat([action.post]);
    case DELETE_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.post],
          deleted: true
        }
      }
    default:
      return state;
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case INIT_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}

function currCategory(state = '', action) {
  switch (action.type) {
    case CHANGE_CURR_CATEGORY:
      return action.newCategory;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  categories,
  currCategory,
});