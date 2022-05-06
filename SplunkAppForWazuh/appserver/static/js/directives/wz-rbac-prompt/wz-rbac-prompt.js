define(['../module'], function (directives) {
  directives.directive('wzRbacPrompt', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        permissions: '=',
      },
      template: `
					<wz-forbidden ng-if="!permissions"></wz-forbidden>
					<div ng-transclude ng-if="permissions"></div>
				`,
    }
  })
})
