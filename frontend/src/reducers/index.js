import { combineReducers } from 'redux';

import {
  INIT_POSTS,
  CHANGE_CURR_POST,
  TOGGLE_EXPAND_POST,
  TOGGLE_EXPAND_ALL,
  INIT_CATEGORIES,
  CHANGE_CURR_CATEGORY,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  INIT_COMMENTS,
  TOGGLE_EDIT_COMMENT,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
} from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case INIT_POSTS:
      return action.posts.map((post) => {
        return {
          ...post,
          collapsed: true,
        };
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
    case TOGGLE_EXPAND_ALL:
      return state.map((post) => {
        return {
          ...post,
          collapsed: !action.expand
        };
      });
    case CREATE_POST:
      return [
        ...state,
        {...action.post,
          voteScore: 1,
          collapsed: true,
          deleted: false,
        }
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
    case CREATE_POST:
      return {
        ...action.post,
        voteScore: 1,
        deleted: false,
        collapsed: true,
      };
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
      return action.comments.map((comment) => {
        return {
          ...comment,
          edit: false,
        };
      });
    case TOGGLE_EDIT_COMMENT:
      return state.map((comment) => {
        if(comment.id === action.comment.id) {
          return {
            ...comment,
            edit: !action.comment.edit
          };
        }
        return comment;
      });
    case CREATE_COMMENT:
      return [
        ...state,
        {...action.comment,
          voteScore: 1,
          edit: false,
          deleted: false,
        }
      ]
    case UPDATE_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.comment.id) {
          return action.comment;
        }
        return comment;
      });
    case DELETE_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.comment.id) {
          return {
            ...comment,
            deleted: true,
            edit: false,
          };
        }
        return comment;
      })
    case UPVOTE_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.comment.id) {
          return {
            ...comment,
            voteScore: comment.voteScore + 1
          };
        }
        return comment;
      });
    case DOWNVOTE_COMMENT:
      return state.map((comment) => {
        if(comment.id === action.comment.id) {
          return {
            ...comment,
            voteScore: comment.voteScore - 1
          };
        }
        return comment;
      });
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
