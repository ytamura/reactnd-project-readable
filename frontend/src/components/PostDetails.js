import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCommentsForPost} from '../utils/api.js';
import {initComments, changeCurrCategory} from '../actions';
import {Link} from 'react-router-dom';

class PostDetails extends Component {
  componentDidMount() {
    const {currPost, _initComments} = this.props;

    if (currPost !== undefined) {
      getCommentsForPost(currPost).then((comments) => {
        console.log('comments',comments);
        _initComments({comments});
      });
    }
  }

  render() {
    const {posts, currPost, comments, _changeCurrCategory} = this.props;

    return (
      <div>
        <h4>[{currPost.voteScore}] {currPost.title} by {currPost.author}</h4>
        <p>[{Date(currPost.timestamp)}] {currPost.body}</p>
        <div>Category:
          <Link to={"/" + currPost.category}
                className="category-link"
                onClick={() => _changeCurrCategory(currPost.category)}>
            {currPost.category}
          </Link>, Comments ({comments.length}):
        </div>
        {comments.map((comment) =>
          <div key={comment.id}>
            -- <strong>{comment.author}</strong> {comment.body}
          </div>
        )}
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
    _initComments: (data) => dispatch(initComments(data)),
    _changeCurrCategory: (data) => dispatch(changeCurrCategory(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);