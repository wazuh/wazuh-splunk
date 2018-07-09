'use strict';

/**
 * bootstraps angular onto the window.document node
 */
define(['angular', 'js/app'], function (ng) {
  'use strict';

  console.log('loaded bootstrap');
  ng.bootstrap(document, ['wazuhApp']);
});