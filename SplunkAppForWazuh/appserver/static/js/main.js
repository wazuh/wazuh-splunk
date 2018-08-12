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
        'toaster': 'https://cdnjs.cloudflare.com/ajax/libs/angularjs-toaster/2.1.0/toaster'
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
        'toaster': {
            exports: "toaster",
            deps: ["angular","ngAnimate"]
        }
        
    },

    // kick start application
    deps: ['angular','ngMaterial',"ngAnimate", "ngAria",'js/bootstrap','toaster']
})