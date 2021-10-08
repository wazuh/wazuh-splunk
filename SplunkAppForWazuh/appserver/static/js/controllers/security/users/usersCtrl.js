// define(['../../module'], function(controllers) {
//   'use strict'

//   controllers.config([
//     '$stateProvider',
//     'BASE_URL',
//     function($stateProvider) {
//       $stateProvider
//       .state('users', {
//         templateUrl:
//           BASE_URL +
//           '/static/app/SplunkAppForWazuh/js/controllers/security/users/users.html',
//         controller: 'usersCtrl',
//         onEnter: $navigationService => {
//           $navigationService.storeRoute('agents')
//         },
//         resolve: {
//           usersData: [
//             '$requestService',
//             '$state',
//             async ($requestService, $state) => {
//               try {
//                 const userSummary = await $requestService.apiReq(
//                   '/security/users?sort=username'
//                 )
//                 console.log("userSummary");
//                 console.log(userSummary);
//                 return userSummary
//               } catch (err) {
//                 $state.go('settings.api')
//               }
//             }
//           ]
//         }
//       })
//     }
//   ]);
// })




define(['../../module'], function(controllers) {
  'use strict'

  class Users {
    constructor($scope,users) {
      this.scope = $scope
      this.users = users
    }

    $onInit() {
      console.log("users ctrl");
      console.log(users);
    }

  }
  controllers.controller('usersCtrl', Users)
})
