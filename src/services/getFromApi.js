import { Component } from 'react'
import getQuery from '../helpers/getQuery'

const uri = ''

const oldTime = 120000
const cache = {}
const useCashe = false

const fetchWithCache = async url => {
  let result = cache[url]
  const time = Date.now()
  if (!result || result.time < time - oldTime) {
    const res = await fetch(uri + url)
    result = {
      count: Number(res.headers.get('X-Total-Count')),
      data: await res.json(),
      time,
      loading: false
    }
    cache[url] = result
  }
  return result
}

const fetchWithoutCache = async url => {
  const time = Date.now()
  const res = await fetch(uri + url)
  const result = {
    count: Number(res.headers.get('X-Total-Count')),
    data: await res.json(),
    time,
    loading: false
  }
  return result
}

const fetchFromServer = useCashe ? fetchWithCache : fetchWithoutCache

// configObject.params converts props to an object with parameters
export const withData = (url, { params, funcName }) => WrapedComp => {
  return class extends Component {
    state = {
      count: null,
      data: undefined,
      time: null,
      loading: true
    }

    static displayName = WrapedComp.name

    componentDidMount() {
      this.fetchData(this.props)
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        count: this.state.count,
        data: this.state.data,
        time: null,
        loading: true
      })
      this.fetchData(nextProps)
    }

    fetchData = async props => {
      this.setState(
        await fetchFromServer(url + getQuery(funcName, params(props)))
      )
    }

    render() {
      // return <WrapComp data={this.state.data} />
      return WrapedComp({ ...this.props, ...this.state })
    }
  }
}
