import { Component } from 'react'

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

export const withData = (url, configObject) => WrapedComp => {
  return class extends Component {
    state = {
      count: null,
      data: undefined,
      time: null,
      loading: true
    }

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
      const params = configObject.params(props)
      const eURI = encodeURIComponent
      const suffixUrl = Object.keys(params)
        .filter(key => !!params[key]) // удаляем пустые значеня
        .map(key => eURI(key) + '=' + eURI(params[key]))
        .join('&')
      this.setState(await fetchFromServer(url + '?' + suffixUrl))
    }

    render() {
      // return <WrapComp data={this.state.data} />
      return WrapedComp({ ...this.props, ...this.state })
    }
  }
}
