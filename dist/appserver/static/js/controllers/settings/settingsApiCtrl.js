'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

define(['../module'], function (controllers) {
  'use strict';

  controllers.controller('settingsApiCtrl', function ($scope, $apiRequest) {
    var _this = this;

    $scope.message = 'API';
    var epoch = new Date().getTime();
    $scope.selected = [];

    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };

    function success(desserts) {
      $scope.desserts = desserts;
    }

    $scope.apis = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $scope.promise = $apiRequest.get($scope.query, success).$promise;

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));
  });
});