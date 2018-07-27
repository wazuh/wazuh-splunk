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
        'mdDataTable': 'https://cdnjs.cloudflare.com/ajax/libs/angular-material-data-table/0.10.10/md-data-table',
        'Toast': 'https://unpkg.com/angular-toastr/dist/angular-toastr.tpls'
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
        'mdDataTable': {
            exports: "mdDataTable",
            deps: ["angular"]
        },
        'Toast': {
            exports: "Toast",
            deps: ["angular","ngAnimate"]
        }
        
    },

    // kick start application
    deps: ['angular','ngMaterial',"ngAnimate", "ngAria",'js/bootstrap','mdDataTable','Toast']
})