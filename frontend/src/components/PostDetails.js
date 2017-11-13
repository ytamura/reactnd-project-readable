import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCommentsForPost} from '../utils/api.js';
import {initPosts, initComments, changeCurrCategory, changeCurrPost} from '../actions';
import {Link, withRouter} from 'react-router-dom';
import PostHeader from './PostHeader.js';
import Comment from './Comment.js';
import * as PostsAPI from '../utils/api.js';

class PostDetails extends Component {

  componentDidMount() {
    const {newPostId, currPost, _changeCurrPost, _initComments} = this.props;

    if (newPostId !== currPost.id) {
      //In case visited directly via URL
      console.log('newPostId',newPostId)
      console.log('currPost.id',currPost.id)
      PostsAPI.getPostById(newPostId).then((post) => {
        console.log('gotpost', post);
        _changeCurrPost({post});

        getCommentsForPost(post).then((comments) => {
          console.log('comments', comments);
          _initComments({comments});
        });
      });
    } else {
      getCommentsForPost(currPost).then((comments) => {
        console.log('comments', comments);
        _initComments({comments});
      });
    }
  }

  render() {
    const {currPost, comments, _changeCurrCategory} = this.props;

    return (
      <div className="posts-list">
        {currPost === undefined
         ? "loading..."
         : <div className="post-list-item">
            <PostHeader post={currPost}/>
            <p>[{(new Date(currPost.timestamp)).toLocaleString()}] {currPost.body}</p>
            {currPost.deleted 
             ? "DELETED"
             : <div>
                <div>Category:
                  <Link to={"/category/" + currPost.category}
                        className="category-link"
                        onClick={() => _changeCurrCategory(currPost.category)}>
                    {currPost.category}
                  </Link>
                , Comments ({comments.length}):
                </div>
                {comments.map((comment) =>
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

function mapStateToProps({posts, currPost, comments}) {
  return {
    posts: posts,
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