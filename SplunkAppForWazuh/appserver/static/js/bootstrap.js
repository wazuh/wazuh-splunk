/**
 * bootstraps angular onto the window.document node
 */
define([
  'angular',
  'js/app',
  'js/routes'
], function (ng) {
  'use strict';
  console.log('loaded bootstrap')
  ng.bootstrap(document, ['wazuhApp']);
});