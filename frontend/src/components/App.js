import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {initPosts, initCategories, changeCurrCategory} from '../actions';
import '../App.css';
import CategoriesList from './CategoriesList.js';
import PostsList from './PostsList.js';
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
        <p className="App-intro">
          A category-based content and comment app.
        </p>
        <CategoriesList/>
        <Route exact path="/" render={() => (
          <PostsList newCategory={''}/>
        )}/>
        <Route path="/:category" render={({match}) => (
          <PostsList newCategory={match.params.category}/>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
