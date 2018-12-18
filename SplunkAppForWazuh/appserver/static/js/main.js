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
    // codemirror: 'js/libs/codemirror-conv/lib/codemirror',
    //querystring: 'js/libs/codemirror-conv/querystring-browser/bundle',

    // dev-dependencies
    // jsonLint: 'js/libs/codemirror-conv/json-lint',

    // JSON2XML
    js2xmlparser: 'js/libs/json2xml/jsontoxml',

    // File saver
    FileSaver: 'js/libs/file-saver/file-saver',

    // dom-to-image
    domToImg: 'js/libs/required-dom-to-image/src/dom-to-image'
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
