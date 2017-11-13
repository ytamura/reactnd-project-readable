import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {changeCurrPost, toggleExpandPost, upvotePost, downvotePost, deletePost} from '../actions';

class PostHeader extends Component {
  render() {
    const {post, _upvotePost, _downvotePost, _toggleExpandPost,
           _changeCurrPost, _deletePost} = this.props;

    return (
      <div>
        <div className="button upvote-button"
             onClick={() => _upvotePost({post})}>
          ▲</div>
        <div className="button downvote-button"
             onClick={() => _downvotePost({post})}>
          ▼</div>
        <h4 className="post-title"
            onClick={() => _toggleExpandPost({post})}>
          [{post.voteScore}][{post.author}] {post.title}</h4>
        <Link to={"/post/" + post.id}
              className="button"
              onClick={() => _changeCurrPost({post})}>
          comments
        </Link>
        <Link to={"/edit/" + post.id}
              className="button"
              onClick={() => _changeCurrPost({post})}>
          ✎
        </Link>
        <div className="button"
             onClick={() => _deletePost({post})}>
          x
        </div>
      </div>
    )
  }
}

function mapStateToProps({posts}) {
  return {
    posts: posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _changeCurrPost: (data) => dispatch(changeCurrPost(data)),
    _upvotePost: (data) => dispatch(upvotePost(data)),
    _downvotePost: (data) => dispatch(downvotePost(data)),
    _toggleExpandPost: (data) => dispatch(toggleExpandPost(data)),
    _deletePost: (data) => dispatch(deletePost(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostHeader));
