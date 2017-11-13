import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {getCommentsForPost} from '../utils/api.js';
import {initComments, changeCurrPost,
        updatePost, createPost} from '../actions';
import {Link, withRouter} from 'react-router-dom';
import PostHeader from './PostHeader.js';
import * as PostsAPI from '../utils/api.js';

class PostEdit extends Component {
  state = {
    postAuthor: '',
    postBody: '',
    postTitle: '',
    postCategory: 'react',
  }

  componentDidMount() {
    const {newPostId, currPost, _changeCurrPost, _initComments} = this.props;

    if (newPostId !== '') {
      if (newPostId !== currPost.id) {
        //In case visited directly via URL
        console.log('newPostId', newPostId)
        console.log('currPost.id', currPost.id)
        PostsAPI.getPostById(newPostId).then((post) => {
          console.log('gotpost', post);
          _changeCurrPost({post});
        });
      }

      this.updateAuthor(currPost.author);
      this.updateTitle(currPost.title);
      this.updateBody(currPost.body);
      this.updateCategory(currPost.category);
    }
  }

  updateAuthor = (input) => {
    this.setState({postAuthor: input});
  }

  updateTitle = (input) => {
    this.setState({postTitle: input});
  }

  updateBody = (input) => {
    this.setState({postBody: input});
  }

  updateCategory = (input) => {
    this.setState({postCategory: input});
  }

  submitPost = (submitId) => {
    const {postAuthor, postTitle, postBody, postCategory} = this.state;
    const {newPostId, currPost, _createPost, _updatePost,
           _changeCurrPost} = this.props;

    let newPost = ((newPostId === '') ? {} : Object.assign({}, currPost));
    newPost.author = postAuthor.trim();
    newPost.title = postTitle.trim();
    newPost.body = postBody.trim();
    newPost.category = postCategory;
    newPost.timestamp = Date.now();
    if (newPostId === '') {
      _createPost(newPost);
    } else {
      newPost.id = submitId;
      _updatePost(newPost);
    }
  }

  render() {
    const {postAuthor, postTitle, postBody, postCategory} = this.state;
    const {newPostId, currPost, comments, categories} = this.props;
    console.log('test', currPost)

    let submitId = uuid.v1();
    if (newPostId !== '') {
      submitId = currPost.id;
    }

    return (
      <div className="posts-list">
        {currPost === undefined
         ? "loading..."
         : <div className="post-list-item">
            {newPostId === ''
             ? <h4>Create a New Post</h4>
             : <div>
                <PostHeader post={currPost}/>
                <p>[{(new Date(currPost.timestamp)).toLocaleString()}] {currPost.body}</p>
               </div>
             }
            <div className="post-edit-form">
              <label>Category: </label>
              <select 
                value={postCategory}
                onChange={(event) => this.updateCategory(event.target.value)}>
                {categories.map((category) => (
                    <option key={category.name}
                            value={category.name}>{category.name}
                    </option>
                  )
                )}
              </select>
              <br/>
              <label>Author: </label>
              <input
                type="text"
                value={postAuthor}
                placeholder="Post author"
                onChange={(event) => this.updateAuthor(event.target.value)}
              />
              <br/>
              <label>Title: </label>
              <input
                type="text"
                value={postTitle}
                placeholder="Post title"
                onChange={(event) => this.updateTitle(event.target.value)}
              />
              <br/>
              <label>Content: </label>
              <input
                type="text"
                value={postBody}
                placeholder="Post body"
                onChange={(event) => this.updateBody(event.target.value)}
              />
              <br/>
              <div className="button"
                   onClick={() => this.submitPost(submitId)}>
                Submit Test
              </div>
              <Link to={"/post/" + submitId}
                    className="button"
                    onClick={() => this.submitPost(submitId)}>
                Submit
              </Link>
            </div>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps({categories, posts, currPost, comments}) {
  return {
    categories: categories,
    posts: posts,
    currPost: currPost,
    comments: comments,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _initComments: (data) => dispatch(initComments(data)),
    _changeCurrPost: (data) => dispatch(changeCurrPost(data)),
    _updatePost: (data) => dispatch(updatePost(data)),
    _createPost: (data) => dispatch(createPost(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostEdit));