import { combineReducers } from 'redux';

import {
  INIT_POSTS,
  CHANGE_CURR_POST,
  INIT_CATEGORIES,
  CHANGE_CURR_CATEGORY,
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  INIT_COMMENTS,
} from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case INIT_POSTS:
      action.posts.map((post) => post.collapsed = true);
      return action.posts;
    case CREATE_POST:
      return [
        ...state,
        action.post
      ];
    case DELETE_POST:
      return state;
    case UPVOTE_POST:
      return state.map((post) => {
        if(post.id === action.post.id) {
          return {
            ...post,
            voteScore: post.voteScore + 1
          };
        }
        return post;
      });
    case DOWNVOTE_POST:
      return state.map((post) => {
        if(post.id === action.post.id) {
          return {
            ...post,
            voteScore: post.voteScore - 1
          };
        }
        return post;
      });
    default:
      return state;
  }
}

function currPost(state = {}, action) {
  switch (action.type) {
    case CHANGE_CURR_POST:
      return action.post;
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

function comments(state = [], action) {
  switch (action.type) {
    case INIT_COMMENTS:
      return action.comments;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  currPost,
  categories,
  currCategory,
  comments,
});
