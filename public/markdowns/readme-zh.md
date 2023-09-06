### 语言

* [English](https://github.com/omlou/webtools#readme)
* [简体中文](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-zh.md)
* [日本語](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ja.md)
* [한국어](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ko.md)
* [Français](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-fr.md)

### 简介

* 用于发送 AJAX 请求的前端工具

### 用法

#### 在传统项目中使用

```html
<script src="https://unpkg.com/@xlou/ajax@1.0.0/dist/umd/ajax.min.js"></script>
<!-- 建议下载并在本地使用文件 -->
<script>
  /* 包含此JS文件后，ajax对象将在全局可用 */
  ajax({
    url: "http://127.0.0.1:3000/post",
    method: "post",
    params: {
      id: 1
    },
    data: {
      name: "Tom"
    }
  })
  .then(res => {
    console.log("响应", res.response)
  })
</script>
```

#### 在Vue、React、Angular和其他Node项目中使用

安装

```bash
npm i @xlou/ajax
```

在 main.js 或 main.ts 中

```javascript
import ajax from '@xlou/ajax'

ajax({
  url: "http://127.0.0.1:3000/post",
  method: "post",
  params: {
    id: 1
  },
  data: {
    name: "Tom"
  }
})
.then(res => {
  console.log("响应", res.response)
})
```

### API

#### ajax

发送一个AJAX请求。

参数详情

```typescript
interface GeneralObject {
  [prop: string]: string | number | boolean | null | undefined
}

interface AjaxOptions {
  (args: AjaxArguments): Promise<AjaxRequest>
  queryString?: (obj: GeneralObject, bol?: boolean) => string
  getUrlParam?: (url: string, data: GeneralObject | string) => string
  getHeaders?: (arg: string | null) => GeneralObject
  ContentType?: ContentType
}

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

const ajax: AjaxOptions = function(args: AjaxArguments): Promise<AjaxRequest>
```

使用示例

```javascript
ajax({
  url: "http://127.0.0.1:3000/post", // 指定请求地址。
  method: "post", // 设置请求类型。
  headers: { // 设置请求头参数。
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  params: { // 转换为URL参数并拼接到请求地址。
    id: 1
  },
  data: { // 根据Content-Type将请求体参数转换。
    name: "Tom"
  },
  uploadProgress(ev) { }, // 添加上传进度的监听。
  downloadProgress(ev) { } // 添加下载进度的监听。
})
.then(res => {
  console.log("post-data-urlencoded", res.response)
})
```

#### queryString

将对象转换为URL参数。

参数详情

```typescript
queryString?: (obj: GeneralObject, bol?: boolean) => string
```

使用示例

```javascript
/* 使用Script标签导入 */
ajax.queryString({
  id: 1,
  type: "hello"
})
// id=1&type=hello

/* 使用ECMAScript模块导入 */
import { queryString } from '@xlou/ajax'
queryString({/* ... */})
```

#### getUrlParam

将对象转换为URL参数，并根据URL判断是否需要添加'?'。

参数详情

```typescript
getUrlParam?: (url: string, data: GeneralObject | string) => string
```

使用示例

```javascript
/* 使用Script标签导入 */
ajax.getUrlParam("www.xxx.com", {
  id: 1,
  type: "hello"
})
// ?id=1&type=hello

ajax.getUrlParam("www.xxx.com?key=a", {
  id: 1,
  type: "hello"
})
// id=1&type=hello

/* 使用ECMAScript模块导入 */
import { getUrlParam } from '@xlou/ajax'
getUrlParam({/* ... */})
```

#### getHeaders

将xhr.getAllResponseHeaders()返回的结果转化为对象。

参数详情

```typescript
getHeaders?: (arg: string | null) => GeneralObject
```

使用示例

```javascript
/* 使用Script标签导入 */
ajax.getHeaders(xhr.getAllResponseHeaders())

/* 使用ECMAScript模块导入 */
import { getHeaders } from '@xlou/ajax'
getHeaders(xhr.getAllResponseHeaders())
```

#### ContentType

包含了一些Content-Type的对象。

参数详情

```typescript
enum ContentType {
  json = "application/json;charset=UTF-8",
  urlencoded = "application/x-www-form-urlencoded;charset=UTF-8",
  formData = "multipart/form-data",
  text = "text/plain;charset=UTF-8",
  xml = "application/xml;charset=UTF-8",
  stream = "application/octet-stream"
}
```

使用示例

```javascript
/* 使用Script标签导入 */
ajax.ContentType

/* 使用ECMAScript模块导入 */
import { ContentType } from '@xlou/ajax'
```