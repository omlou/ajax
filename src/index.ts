import { queryString, GeneralObject } from '@xlou/webtools'

interface AjaxArguments {
  method?: string
  headers?: GeneralObject,
  url: string,
  params?: GeneralObject,
  data?: any,
  responseType?: ResType,
  withCredentials?: boolean,
  timeout?: number,
  uploadProgress?: (ev: Event) => any
  downloadProgress?: (ev: Event) => any
}

interface AjaxRequest {
  config: AjaxArguments
  response: any
  headers: GeneralObject
  request: XMLHttpRequest
  status: number
  statusText: string
}

enum ResType {
  DF = "",
  AB = "arraybuffer",
  Blob = "blob",
  DOC = "document",
  JSON = "json",
  TXT = "text"
}

enum ContentType {
  json = "application/json;charset=UTF-8",
  urlencoded = "application/x-www-form-urlencoded;charset=UTF-8",
  formData = "multipart/form-data",
  text = "text/plain;charset=UTF-8",
  xml = "application/xml;charset=UTF-8",
  stream = "application/octet-stream"
}

const bodySet = new Set([
  '[object String]',
  '[object FormData]',
  '[object Blob]',
  '[object ArrayBuffer]',
  '[object URLSearchParams]',
  '[object Null]',
  '[object Undefined]'
])

/* 将对象转换为可拼接在 URL 后的参数 */
function getUrlParam(url: string, data: GeneralObject | string): string {
  if (!data) { return "" }
  let paramsString = typeof data === "string" ? data : queryString(data)
  if (!paramsString) return ""
  return url.indexOf('?') !== -1 ? ('&' + paramsString) : ('?' + paramsString)
}

/* 转换 POST 请求的 body 参数 */
function typeJSON(data: any): any {
  
}
function typeURL(data: any): any {
  if (!data) return null
  if ((typeof data === "string") || (data instanceof FormData)) {
    return data
  }
  return queryString(data)
  var a : XMLHttpRequestBodyInit
}

/* 获取返回头参数 */
function getHeaders(arg: string | null): GeneralObject {
  const headers: any = {}
  if (arg !== null) {
    const arr = arg.trim().split(/[\r\n]+/)
    for (const item of arr) {
      const parts = item.split(": ")
      headers[parts[0]] = parts[1]
    }
  }
  return headers
}

/* 判断请求是否成功 */
function getOk(status: number): boolean {
  return status >= 200 && status <= 299
}

function ajax(args: AjaxArguments): Promise<AjaxRequest> {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest()

    /* 监听请求成功返回结果 */
    xhr.addEventListener('load', ev => {
      console.log("load", ev, xhr)
      const headers = getHeaders(xhr.getAllResponseHeaders())
      const ajaxRequest = {
        request: xhr,
        config: args,
        headers,
        response: xhr.response,
        status: xhr.status,
        statusText: xhr.statusText
      }
      if (getOk(xhr.status)) {
        resolve(ajaxRequest)
      } else {
        reject(ajaxRequest)
      }
    })

    /* 监听请求发生错误 */
    xhr.addEventListener('error', ev => {
      console.log("error", ev, xhr)
      reject(ev)
    })

    /* 监听请求超时 */
    xhr.addEventListener('timeout', ev => {
      console.log("timeout", ev, xhr)
      reject(ev)
    })

    /* 添加上传进度的监听 */
    if (args.uploadProgress) {
      xhr.upload.addEventListener('loadstart', ev => {
        (args.uploadProgress as any)(ev)
      })
      xhr.upload.addEventListener('progress', ev => {
        (args.uploadProgress as any)(ev)
      })
      xhr.upload.addEventListener('load', ev => {
        (args.uploadProgress as any)(ev)
      })
      xhr.upload.addEventListener('loadend', ev => {
        (args.uploadProgress as any)(ev)
      })
      xhr.upload.addEventListener('error', ev => {
        (args.uploadProgress as any)(ev)
      })
    }

    /* 添加下载监听 */
    if (args.downloadProgress) {
      xhr.addEventListener('loadstart', ev => {
        (args.downloadProgress as any)(ev)
      })
      xhr.addEventListener('progress', ev => {
        (args.downloadProgress as any)(ev)
      })
      xhr.addEventListener('loadend', ev => {
        (args.downloadProgress as any)(ev)
      })
    }

    /* 处理请求参数 */
    let { method, url, params, data, headers, timeout, responseType, withCredentials } = args
    
    /* 处理 method */
    method = method ? method.toUpperCase() : "GET"
    let simrequ = false
    if (new Set(['GET', 'DELETE', 'HEAD', 'OPTIONS', 'TRACE']).has(method)) {
      simrequ = true
    }

    /* 处理 url */
    if (params) {
      url += getUrlParam(url, params)
    }

    /* 开启请求 */
    xhr.open(method, url, true)

    /* 处理 withCredentials ，该参数控制请求是否支持携带 cookie */
    if (withCredentials !== undefined) {
      xhr.withCredentials = withCredentials
    }

    /* 处理 responseType */
    xhr.responseType = responseType || ResType.JSON

    /* 处理 headers ，并根据 Content-Type 处理 data 数据 */
    if (headers) {
      let type = ""
      for (const i in headers) {
        let item = headers[i]
        if (item === null || item === undefined) {
          item = ""
        } else {
          item = String(item)
        }
				xhr.setRequestHeader(i, item)
        const key = i
        if (key.toLowerCase() === 'content-type') {
          type = item
        }
			}
    } else {

    }



    /* let method = "GET"
    if (init) {
      method = (init.method?.toUpperCase() || "GET")
    }
    let simrequ = false
    if (new Set(['GET', 'DELETE', 'HEAD', 'OPTIONS', 'TRACE']).has(method)) simrequ = true
    if (input instanceof Request) input = input.url
    xhr.open(method, input, true)
    xhr.responseType = "blob"
    if (init) {
      if (init.credentials && init.credentials === "include") {
        xhr.withCredentials = true
      }
      const { headers } = init
      if (headers) {
        if (Array.isArray(headers)) {
          for (const item of headers) {
            xhr.setRequestHeader(item[0], item[1])
          }
        } else if (headers instanceof Headers) {
          headers.forEach((item, i) => {
            xhr.setRequestHeader(i, item)
          })
        } else {
          for (const i in headers) {
            xhr.setRequestHeader(i, headers[i])
          }
        }
      }
    }
    let body = null
    if (init) {
      body = (init.body || null)
    }
    if (body instanceof ReadableStream) throw "Body does not support ReadableStream in XMLHttpRequest."
    xhr.send(body) */
  })
}