import { combineReducers } from 'redux';

import {
  INIT_POSTS,
} from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case INIT_POSTS:
      return action.posts;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
});