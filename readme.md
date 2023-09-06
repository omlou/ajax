### Languages

* [English](https://github.com/omlou/webtools#readme)
* [简体中文](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-zh.md)
* [日本語](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ja.md)
* [한국어](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ko.md)
* [Français](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-fr.md)

### Introduction

* Front-end tool for sending AJAX requests

### Usage

#### Using in Traditional Projects

```html
<script src="https://unpkg.com/@xlou/ajax@1.0.0/dist/umd/ajax.min.js"></script>
<!-- It's recommended to download and use the file locally -->
<script>
  /* After including this JS file, the ajax object will be available on the window */
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
    console.log("response", res.response)
  })
</script>
```

#### Using in Vue, React, Angular, and Other Node Projects

Installation

``` bash
npm i @xlou/ajax
```

In main.js or main.ts

``` javascript
/* Using the entire package */
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
  console.log("response", res.response)
})
```

### API

#### ajax

Send an AJAX request.

Parameter Details

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

Usage Example

``` javascript
ajax({
  url: "http://127.0.0.1:3000/post", // Specify the request address.
  method: "post", // Set the request type.
  headers: { // Set request header parameters.
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  params: { // Convert and append as query parameters to the request URL.
    id: 1
  },
  data: { // Convert the request body parameters based on the Content-Type.
    name: "Tom"
  },
  uploadProgress(ev) { }, // Add a listener for upload progress.
  downloadProgress(ev) { } // Add a listener for download progress.
})
.then(res => {
  console.log("post-data-urlencoded", res.response)
})
```

#### queryString

Convert an object into URL parameters.

Parameter Details

```typescript
queryString?: (obj: GeneralObject, bol?: boolean) => string
```

Usage Example

``` javascript
/* Script Tag Import */
ajax.queryString({
  id: 1,
  type: "hello"
})
// id=1&type=hello

/* Use ECMAScript Module import */
import { queryString } from '@xlou/ajax'
queryString({/* ... */})
```

#### getUrlParam

Convert an object into URL parameters and determine whether to add '?' based on the URL.

Parameter Details

```typescript
getUrlParam?: (url: string, data: GeneralObject | string) => string
```

Usage Example

``` javascript
/* Script Tag Import */
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

/* Use ECMAScript Module import */
import { getUrlParam } from '@xlou/ajax'
getUrlParam({/* ... */})
```

#### getHeaders

Convert the result returned by xhr.getAllResponseHeaders() into an object.

Parameter Details

```typescript
getHeaders?: (arg: string | null) => GeneralObject
```

Usage Example

``` javascript
/* Script Tag Import */
ajax.getHeaders(xhr.getAllResponseHeaders())

/* Use ECMAScript Module import */
import { getHeaders } from '@xlou/ajax'
getHeaders(xhr.getAllResponseHeaders())
```

#### ContentType

An object that contains some Content-Type.

Parameter Details

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

Usage Example

``` javascript
/* Script Tag Import */
ajax.ContentType

/* Use ECMAScript Module import */
import { ContentType } from '@xlou/ajax'
```