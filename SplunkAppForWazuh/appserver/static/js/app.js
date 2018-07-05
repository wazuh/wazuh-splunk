define([
  'angular',
  'ngMaterial',
  'ngRoute',
  './controllers/index',
  './directives/index',
  
], function (ng) {
  'use strict';
  console.log('loaded app')
  return ng.module('wazuhApp', ['ngMaterial','ui.router','app.controllers','app.directives']);
});