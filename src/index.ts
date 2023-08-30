import { queryString, GeneralObject } from '@xlou/webtools'

function getUrlParam(url: string, data: GeneralObject | string): string {
  if (!data) { return "" }
  let paramsString = typeof data === "string" ? data : queryString(data)
  if (!paramsString) return ""
  return url.indexOf('?') !== -1 ? ('&' + paramsString) : ('?' + paramsString)
}

function getPostParam(data: any): any {
  if (!data) return null
  if ((typeof data === "string") || (data instanceof FormData)) {
    return data
  }
  return queryString(data)
}

function ajax() {
  
}