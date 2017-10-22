import React from 'react'
import { Route } from 'react-router-dom'

import { withData } from '../services/getFromApi'
import Header from './Header'
import PostsList from './PostsList'
import { ITEM_ON_PAGE } from '../helpers/constants'

const configPostsList = {
  funcName: 'getKeyValue',
  params: ({ match }) => ({
    _page: match.params.pageNumber,
    _limit: ITEM_ON_PAGE
  })
}

const PostsListWithData = withData('/posts', configPostsList)(PostsList)

const PostsPage = props => (
  <div className="container">
    <Header title={'Список Постов'} body={'Описание списка постов'} />
    <Route exact path={props.match.url} component={PostsListWithData} />
    <Route
      path={`${props.match.url}/:pageNumber`}
      component={PostsListWithData}
    />
  </div>
)
export default PostsPage
