requirejs.config({
  baseUrl: "/js",
  paths: {
    'module1':'module1',
    'test':'test',
    'post-list-page':'page/post-list-page',
    'post-new-page' :'page/post-new-page'
  }
});

requirejs(window.MODULE_INITIALIZER,() => {
  // require('live-server')
  console.log('requirejs loaded')

  /**
   * Polyfill - .startWith for ES5
   * ref: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
   */
  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, rawPos) {
            var pos = rawPos > 0 ? rawPos|0 : 0;
            return this.substring(pos, pos + search.length) === search;
        }
    });
  }
  
});