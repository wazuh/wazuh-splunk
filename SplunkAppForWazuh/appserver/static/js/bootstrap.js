/**
 * bootstraps angular onto the window.document node
 */
define(['angular', 'js/app'], function (ng) {
  'use strict'
  ng.bootstrap(document, ['wazuhApp'])
})
