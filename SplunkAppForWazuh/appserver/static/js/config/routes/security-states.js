define(['../module'], function(module) {
  'use strict'

  module.config([
    '$stateProvider',
    'BASE_URL',
    function($stateProvider, BASE_URL) {
      $stateProvider
        // Manager - Monitoring
        .state('sg-users', {
          templateUrl:
            BASE_URL +
            'static/app/SplunkAppForWazuh/js/controllers/security/users/users.html',
          onEnter: $navigationService => {
            $navigationService.storeRoute('sg-users')
          },
          controller: 'usersCtrl',
          // params: { id: null, filters: null },
          resolve: {
            users: [
              '$requestService',
              '$state',
              async ($requestService, $state) => {
                try {
                  const users = await $requestService.apiReq('/security/users?sort=username');
                  console.log("users");
                  console.log(users);

                  // let result = {};
                  //  if(checkCluster['data']['data'].enabled === 'no'){
                  //   result = await Promise.all([
                  //     checkCluster,
                  //     false,
                  //     false,
                  //     $requestService.apiReq('/'),
                  //     $requestService.apiReq('/agents', { limit: 1 }),
                  //     false
                  //   ])
                  //  }
                  //  else
                  //     result = await Promise.all([
                  //      checkCluster,
                  //      $requestService.apiReq('/cluster/nodes'),
                  //      $requestService.apiReq('/cluster/local/config'),
                  //      $requestService.apiReq('/'),
                  //      $requestService.apiReq('/agents', { limit: 1 }),
                  //      $requestService.apiReq('/cluster/healthcheck')
                  //    ])
                  return users
                } catch (err) {
                  $state.go('settings.api')
                }
              }
            ]
          }
        })
    }
  ])
})
