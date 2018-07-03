define([
  'angular',
  'ngMaterial',
  'ngRoute',
  './controllers/index',
  
], function (ng,ngMaterial,ngRoute) {
  'use strict';
  console.log('loaded app')
  return ng.module('wazuhApp', ['ngMaterial','ngRoute','app.controllers']);
});