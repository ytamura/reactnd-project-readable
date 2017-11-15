# Readable Project TL;DR
This project is comprised of two components:
1. Readable API Server (provided by Udacity)
2. Frontend react project

To get it running, 
* Install and start the API server
    - `cd api-server`
    - `npm install` (if not done previously)
    - `node server`
* Install and start frontend
    - `cd ../frontend`
    - `npm install` (if not done previously)
    - `npm start`
* Upon successful start, navigate to `localhost:3000` if not automatically directed.

# Readable API Server

This is the starter project for the final assessment project for Udacity's Redux course where you will build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This repository includes the code for the backend API Server that you'll use to develop and interact with the front-end portion of the project.

### API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).

# Frontend
The front-end is a react project that uses redux to manage most of the state. Middleware (redux-thunk) is used to manage API calls associated with state changes.  The app shows a list of posts that any user can update, add to, or delete.  Each post has a list of comments that any user can update, add to, or delete as well. Posts and comments also have votes, and can be upvoted or downvoted.  In this implementation, the state will persist until the API server is restarted.
