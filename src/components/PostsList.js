import React, { Component } from 'react'
import ListItem from './PostsItem'

import Pagination from './Pagination'
import { ITEM_ON_PAGE } from '../helpers/constants'

const toListItem = ({ id: key, ...rest }) => <ListItem key={key} {...rest} />

const Loading = ({ loading }) =>
  loading ? <h2> Loading </h2> : <h2> Loaded </h2>

class ListItems extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !nextProps.loading
  }
  render() {
    const { data, loading = true } = this.props
    return loading ? (
      <Loading loading={loading} />
    ) : (
      <ul className="list-group">{data.map(toListItem)}</ul>
    )
  }
}

export default ({ loading, data, count, match }) => (
  <div>
    <Pagination
      path="/posts"
      current={
        match.params.pageNumber ? Number(match.params.pageNumber) : undefined
      }
      count={count}
      itemOnPage={ITEM_ON_PAGE}
    />
    <ListItems loading={loading} data={data} />
  </div>
)
