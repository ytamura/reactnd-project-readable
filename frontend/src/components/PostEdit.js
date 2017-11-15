import React, {Component} from 'react';
import {connect} from 'react-redux';
import uuid from 'uuid';
import {initComments, changeCurrPost,
        updatePost, createPost} from '../actions';
import {withRouter} from 'react-router-dom';
import PostHeader from './PostHeader.js';
import * as PostsAPI from '../utils/api.js';

class PostEdit extends Component {
  state = {
    postAuthor: '',
    postBody: '',
    postTitle: '',
    postCategory: 'react',
    error: '',
  }

  componentDidMount() {
    const {newPostId, currPost, _changeCurrPost} = this.props;

    if (newPostId !== '') {
      if (newPostId !== currPost.id) {
        //In case visited directly via URL
        PostsAPI.getPostById(newPostId).then((post) => {
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
    if (input.length > 0) {
      //clear error
      this.setState({error: ''});
    }
    this.setState({postAuthor: input});
  }

  updateTitle = (input) => {
    if (input.length > 0) {
      //clear error
      this.setState({error: ''});
    }
    this.setState({postTitle: input});
  }

  updateBody = (input) => {
    if (input.length > 0) {
      //clear error
      this.setState({error: ''});
    }
    this.setState({postBody: input});
  }

  updateCategory = (input) => {
    this.setState({postCategory: input});
  }

  submitPost = (submitId) => {
    const {postAuthor, postTitle, postBody, postCategory} = this.state;
    if (postAuthor.trim().length === 0 || postTitle.trim().length === 0 ||
        postBody.trim().length === 0 || postCategory.trim().length === 0) {
      this.setState({error: 'error: all fields required'});
      return;
    }

    const {newPostId, currPost, _createPost, _updatePost,
           history} = this.props;

    let newPost = ((newPostId === '') ? {} : Object.assign({}, currPost));
    newPost.author = postAuthor.trim();
    newPost.title = postTitle.trim();
    newPost.body = postBody.trim();
    newPost.category = postCategory;
    newPost.timestamp = Date.now();
    if (newPostId === '') {
      newPost.id = submitId;
      _createPost(newPost);
    } else {
      _updatePost(newPost);
    }

    history.push('/' + postCategory + '/' + submitId);
  }

  render() {
    const {postAuthor, postTitle, postBody, postCategory, error} = this.state;
    const {newPostId, currPost, categories} = this.props;

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
            <table className="post-edit-form">
              <tbody>
                <tr>
                  <td className="post-edit-form-label">Category:</td>
                  <td>
                  <select
                    value={postCategory}
                    onChange={(event) => this.updateCategory(event.target.value)}>
                    {categories.map((category) => (
                        <option key={category.name}
                                value={category.name}>{category.name}</option>
                      )
                    )}</select>
                  </td>
                </tr>
                <tr>
                  <td className="post-edit-form-label">Author:</td>
                  <td>
                  <input
                    type="text"
                    value={postAuthor}
                    placeholder="Post author"
                    maxLength="30"
                    onChange={(event) => this.updateAuthor(event.target.value)}
                  />
                  </td>
                </tr>
                <tr>
                  <td className="post-edit-form-label">Title:</td>
                  <td>
                  <input
                    type="text"
                    value={postTitle}
                    placeholder="Post title"
                    maxLength="70"
                    onChange={(event) => this.updateTitle(event.target.value)}
                  />
                  </td>
                </tr>
                <tr>
                  <td className="post-edit-form-label">Content:</td>
                  <td>
                  <input
                    type="text"
                    value={postBody}
                    className="long-text-input"
                    placeholder="Post body"
                    maxLength="500"
                    onChange={(event) => this.updateBody(event.target.value)}
                  />
                  </td>
                </tr>
                <tr>
                  <td className="post-edit-form-label">
                  <div
                    className="button submit-button"
                    onClick={() => this.submitPost(submitId)}>
                    save
                  </div>
                  </td>
                  <td><div className="error">{error}</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps({categories, currPost}) {
  return {
    categories: categories,
    currPost: currPost,
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