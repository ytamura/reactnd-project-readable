import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loading from 'react-loading';
import sortBy from 'sort-by';
import PostDetails from './PostDetails.js'
import {changeCurrCategory, changeCurrPost, upvotePost, downvotePost} from '../actions';

class PostsList extends Component {
  state = {
    sortPostsBy: '-voteScore',
  }

  componentDidMount() {
    const {currCategory, newCategory, _changeCurrCategory} = this.props;

    // Only need to dispatch when accessed directly with /:category
    if(currCategory !== newCategory) {
      _changeCurrCategory(newCategory);
    }
  }

  render() {
    const {sortPostsBy} = this.state;
    const {posts, currCategory, currPost, _changeCurrPost, _upvotePost, _downvotePost} = this.props;
    let postsToShow = posts.filter((post) => post.deleted === false &&
                                             (currCategory === '' ||
                                              currCategory === post.category))
    postsToShow.sort(sortBy(sortPostsBy));

    return (
      <div>
        <h2>Posts ({postsToShow.length})</h2>
        {posts === undefined
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <div className='posts-list'>
              {postsToShow.map((post) => (
                <div key={post.id} className="post-list-item">
                  <div className="button upvote-button"
                       onClick={() => _upvotePost({post})}>
                    ▲</div>
                  <div className="button downvote-button"
                       onClick={() => _downvotePost({post})}>
                    ▼</div>
                  {currPost && post.id === currPost.id
                    ? <PostDetails/>
                    : <h4 className="post-title"
                          onClick={() =>_changeCurrPost({post})}>
                       [{post.voteScore}] {post.title}</h4>
                  }
                  <div className="button">more</div>
                  <div className="button">edit</div>
                </div>)
              )}
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({posts, currCategory, currPost}) {
  return {
    posts: posts,
    currCategory: currCategory,
    currPost: currPost,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    _changeCurrCategory: (data) => dispatch(changeCurrCategory(data)),
    _changeCurrPost: (data) => dispatch(changeCurrPost(data)),
    _upvotePost: (data) => dispatch(upvotePost(data)),
    _downvotePost: (data) => dispatch(downvotePost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
