import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {withRouter} from 'react-router-dom';
import {toggleEditComment, upvoteComment, downvoteComment, deleteComment,
        createComment, updateComment} from '../actions';

class Comment extends Component {
  state = {
    newComment: '',
    newAuthor: '',
    error: '',
  }

  componentDidMount() {
    if (this.props.comment !== undefined) {
      this.updateComment(this.props.comment.body);
      this.updateAuthor(this.props.comment.author);
    }
  }

  updateComment = (input) => {
    if (input.length > 0) {
      //clear error
      this.setState({error: ''});
    }
    this.setState({newComment: input});
  }

  updateAuthor = (input) => {
    if (input.length > 0) {
      //clear error
      this.setState({error: ''});
    }
    this.setState({newAuthor: input});
  }

  submitComment = () => {
    const {newComment, newAuthor} = this.state;
    if (newComment.trim().length === 0 ||
        newAuthor.trim().length === 0) {
      this.setState({error: 'error: comment/author cannot be blank'});
      return;
    }

    const {currPost, comment, _createComment, _updateComment,
           _toggleEditComment} = this.props;

    let newCommentObj = ((comment === undefined) ? {} : Object.assign({}, comment));
    newCommentObj.timestamp = new Date();
    newCommentObj.body = newComment;
    if (comment === undefined) {
      newCommentObj.author = newAuthor;
      newCommentObj.id = uuid.v1();
      newCommentObj.parentId = currPost.id;
      _createComment(newCommentObj);
    } else {
      _updateComment(newCommentObj)
        .then(() => _toggleEditComment(comment));
    }

    this.updateComment('');
    this.updateAuthor('');
  }

  render() {
    const {newComment, newAuthor, error} = this.state;
    const {comment, _upvoteComment, _downvoteComment, _toggleEditComment,
           _deleteComment} = this.props;

    return (
      <div>
        {comment === undefined
          ? "-- Add new comment:"
          : comment.deleted
             ? "-- Comment deleted"
             : <span>
                --&nbsp;
                <div className="button comment-button"
                     title="upvote"
                     onClick={() => _upvoteComment({comment})}>
                  ▲</div>
                <div className="button comment-button"
                     title="downvote"
                     onClick={() => _downvoteComment({comment})}>
                  ▼</div>
                <div className="button comment-button"
                     title="edit comment"
                     onClick={() => _toggleEditComment(comment)}>
                  ✎</div>
                <div className="button comment-button float-right"
                     title="delete comment"
                     onClick={() => _deleteComment({comment})}>
                  x
                </div>
                <strong>[{comment.voteScore}] {comment.author}</strong>
              </span>
        }
        {(comment === undefined || comment.edit)
         ? <div className="comment-form">
            <label>Author: </label>
            <input
              type="text"
              value={newAuthor}
              placeholder="author"
              onChange={(event) => this.updateAuthor(event.target.value)}
              disabled={comment !== undefined}
            />
            <label> Comment: </label>
            <input
              type="text"
              className="long-text-input"
              value={newComment}
              placeholder="comment"
              onChange={(event) => this.updateComment(event.target.value)}
            />
            <div className="button comment-button"
                 onClick={() => this.submitComment()}>save</div>
            <div className="error">{error}</div>
           </div>
         : <span>
            &nbsp;[{(new Date(comment.timestamp)).toLocaleString()}]
            &nbsp;{comment.body}
           </span>
        }
      </div>
    )
  }
}

function mapStateToProps({currPost}) {
  return {
    currPost: currPost,
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
