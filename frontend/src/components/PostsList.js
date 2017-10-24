import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loading from 'react-loading';
import sortBy from 'sort-by';
import {changeCurrCategory} from '../actions';

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
    const {sortPostsBy} = this.state
    const {posts, currCategory} = this.props;
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
                  {post.collapsed
                  ? <h4>[{post.voteScore}] {post.title}</h4> 
                  : <div>
                      <h4>{post.category}</h4>
                      <h4>[{post.voteScore}] {post.title} by {post.author}</h4>
                      <p>[{Date(post.timestamp)}] {post.body}</p>
                    </div>
                  }
                </div>)
              )}
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({posts, currCategory}) {
  return {
    posts: posts,
    currCategory: currCategory,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    _changeCurrCategory: (data) => dispatch(changeCurrCategory(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
