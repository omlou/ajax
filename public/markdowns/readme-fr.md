### Langues

* [English](https://github.com/omlou/webtools#readme)
* [简体中文 (Chinois simplifié)](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-zh.md)
* [日本語 (Japonais)](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ja.md)
* [한국어 (Coréen)](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-ko.md)
* [Français](https://github.com/omlou/webtools/blob/master/public/markdowns/readme-fr.md)

### Introduction

* Outil front-end pour envoyer des requêtes AJAX

### Utilisation

#### Utilisation dans des projets traditionnels

```html
<script src="https://unpkg.com/@xlou/ajax@1.0.0/dist/umd/ajax.min.js"></script>
<!-- Il est recommandé de télécharger le fichier localement et de l'utiliser -->
<script>
  /* Après avoir inclus ce fichier JS, l'objet ajax sera disponible dans la fenêtre */
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
    console.log("réponse", res.response)
  })
</script>
```

#### Utilisation dans Vue, React, Angular et d'autres projets Node

Installation

```bash
npm i @xlou/ajax
```

Dans main.js ou main.ts

```javascript
/* Utilisation du package complet */
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
  console.log("réponse", res.response)
})
```

### API

#### ajax

Envoyer une requête AJAX.

Détails des paramètres

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

Exemple d'utilisation

```javascript
ajax({
  url: "http://127.0.0.1:3000/post", // Spécifiez l'adresse de la requête.
  method: "post", // Définissez le type de requête.
  headers: { // Définissez les paramètres d'en-tête de la requête.
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  },
  params: { // Convertissez et ajoutez en tant que paramètres de requête à l'URL de la requête.
    id: 1
  },
  data: { // Convertissez les paramètres du corps de la requête en fonction du Content-Type.
    name: "Tom"
  },
  uploadProgress(ev) { }, // Ajoutez un écouteur pour la progression de l'envoi.
  downloadProgress(ev) { } // Ajoutez un écouteur pour la progression du téléchargement.
})
.then(res => {
  console.log("post-data-urlencoded", res.response)
})
```

#### queryString

Convertir un objet en paramètres d'URL.

Détails des paramètres

```typescript
queryString?: (obj: GeneralObject, bol?: boolean) => string
```

Exemple d'utilisation

```javascript
/* Importation par balise script */
ajax.queryString({
  id: 1,
  type: "hello"
})
// id=1&type=hello

/* Importation via ECMAScript Module */
import { queryString } from '@xlou/ajax'
queryString({/* ... */})
```

#### getUrlParam

Convertir un objet en paramètres d'URL et déterminer s'il faut ajouter '?' en fonction de l'URL.

Détails des paramètres

```typescript
getUrlParam?: (url: string, data: GeneralObject | string) => string
```

Exemple d'utilisation

```javascript
/* Importation par balise script */
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

/* Importation via ECMAScript Module */
import { getUrlParam } from '@xlou/ajax'
getUrlParam({/* ... */})
```

#### getHeaders

Convertir le résultat renvoyé par xhr.getAllResponseHeaders() en un objet.

Détails des paramètres

```typescript
getHeaders?: (arg: string | null) => General

Object
```

Exemple d'utilisation

```javascript
/* Importation par balise script */
ajax.getHeaders(xhr.getAllResponseHeaders())

/* Importation via ECMAScript Module */
import { getHeaders } from '@xlou/ajax'
getHeaders(xhr.getAllResponseHeaders())
```

#### ContentType

Un objet contenant quelques types de Content-Type.

Détails des paramètres

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

Exemple d'utilisation

```javascript
/* Importation par balise script */
ajax.ContentType

/* Importation via ECMAScript Module */
import { ContentType } from '@xlou/ajax'
```