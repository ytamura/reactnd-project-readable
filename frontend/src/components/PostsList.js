import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';

class PostsList extends Component {
  render() {
    const { posts } = this.props;

    return (
      <div>
        <h2>Posts</h2>
        {posts === undefined
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <div className='posts-list'>
            {posts.filter((post) =>
              post.deleted === false
            ).map((post) => (
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
