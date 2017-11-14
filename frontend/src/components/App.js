import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {initPosts, initCategories} from '../actions';
import '../App.css';
import CategoriesList from './CategoriesList.js';
import PostsList from './PostsList.js';
import PostDetails from './PostDetails.js';
import PostEdit from './PostEdit.js';

class App extends Component {
  componentDidMount() {
    this.props._initCategories();
    this.props._initPosts();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Readable!</h1>
        </header>
        <CategoriesList/>
        <Switch>
          <Route exact path="/" render={() => (
            <PostsList newCategory={''}/>
          )}/>
          <Route path="/category/:category" render={({match}) => (
            <PostsList newCategory={match.params.category}/>
          )}/>
          <Route path="/edit/:postid" render={({match}) => (
            <PostEdit newPostId={match.params.postid}/>
          )}/>
          <Route exact path="/new_post" render={({match}) => (
            <PostEdit newPostId=''/>
          )}/>
          <Route exact path="/error" render={() => (
            <div>ERROR</div>
          )}/>
          <Route path="/:category/:postid" render={({match}) => (
            <PostDetails newCategory={match.params.category}
                         newPostId={match.params.postid}/>
          )}/>
        </Switch>
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
