define([
  'angular',
  'ngAnimate',
  'ngMaterial',
  'ngRoute',
  './services/index',
  './directives/index',
  './controllers/index',
  './run/index',
  './config/index'
], function (ng) {
  'use strict'
  return ng.module('wazuhApp', ['ngMaterial','ngAnimate','ui.router','app.services','app.directives','app.controllers','app.run','app.config'])
})