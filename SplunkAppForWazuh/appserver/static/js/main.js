require.config({
  baseUrl: "/static/app/SplunkAppForWazuh/",

  // alias libraries paths.  Must set 'angular'
  paths: {
    'angular': 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.2/angular',
    'ngAnimate': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-animate.min',
    'ngAria': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-aria.min',
    'ngMessages': 'http://ajax.googleapis.com/ajax/libs/angularjs/1.7.2/angular-messages.min',
    'ngMaterial': 'http://ajax.googleapis.com/ajax/libs/angular_material/1.1.10/angular-material.min',
    'ngRoute': 'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.18/angular-ui-router.min',
    // Dev tools dependencies
    'brace-fold': 'js/utils/codemirror/brace-fold',
    'foldcode': 'js/utils/codemirror/foldcode',
    'foldgutter': 'js/utils/codemirror/foldgutter',
    'javascript': 'js/utils/codemirror/javascript',
    'mark-selection': 'js/utils/codemirror/mark-selection',
    'search-cursor': 'js/utils/codemirror/search-cursor',
    'codemirror': 'js/utils/codemirror/lib/codemirror',
    'querystring': 'js/utils/codemirror/querystring',
    'jsonLint': 'js/utils/codemirror/json-lint',

  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    'angular': {
      exports: 'angular'
    },
    'ngAnimate': {
      exports: "ngAnimate",
      deps: ["angular"]
    },
    'ngAria': {
      exports: "ngAria",
      deps: ["angular"]
    },
    'ngMaterial': {
      exports: "ngMaterial",
      deps: ["angular"]
    },
    'ngRoute': {
      exports: "ngRoute",
      deps: ["angular"]
    },

  },

  // kick start application
  deps: ['angular', 'ngMaterial', "ngAnimate", "ngAria", 'js/bootstrap']
})