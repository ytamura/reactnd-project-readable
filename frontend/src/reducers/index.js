import { combineReducers } from 'redux';

import {
  INIT_POSTS,
  INIT_CATEGORIES,
} from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case INIT_POSTS:
      return action.posts;
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

export default combineReducers({
  posts,
  categories
});