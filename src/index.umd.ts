import ajax, { queryString, getUrlParam, getHeaders, ContentType } from "./index"

Object.assign(ajax, {
  queryString,
  getUrlParam,
  getHeaders,
  ContentType
})

export default ajax