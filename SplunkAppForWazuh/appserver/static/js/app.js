define([
  'angular',
  'ngMaterial',
  'ngRoute',
  './services/index',
  './directives/index',
  './controllers/index',
  './run/index',
  './config/index',
  'mdDataTable'
  
], function (ng) {
  'use strict'
  console.log('loaded app')
  return ng.module('wazuhApp', ['ngMaterial','ui.router','app.services','app.directives','app.controllers','app.run','app.config','md.data.table'])
})