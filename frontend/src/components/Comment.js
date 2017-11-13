import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {toggleEditComment, upvoteComment, downvoteComment, deleteComment,
        createComment, updateComment} from '../actions';

class Comment extends Component {
  render() {
    const {comment, _upvoteComment, _downvoteComment, _toggleEditComment,
           _deleteComment} = this.props;

    return (
      <div>
        {comment.deleted
         ? "-- deleted"
         : <div>
            --&nbsp;
            <div className="button comment-button"
                 onClick={() => _upvoteComment({comment})}>
              ▲</div>
            <div className="button comment-button"
                 onClick={() => _downvoteComment({comment})}>
              ▼</div>
            <Link to={"/edit/" + comment.id}
                  className="button comment-button"
                  onClick={() => _toggleEditComment({comment})}>
              ✎
            </Link>
            <div className="button comment-button"
                 onClick={() => _deleteComment({comment})}>
              x
            </div>
            <strong>[{comment.voteScore}] {comment.author}</strong> {comment.body}
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps({posts}) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    _upvoteComment: (data) => dispatch(upvoteComment(data)),
    _downvoteComment: (data) => dispatch(downvoteComment(data)),
    _toggleEditComment: (data) => dispatch(toggleEditComment(data)),
    _deleteComment: (data) => dispatch(deleteComment(data)),
    _updateComment: (data) => dispatch(updateComment(data)),
    _createComment: (data) => dispatch(createComment(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comment));
