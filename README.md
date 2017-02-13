# handle-failed-requests-js

Implementation of [Offline-js](https://github.com/hubspot/offline) with some improvements

# Why?
Because Offline-js has some bugs and inconsistency

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
    method  : 'put',
    data    : data,
    url     : '/'
})
.then((res) => {
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
req.send('/', data)
.then(function(res) {
    console.log(res)
})

// or
req.send({
    method  : 'put',
    data    : data,
    url     : '/'
})
.then(function(res) {
    console.log(res)
})    
```

Look at [Axios](https://github.com/mzabriskie/axios) for requests options

[Artigo em português](https://medium.com/@arojunior/enviando-requisi%C3%A7%C3%B5es-sem-se-preocupar-com-o-status-da-conex%C3%A3o-2c8aca05457)
