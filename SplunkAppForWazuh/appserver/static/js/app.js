define([
  'angular',
  'ngAnimate',
  'ngMaterial',
  'ngRoute',
  './services/index',
  './directives/index',
  './controllers/index',
  './filters/index',
  './factories/index',
  './run/index',
  './config/index',
  './models/index',
  'chart',
  'angularChart',
], function (ng) {
  'use strict'
  return ng.module('wazuhApp', [
    'ngMaterial',
    'ngAnimate',
    'ui.router',
    'app.services',
    'app.directives',
    'app.controllers',
    'app.filter',
    'app.factories',
    'app.run',
    'app.config',
    'app.models'
  ])
})
