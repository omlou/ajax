### 언어

* [English](https://github.com/omlou/webtools#readme)
* [简体中文](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-zh.md)
* [日本語](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ja.md)
* [한국어](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ko.md)
* [Français](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-fr.md)

### 소개

* AJAX 요청을 보내는 프론트엔드 도구

### 사용법

#### 전통적인 프로젝트에서 사용하기

```html
<script src="https://unpkg.com/@xlou/ajax@1.0.0/dist/umd/ajax.min.js"></script>
<!-- 파일을 다운로드하고 로컬로 사용하는 것이 좋습니다 -->
<script>
  /* 이 JS 파일을 포함한 후에 ajax 객체가 전역으로 사용 가능합니다 */
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
    console.log("응답", res.response)
  })
</script>
```

#### Vue, React, Angular 및 기타 Node 프로젝트에서 사용하기

설치

```bash
npm i @xlou/ajax
```

main.js 또는 main.ts에서

```javascript
/* 패키지 전체를 사용 */
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
  console.log("응답", res.response)
})
```

### API

#### ajax

AJAX 요청을 보냅니다.

매개변수 상세 정보

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

사용 예시

```javascript
ajax({
  url: "http://127.0.0.1:3000/post", // 요청 주소 지정.
  method: "post", // 요청 유형 설정.
  headers: { // 요청 헤더 매개변수 설정.
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  params: { // 요청 URL에 쿼리 매개변수로 변환하여 추가.
    id: 1
  },
  data: { // Content-Type에 기반하여 요청 본문 매개변수 변환.
    name: "Tom"
  },
  uploadProgress(ev) { }, // 업로드 진행 상황을 감시하는 리스너 추가.
  downloadProgress(ev) { } // 다운로드 진행 상황을 감시하는 리스너 추가.
})
.then(res => {
  console.log("post-data-urlencoded", res.response)
})
```

#### queryString

객체를 URL 매개변수로 변환합니다.

매개변수 상세 정보

```typescript
queryString?: (obj: GeneralObject, bol?: boolean) => string
```

사용 예시

```javascript
/* Script 태그 가져오기를 사용 */
ajax.queryString({
  id: 1,
  type: "hello"
})
// id=1&type=hello

/* ECMAScript 모듈 가져오기를 사용 */
import { queryString } from '@xlou/ajax'
queryString({/* ... */})
```

#### getUrlParam

객체를 URL 매개변수로 변환하고 URL을 기반으로 '?'를 추가할지 여부를 결정합니다.

매개변수 상세 정보

```typescript
getUrlParam?: (url: string, data: GeneralObject | string) => string
```

사용 예시

```javascript
/* Script 태그 가져오기를 사용 */
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

/* ECMAScript 모듈 가져오기를 사용 */
import { getUrlParam } from '@xlou/ajax'
getUrlParam({/* ... */})
```

#### getHeaders

xhr.getAllResponseHeaders()가 반환한 결과를 객체로 변환합니다.

매개변수 상세 정보

```typescript
getHeaders?: (arg: string | null) => GeneralObject
```

사용 예시

```javascript
/* Script 태그 가져오기를 사용 */
ajax.getHeaders(xhr.getAllResponseHeaders())

/* ECMAScript 모듈 가져오기를 사용 */
import { getHeaders } from '@xlou/ajax'
getHeaders(xhr.getAllResponseHeaders())
```

#### ContentType

일부 Content-Type을 포함하는 객체입니다.

매개변수 상세 정보

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

사용 예시

```javascript
/* Script 태그 가져오기를 사용 */
ajax.ContentType

/* ECMAScript 모듈 가져오기를

 사용 */
import { ContentType } from '@xlou/ajax'
```