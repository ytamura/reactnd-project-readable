import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initPosts } from '../actions';
import '../App.css';
import CategoriesList from './CategoriesList.js';
import PostsList from './PostsList.js';
import * as PostsAPI from '../utils/api.js';

class App extends Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    PostsAPI.getAllCategories().then((categories) => {
      this.setState({ categories })
    })

    PostsAPI.getAllPosts().then((posts) => {
      this.props._initPosts({posts});
    })
  }

  render() {
    const { categories } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Readable!</h1>
        </header>
        <p className="App-intro">
          A category-based content and comment app.
        </p>
        <CategoriesList categories={categories}/>
        <PostsList/>
      </div>
    );
  }
}

function mapStateToProps ({ posts }) {
  return {
    posts: posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    _initPosts: (data) => dispatch(initPosts(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
