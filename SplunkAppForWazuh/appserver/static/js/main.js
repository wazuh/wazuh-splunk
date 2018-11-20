require.config({
  baseUrl: `${
    window.location.href.split(/\/[a-z][a-z]-[A-Z][A-Z]\//)[0]
  }/static/app/SplunkAppForWazuh/`,
  out: 'main-built.js',

  // alias libraries paths.  Must set 'angular'
  paths: {
    angular: 'js/libs/angular',
    ngAnimate: 'js/libs/animate',
    ngAria: 'js/libs/aria',
    ngMessages: 'js/libs/messages',
    ngMaterial: 'js/libs/material',
    ngRoute: 'js/libs/router',
    // Dev tools dependencies
    'brace-fold': 'js/utils/codemirror/brace-fold',
    foldcode: 'js/utils/codemirror/foldcode',
    foldgutter: 'js/utils/codemirror/foldgutter',
    javascript: 'js/utils/codemirror/javascript',
    'mark-selection': 'js/utils/codemirror/mark-selection',
    'search-cursor': 'js/utils/codemirror/search-cursor',
    codemirror: 'js/utils/codemirror/lib/codemirror',
    querystring: 'js/utils/codemirror/querystring',

    // dev-dependencies
    jsonLint: 'js/utils/codemirror/json-lint',

    // File saver
    FileSaver: 'js/libs/file-saver/file-saver',

    // dom-to-image
    'domToImg': 'js/libs/dom-to-image/dom-to-image.min'
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    angular: {
      exports: 'angular'
    },
    ngAnimate: {
      exports: 'ngAnimate',
      deps: ['angular']
    },
    ngAria: {
      exports: 'ngAria',
      deps: ['angular']
    },
    ngMaterial: {
      exports: 'ngMaterial',
      deps: ['angular']
    },
    ngRoute: {
      exports: 'ngRoute',
      deps: ['angular']
    }
  },

  // kick start application
  deps: ['angular', 'ngMaterial', 'ngAnimate', 'ngAria', 'js/bootstrap']
})
