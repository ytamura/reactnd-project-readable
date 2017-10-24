const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, {headers})
    .then(res => res.json())

export const getPostsInCategory = (category) =>
  fetch(`${api}/${category}/posts`, {headers})
    .then(res => res.json())
    .then(data => data.posts)

export const getCommentsForPost = (post) =>
  fetch(`${api}/posts/${post.id}/comments`, {headers})
    .then(res => res.json())
    .then(data => data)


// export const remove = (contact) =>
//   fetch(`${api}/contacts/${contact.id}`, { method: 'DELETE', headers })
//     .then(res => res.json())
//     .then(data => data.contact)

// export const create = (body) =>
//   fetch(`${api}/contacts`, {
//     method: 'POST',
//     headers: {
//       ...headers,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }).then(res => res.json())
