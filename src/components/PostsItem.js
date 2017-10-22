import React from 'react'
import { Link } from 'react-router-dom'

const PostsItem = props => (
  <div className="blog-post">
    <h2 className="blog-post-title">{props.title}</h2>
    <p className="blog-post-meta">
      {props.createAt.slice(0, 10)} by{' '}
      <Link to={'/author/' + props.authorId}>{props.authorName}</Link>
    </p>
    <p>{props.textPreview}</p>
  </div>
)
export default PostsItem
