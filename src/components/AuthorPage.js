import React from 'react'
import { Route } from 'react-router-dom'

import { withData } from '../services/getFromApi'

import Header from './Header'

const Author = ({ loading, data, count, match }) =>
  !loading ? <Header title={data.name} body={data.address} /> : null

const configAuthor = {
  funcName: 'getItem',
  params: ({ match }) => ({
    id: match.params.id
  })
}

const AuthorWithData = withData('/persons/', configAuthor)(Author)

export default props => (
  <div className="container">
    <Header title={props.name} body={props.address} />
    <Route path={`${props.match.url}/:id`} component={AuthorWithData} />
  </div>
)
