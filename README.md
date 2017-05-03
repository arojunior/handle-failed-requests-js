# handle-failed-requests-js

[![npm version](https://img.shields.io/npm/v/handle-failed-requests-js.svg)](https://www.npmjs.com/package/handle-failed-requests-js) [![npm downloads](https://img.shields.io/npm/dm/handle-failed-requests-js.svg)](https://www.npmjs.com/package/handle-failed-requests-js) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Implementation of [Offline-js](https://github.com/hubspot/offline) with some improvements

# Why?
Because Offline-js has some bugs and inconsistencies

# Features
* Promises support (axios)
* localStorage support
* Save ALL the failed requests, not just the last one
* Requests keep saved even if user try to refresh the page when offline
* Send ALL failed requests when connection is up again
* No need configuration

# How

* Node / npm

```shell
npm install --save handle-failed-requests-js
```

```javascript
import Request from 'handle-failed-requests-js'

Request.send({
  method: 'put',
  data: data,
  url: '/'
}).then(res => {
  console.log(res)
})

```
[example.html](https://github.com/arojunior/handle-failed-requests-js/blob/master/example.html)

```html
<script src="handle-requests.min.js"></script>
```

```javascript
var req = new Request();

// default method is post
req.send('/', data).then(function(res) {
  console.log(res)
})

// or
req
  .send({
    method: 'put',
    data: data,
    url: '/'
  })
  .then(function(res) {
    console.log(res)
  })  
```

See [Axios](https://github.com/mzabriskie/axios) documentation for requests options

[Artigo em português](https://medium.com/@arojunior/enviando-requisi%C3%A7%C3%B5es-sem-se-preocupar-com-o-status-da-conex%C3%A3o-2c8aca05457)
