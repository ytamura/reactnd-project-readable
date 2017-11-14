import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import Loading from 'react-loading';
import sortBy from 'sort-by';
import PostHeader from './PostHeader.js';
import {changeCurrCategory, toggleExpandAll} from '../actions';

class PostsList extends Component {
  state = {
    sortPostsBy: '-voteScore',
  }

  componentDidMount() {
    const {currCategory, newCategory, _changeCurrCategory} = this.props;

    // Only need to dispatch when accessed directly with /:category
    if (currCategory !== newCategory) {
      _changeCurrCategory(newCategory);
    }
  }

  updateSortby = (field) => {
    let newOrder ='';

    if (this.state.sortPostsBy.indexOf(field) === -1) {
      // switch fields, keep order
      newOrder = this.state.sortPostsBy[0] + field;
    } else {
      // same field, toggle order
      let order = (this.state.sortPostsBy[0] === '-' ? '' : '-');
      newOrder = order + field;
    }
    
    console.log('newOrder', newOrder);
    this.setState({sortPostsBy: newOrder});
  }

  expandAll = () => {
    this.props._toggleExpandAll({expand: true});
  }

  collapseAll = () => {
    this.props._toggleExpandAll({expand: false});
  }

  render() {
    const {sortPostsBy} = this.state;
    const {posts, currCategory} = this.props;
    let postsToShow = posts.filter((post) => post.deleted === false &&
                                             (currCategory === '' ||
                                              currCategory === post.category))
    postsToShow.sort(sortBy(sortPostsBy));

    return (
      <div>
        <h2>Posts ({postsToShow.length})</h2>
        <div>
          <Link to="/new_post" className="button">Add new</Link>|
          <div className="button"
               onClick={() => this.expandAll()}>Expand all</div>|
          <div className="button"
               onClick={() => this.collapseAll()}>Collapse all</div>|
          Sort by:
          <div className="button"
               onClick={() => this.updateSortby("voteScore")}>votes</div>
          <div className="button"
               onClick={() => this.updateSortby("timestamp")}>time</div>
        </div>
        {posts === undefined
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <div className='posts-list'>
              {postsToShow.map((post) => (
                <div key={post.id} className="post-list-item">
                  <PostHeader post={post}/>
                  {!post.collapsed
                   ? <span>[{(new Date(post.timestamp)).toLocaleString()}] {post.body}</span>
                   : ""}
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

function mapDispatchToProps(dispatch) {
  return {
    _changeCurrCategory: (data) => dispatch(changeCurrCategory(data)),
    _toggleExpandAll: (data) => dispatch(toggleExpandAll(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList));
