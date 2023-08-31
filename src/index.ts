import { queryString, GeneralObject } from '@xlou/webtools'

interface AjaxArguments {
  method?: string
  headers?: GeneralObject,
  url: string,
  params?: GeneralObject,
  data?: any,
  responseType?: string,
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

/* 将对象转换为可拼接在 URL 后的参数 */
function getUrlParam(url: string, data: GeneralObject | string): string {
  if (!data) { return "" }
  let paramsString = typeof data === "string" ? data : queryString(data)
  if (!paramsString) return ""
  return url.indexOf('?') !== -1 ? ('&' + paramsString) : ('?' + paramsString)
}

/* 转换 POST 请求的 body 参数 */
function getPostParam(data: any): any {
  if (!data) return null
  if ((typeof data === "string") || (data instanceof FormData)) {
    return data
  }
  return queryString(data)
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