import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import sortBy from 'sort-by';

class PostsList extends Component {
  state = {
    sortPostsBy: '-voteScore',
  }

  render() {
    const { sortPostsBy } = this.state
    const { posts } = this.props;
    let postsToShow = posts.filter((post) => post.deleted === false)
    postsToShow.sort(sortBy(sortPostsBy));

    return (
      <div>
        <h2>Posts</h2>
        {posts === undefined
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <div className='posts-list'>
              {postsToShow.map((post) => (
                <div key={post.id} className="post-list-item">
                  <h4>{post.category}</h4>
                  <h4>[{post.voteScore}] {post.title} by {post.author}</h4>
                  <p>[{Date(post.timestamp)}] {post.body}</p>
                </div>)
              )}
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts: posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
