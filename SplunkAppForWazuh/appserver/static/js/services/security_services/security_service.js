define(
  ['../module'],
  function (app) {
    'use strict'

    class Policy {
      constructor(policy, isAllowed) {
        this.policy = policy;
        this.isAllowed = isAllowed;
      }
    }

    /**
     * Security Service. Implements the Role Based Access Control.
     */
    class RBAC {

      /**
       * Constructor.
       * @param {Object} $requestService
       * @param {Object} ACTIONS
       * @param {Object} $requirementService
       * @param {Object} $validationService
       * @param {Object} userPermissions
       */
      constructor(
        $requestService,
        ACTIONS,
        $requirementService,
        $validationService,
        userPermissions
      ) {
        this.apiReq = $requestService.apiReq
        this.ACTIONS_ENUM = ACTIONS.ACTIONS_ENUM
        this.ACTIONS_MAP = ACTIONS.ACTIONS_MAP
        this.$requirementService = $requirementService
        this.$validationService = $validationService
        this.userPermissions = userPermissions
        this.getUserPolicies()
          .then(data => {console.log(data);this.userPolicies = data})
      }

      /**
       * 
       * @param {*} action 
       * @param {*} resources 
       * @param {*} params 
       * @returns 
       */
      getPolicy(action, resources, params = []) {
        const r = this.$requirementService.generateRequirement(
          action,
          resources,
          params
        );
        const v = this.$validationService.validatePermissions(
          r, 
          this.userPermissions.get()
        );
        console.log("getPolicy: " + v)
        return new Policy(r, v)
      }

      /**
       * Queries the user's policies on the Wazuh API.
       *
       * TODO save on rootScope or similiar
       *
       * @returns user's policies.
       */
      async getUserPolicies() {
        try {
          const response = await this.apiReq('/security/users/me/policies')
          return response.data.data
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Obtains user's information.
       * @returns {Object} user's information object. Contains the following
       *                   properties:
       * - id: Integer
       * - allow_run_as: Boolean
       * - roles: Array
       * - username: String
       *
       * @endpoint /security/users/me
       */
      async getUserInfo() {
        try {
          const response = await this.apiReq('/security/users/me')
          return response.data.data.affected_items[0]
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Checks if the user has an administrator role.
       * @returns {Boolean} true is de user hsa the administrator role,
       *                    false otherwise.
       */
      async isWazuhAdmin() {
        const userInfo = await this.getUserInfo()
        return userInfo.roles.some(role => role.name === 'administrator')
      }

      /**
       * Update the user policies in the userPermissions factory.
       */
      async updateUserPermissions() {
        try {
          const userPolicies = await this.getUserPolicies()
          this.userPermissions.set(userPolicies)
        } catch (error) {
          this.userPermissions.set({})
        }
      }

      isAllowed(action, resource, params = "*"){
        return this.getPolicy(action, resource, params).isAllowed
      } 

    }

    // Register current class as a service
    app.service('$security_service', RBAC);
  })