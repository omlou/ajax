### 言語

* [English](https://github.com/omlou/ajax#readme)
* [简体中文](https://github.com/omlou/ajax/blob/master/public/md/readme-zh.md)
* [日本語](https://github.com/omlou/ajax/blob/master/public/md/readme-ja.md)
* [한국어](https://github.com/omlou/ajax/blob/master/public/md/readme-ko.md)
* [Français](https://github.com/omlou/ajax/blob/master/public/md/readme-fr.md)

### はじめに

* AJAX リクエストを送信するためのフロントエンドツール

### 使用方法

#### 伝統的なプロジェクトでの使用

```html
<script src="https://unpkg.com/@xlou/ajax@1.0.2/dist/umd/ajax.min.js"></script>
<!-- ローカルにダウンロードして使用することをお勧めします -->
<script>
  /* このJSファイルを含めた後、ajaxオブジェクトはグローバルで利用可能になります */
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
    console.log("レスポンス", res.response)
  })
</script>
```

#### Vue、React、Angular、およびその他のNodeプロジェクトでの使用

インストール

```bash
npm i @xlou/ajax
```

main.jsまたはmain.tsで

```javascript
/* パッケージ全体を使用 */
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
  console.log("レスポンス", res.response)
})
```

### API

#### ajax

AJAX リクエストを送信します。

パラメータの詳細

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

使用例

```javascript
ajax({
  url: "http://127.0.0.1:3000/post", // リクエストアドレスを指定します。
  method: "post", // リクエストの種類を設定します。
  headers: { // リクエストヘッダーパラメータを設定します。
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  params: { // リクエストURLにクエリパラメータとして変換して追加します。
    id: 1
  },
  data: { // Content-Typeに基づいてリクエストボディパラメータを変換します。
    name: "Tom"
  },
  uploadProgress(ev) { }, // アップロード進捗を監視するリスナーを追加します。
  downloadProgress(ev) { } // ダウンロード進捗を監視するリスナーを追加します。
})
.then(res => {
  console.log("post-data-urlencoded", res.response)
})
```

#### queryString

オブジェクトをURLパラメータに変換します。

パラメータの詳細

```typescript
queryString?: (obj: GeneralObject, bol?: boolean) => string
```

使用例

```javascript
/* Scriptタグのインポートを使用 */
ajax.queryString({
  id: 1,
  type: "hello"
})
// id=1&type=hello

/* ECMAScriptモジュールのインポートを使用 */
import { queryString } from '@xlou/ajax'
queryString({/* ... */})
```

#### getUrlParam

オブジェクトをURLパラメータに変換し、URLに基づいて'?'を追加するかどうかを判断します。

パラメータの詳細

```typescript
getUrlParam?: (url: string, data: GeneralObject | string) => string
```

使用例

```javascript
/* Scriptタグのインポートを使用 */
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

/* ECMAScriptモジュールのインポートを使用 */
import { getUrlParam } from '@xlou/ajax'
getUrlParam({/* ... */})
```

#### getHeaders

xhr.getAllResponseHeaders()が返す結果をオブジェクトに変換します。

パラメータの詳細

```typescript
getHeaders?: (arg: string | null) => GeneralObject
```

使用例

```javascript
/* Scriptタグのインポートを使用 */
ajax.getHeaders(xhr.getAllResponseHeaders())

/* ECMAScriptモジュールのインポートを使用 */
import { getHeaders } from '@xlou/ajax'
getHeaders(xhr.getAllResponseHeaders())
```

#### ContentType

いくつかのContent-Typeを含むオブジェクトです。

パラメータの

詳細

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

使用例

```javascript
/* Scriptタグのインポートを使用 */
ajax.ContentType

/* ECMAScriptモジュールのインポートを使用 */
import { ContentType } from '@xlou/ajax'
```