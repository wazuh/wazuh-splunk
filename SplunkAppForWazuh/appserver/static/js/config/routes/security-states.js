define(['../module'], function (module) {
  'use strict'

  module.config([
    '$stateProvider',
    'BASE_URL',
    function ($stateProvider, BASE_URL) {
      $stateProvider
        .state('security', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/security/main/security.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('security.users')
          },
          controller: 'securityCtrl',
        })
        .state('security.users', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/security/users/users.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('security.users')
          },
          controller: 'usersCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            roleData: [
              '$userService',
              async ($userService) => {
                try {
                  return await $userService.getRoles()
                } catch (error) {
                  return false
                }
              },
            ],
          },
        })
        .state('security.roles', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/security/roles/roles.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('security.roles')
          },
          controller: 'rolesCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            roleData: [
              '$roleService',
              async ($roleService) => {
                try {
                  return await $roleService.getRoleData()
                } catch (error) {
                  return false
                }
              },
            ],
            policyData: [
              '$policyService',
              async ($policyService) => {
                try {
                  return await $policyService.getPolicyData()
                } catch (error) {
                  return false
                }
              },
            ],
          },
        })
        .state('security.policies', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/security/policies/policies.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('security.policies')
          },
          controller: 'policiesCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            resourceData: [
              '$policyService',
              async ($policyService) => {
                try {
                  return await $policyService.getResourceData()
                } catch (error) {
                  return false
                }
              },
            ],
            policyData: [
              '$policyService',
              async ($policyService) => {
                try {
                  return await $policyService.getPolicyData()
                } catch (error) {
                  return false
                }
              },
            ],
            actionData: [
              '$policyService',
              async ($policyService) => {
                try {
                  return await $policyService.getActionData()
                } catch (error) {
                  return false
                }
              },
            ],
          },
        })
        .state('security.roles-mapping', {
          templateUrl:
            BASE_URL +
            '/static/app/SplunkAppForWazuh/js/controllers/security/roles-mapping/rolesMapping.html',
          onEnter: ($navigationService) => {
            $navigationService.storeRoute('security.roles-mapping')
          },
          controller: 'rolesMappingCtrl',
          resolve: {
            updateUserPermissions: [
              '$security_service',
              async ($security_service) => {
                return await $security_service.updateUserPermissions()
              },
            ],
            roles: [
              '$roleService',
              async ($roleService) => {
                try {
                  return await $roleService.getRoleData()
                } catch (error) {
                  return false
                }
              },
            ],
            splunkUsers: [
              '$splunkUsers',
              async ($splunkUsers) => {
                try {
                  return await $splunkUsers.getInternalUsers()
                } catch (err) {
                  return { error: 'Cannot fetch splunk users from API' }
                }
              },
            ],
          },
        })
    },
  ])
})
