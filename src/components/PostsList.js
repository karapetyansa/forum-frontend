import React, { Component } from 'react'
import ListItem from './PostsItem'
import { withData } from '../services/getFromApi'
import Pagination from './Pagination'

const _limit = 5

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

const PostsList = ({ loading, data, count, match }) => (
  <div className="container">
    <Pagination
      path="/posts"
      current={
        match.params.pageNumber ? Number(match.params.pageNumber) : undefined
      }
      count={count}
      itemOnPage={_limit}
    />
    <ListItems loading={loading} data={data} />
  </div>
)

const configObject = {
  params: ({ match }) => ({
    _page: match.params.pageNumber,
    _limit
  })
}

export default withData('/posts', configObject)(PostsList)
