import React, {Component} from 'react';
import {connect} from 'react-redux';
import {initPosts, initComments, changeCurrCategory, changeCurrPost} from '../actions';
import {Link, withRouter} from 'react-router-dom';
import sortBy from 'sort-by';
import PostHeader from './PostHeader.js';
import Comment from './Comment.js';
import * as PostsAPI from '../utils/api.js';

class PostDetails extends Component {

  componentDidMount() {
    const {history, newPostId, newCategory, currPost, _changeCurrPost,
           _initComments} = this.props;

    if (newPostId !== currPost.id) {
      //In case visited directly via URL
      console.log('newPostId',newPostId)
      console.log('currPost.id',currPost.id)
      PostsAPI.getPostById(newPostId).then((post) => {
        if (post.category !== newCategory) {
          history.push('/error');
        }
        _changeCurrPost({post});
        _initComments(post);
      });
    } else {
      _initComments(currPost);
    }
  }

  render() {
    const {currPost, comments, _changeCurrCategory} = this.props;
    let commentsToShow = comments.map((comment) => comment);
    commentsToShow.sort(sortBy('-voteScore'));

    return (
      <div className="posts-list">
        {currPost === undefined
         ? "loading..."
         : <div className="post-list-item">
            <PostHeader post={currPost}/>
            {currPost.deleted 
             ? <p>THIS POST WAS DELETED FOREVER</p>
             : <div>
                <p>[{(new Date(currPost.timestamp)).toLocaleString()}] {currPost.body}</p>
                <div>Category:
                  <Link to={"/category/" + currPost.category}
                        className="category-link"
                        onClick={() => _changeCurrCategory(currPost.category)}>
                    {currPost.category}
                  </Link>
                , Comments ({commentsToShow.length}):
                </div>
                {commentsToShow.map((comment) =>
                  <Comment key={comment.id} comment={comment}/>
                )}
                <Comment comment={undefined}/>
              </div>
            }
           </div>
        }
      </div>
    )
  }
}

function mapStateToProps({currPost, comments}) {
  return {
    currPost: currPost,
    comments: comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _initPosts: (data) => dispatch(initPosts(data)),
    _initComments: (data) => dispatch(initComments(data)),
    _changeCurrCategory: (data) => dispatch(changeCurrCategory(data)),
    _changeCurrPost: (data) => dispatch(changeCurrPost(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails));