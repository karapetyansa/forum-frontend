import React from 'react'

const Header = ({ title, body }) => (
  <div className="blog-header">
    <div className="container">
      <h1 className="blog-title">{title}</h1>
      <p className="lead blog-description">{body}</p>
    </div>
  </div>
)

export default Header
