# handle-failed-requests-js

Implementation of [Offline-js](https://github.com/hubspot/offline) with some improvements

# Why?
Because Offline-js has some bugs and inconsistency

# Features
* Promises support
* Save ALL the failed requests, not just the last one
* Send ALL failed requests when connection is up again
* No need configuration

# How

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

I´m working on it to remove the offline-js dependency
