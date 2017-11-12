import { combineReducers } from 'redux';

import {
  INIT_POSTS,
  CHANGE_CURR_POST,
  TOGGLE_EXPAND_POST,
  INIT_CATEGORIES,
  CHANGE_CURR_CATEGORY,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  INIT_COMMENTS,
} from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case INIT_POSTS:
      return action.posts.map((post) => {
        return {
          ...post,
          collapsed: true,
          edit: false,
        }
      });
    case TOGGLE_EXPAND_POST:
      return state.map((post) => {
        if(post.id === action.post.id) {
          return {
            ...post,
            collapsed: !action.post.collapsed
          };
        }
        return post;
      });
    case CREATE_POST:
      return [
        ...state,
        action.post
      ]
    case UPDATE_POST:
      return state.map((post) => {
        if (post.id === action.post.id) {
          return action.post;
        }
        return post;
      });
    case DELETE_POST:
      return state.map((post) => {
        if (post.id === action.post.id) {
          return {
            ...post,
            deleted: true
          };
        }
        return post;
      })
    case UPVOTE_POST:
      return state.map((post) => {
        if (post.id === action.post.id) {
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
    case UPDATE_POST:
      return action.post
    case UPVOTE_POST:
      return {
        ...state,
        voteScore: state.voteScore + 1
      };
    case DOWNVOTE_POST:
      return {
        ...state,
        voteScore: state.voteScore - 1
      };
    case DELETE_POST:
      return {
        ...state,
        deleted: true
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
