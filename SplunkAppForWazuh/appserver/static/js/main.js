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

    // Angular Chart
    moment: 'js/libs/moment',
    chart: 'js/libs/chart',
    angularChart: 'js/libs/angular-chart',

    // JSON2XML
    js2xmlparser: 'js/libs/json2xml/jsontoxml',
    
    // Dropzonejs
    Dropzone: 'js/libs/dropzone/dropzone',

    // File saver
    FileSaver: 'js/libs/file-saver/file-saver',

    // dom-to-image
    domToImg: 'js/libs/required-dom-to-image/src/dom-to-image',

    // Local jQuery 3.5.0
    localjQuery: 'js/libs/jquery-3.5.0.min',

    jQuery: 'js/jQuery',

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
    },
    localjQuery: {
      exports: '$'
    }
  },

  // kick start application
  deps: ['angular', 'ngMaterial', 'ngAnimate', 'ngAria', 'js/bootstrap']
})
