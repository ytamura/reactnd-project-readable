import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {changeCurrPost, toggleExpandPost, upvotePost, downvotePost,
        deletePost} from '../actions';

class PostHeader extends Component {
  render() {
    const {post, _upvotePost, _downvotePost, _toggleExpandPost,
           _changeCurrPost, _deletePost} = this.props;

    return (
      <div>
        {post.deleted ? ''
         : <span> 
            <div className="button"
                 title="upvote"
                 onClick={() => _upvotePost(post)}>▲</div>
            <div className="button"
                 title="downvote"
                 onClick={() => _downvotePost(post)}>▼</div>
            <strong title="votes">[{post.voteScore}]</strong>
            <Link to={"/edit/" + post.id}
                  className="button"
                  title="edit post"
                  onClick={() => _changeCurrPost({post})}>✎</Link>
          </span>
        }
        <h4 className="post-title"
            onClick={() => _toggleExpandPost({post})}>
          [{post.author}] {post.title}</h4>
        {post.deleted ? ''
         : <span>
            <Link to={"/post/" + post.id}
                className="button"
                onClick={() => _changeCurrPost({post})}>comments</Link>
            <div className="button float-right"
                 title="delete post"
                 onClick={() => _deletePost(post)}>x</div>
           </span>
        }
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
