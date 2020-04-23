requirejs.config({
  baseUrl: "/js",
  paths: {
    'module1':'module1',
    'test':'test',
    'post-list-page':'page/post-list-page'
  }
});

// 'test'
requirejs(['page/post-list-page'],() => {
  // require('live-server')
  console.log('requirejs loaded')
});