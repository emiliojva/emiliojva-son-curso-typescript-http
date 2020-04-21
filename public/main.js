requirejs.config({
  baseUrl: "js/",
  paths: {
    'module1':'module1',
    'test':'test'
  }
});

requirejs(['test'],() => {
  // require('live-server')
  console.log('requirejs loaded')
});