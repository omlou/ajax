import ajax, { getUrlParam, getHeaders, ContentType } from "./index"

Object.assign(ajax, {
  getUrlParam,
  getHeaders,
  ContentType
})

export default ajax