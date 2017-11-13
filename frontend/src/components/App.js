import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {initPosts, initCategories} from '../actions';
import '../App.css';
import CategoriesList from './CategoriesList.js';
import PostsList from './PostsList.js';
import PostDetails from './PostDetails.js';
import PostEdit from './PostEdit.js';
import * as PostsAPI from '../utils/api.js';

class App extends Component {
  componentDidMount() {
    PostsAPI.getAllCategories().then((categories) => {
      this.props._initCategories({categories});
    })

    PostsAPI.getAllPosts().then((posts) => {
      this.props._initPosts({posts});
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Readable!</h1>
        </header>
        <CategoriesList/>
        <Route exact path="/" render={() => (
          <PostsList newCategory={''}/>
        )}/>
        <Route path="/category/:category" render={({match}) => (
          <PostsList newCategory={match.params.category}/>
        )}/>
        <Route path="/post/:postid" render={({match}) => (
          <PostDetails newPostId={match.params.postid}/>
        )}/>
        <Route path="/edit/:postid" render={({match}) => (
          <PostEdit newPostId={match.params.postid}/>
        )}/>
        <Route path="/new_post" render={({match}) => (
          <PostEdit newPostId=''/>
        )}/>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    _initPosts: (data) => dispatch(initPosts(data)),
    _initCategories: (data) => dispatch(initCategories(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
