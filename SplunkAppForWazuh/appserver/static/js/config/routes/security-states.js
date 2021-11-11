define(['../module'], function(module) {
  'use strict'

  module.config([
    '$stateProvider',
    'BASE_URL',
    function($stateProvider, BASE_URL) {
      $stateProvider
      .state('security', {
        templateUrl:
          BASE_URL +
          '/static/app/SplunkAppForWazuh/js/controllers/security/main/security.html',
        onEnter: $navigationService => {
          $navigationService.storeRoute('security.users')
        },
        controller: 'securityCtrl',
        resolve: {
          isAdmin: [
            '$currentDataService',
            async $currentDataService => {
              try {
                return await $currentDataService.isAdmin()
              } catch (error) {
                return false
              }
            }
          ]
        }
      })
      .state('security.users', {
        templateUrl:
          BASE_URL +
          '/static/app/SplunkAppForWazuh/js/controllers/security/users/users.html',
        onEnter: $navigationService => {
          $navigationService.storeRoute('security.users')
        },
        controller: 'usersCtrl',
        resolve: {
          isAdmin: [
            '$currentDataService',
            async $currentDataService => {
              try {
                return await $currentDataService.isAdmin()
              } catch (error) {
                return false
              }
            }
          ],
        }
      })
      .state('security.roles', {
        templateUrl:
          BASE_URL +
          '/static/app/SplunkAppForWazuh/js/controllers/security/roles/roles.html',
        onEnter: $navigationService => {
          $navigationService.storeRoute('security.roles')
        },
        controller: 'rolesCtrl',
        resolve: {
          isAdmin: [
            "$currentDataService",
            async $currentDataService => {
              try {
                return await $currentDataService.isAdmin();
              } catch (error) {
                return false;
              }
            }
          ],
          roleData: [
            "$securityService",
            async $securityService => {
              try {
                return await $securityService.getRoleData();
              } catch (error) {
                return false;
              }
            }
          ],
          policyData: [
            "$securityService",
            async $securityService => {
              try {
                return await $securityService.getPolicyData();
              } catch (error) {
                return false;
              }
            }
          ]
        }
      })
      .state('security.policies', {
        templateUrl:
          BASE_URL +
          '/static/app/SplunkAppForWazuh/js/controllers/security/policies/policies.html',
        onEnter: $navigationService => {
          $navigationService.storeRoute('security.policies')
        },
        controller: 'policiesCtrl',
        resolve: {
          isAdmin: [
            '$currentDataService',
            async $currentDataService => {
              try {
                return await $currentDataService.isAdmin()
              } catch (error) {
                return false
              }
            }
          ]
        }
      })
      .state('security.roles-mapping', {
        templateUrl:
          BASE_URL +
          '/static/app/SplunkAppForWazuh/js/controllers/security/roles-mapping/rolesMapping.html',
        onEnter: $navigationService => {
          $navigationService.storeRoute('security.roles-mapping')
        },
        controller: 'rolesMappingCtrl',
        resolve: {
          isAdmin: [
            '$currentDataService',
            async $currentDataService => {
              try {
                return await $currentDataService.isAdmin()
              } catch (error) {
                return false
              }
            }
          ]
        }
      })
    }
  ])
})
