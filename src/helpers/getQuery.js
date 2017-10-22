// construct query for key-value pair,
//for examle: Filter, Paginate, Sort ({_page: 4, _limit: 5}) => '?_page=4&_limit=5'
const getKeyValue = params =>
  '?' +
  Object.keys(params)
    .filter(key => !!params[key]) // delete empty value
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&')

const getItem = params => '/' + params.id

export default (funcName, params) =>
  ({ getKeyValue, getItem }[funcName](params))
