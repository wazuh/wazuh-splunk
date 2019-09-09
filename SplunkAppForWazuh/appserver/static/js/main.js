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
    
    text: 'js/libs/text',
    
    jsx: 'js/libs/jsx',
    JSXTransformer: 'js/libs/JSXTransformer',

    'react': 'js/libs/react',
    'react-dom': 'js/libs/react-dom',

    // Angular Chart
    moment: 'js/libs/moment',
    chart: 'js/libs/chart',
    angularChart: 'js/libs/angular-chart',

    // JSON2XML
    js2xmlparser: 'js/libs/json2xml/jsontoxml',

    // File saver
    FileSaver: 'js/libs/file-saver/file-saver',

    // dom-to-image
    domToImg: 'js/libs/required-dom-to-image/src/dom-to-image',

    // JqueryUI
    JqueryUI: 'js/libs/jquery-ui'
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
    },
    chart: {
      exports: 'chart',
      deps: ['angular']
    },
    angularChart: {
      exports: 'angularChart',
      deps: ['angular', 'chart']
    }
  },

  // kick start application
  deps: ['angular', 'ngMaterial', 'ngAnimate', 'ngAria', 'js/bootstrap']
})
