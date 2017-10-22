import React from 'react'
import { Route } from 'react-router-dom'

import Header from './Header'
import PostsList from './PostsList'

const PostsPage = props => (
  <div className="container">
    <Header title={'Список Постов'} body={'Описание списка постов'} />
    <Route exact path={props.match.url} component={PostsList} />
    <Route path={`${props.match.url}/:pageNumber`} component={PostsList} />
  </div>
)
export default PostsPage
