define(
  ['../module'],
  function (app) {
    'use strict'

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
       */
      constructor(
        $requestService,
        ACTIONS,
        $requirementService,
        $validationService
      ) {
        this.apiReq = $requestService.apiReq
        this.ACTIONS_ENUM = ACTIONS.ACTIONS_ENUM
        this.ACTIONS_MAP = ACTIONS.ACTIONS_MAP
        this.$requirementService = $requirementService
        this.$validationService = $validationService
      };

      /**
       * Wrapper method for the requirementsService.
       * @param {enumActions} enumAction action to generate the 
       * requirement object for.
       * @returns a requirement object for the action, to match the 
       * corresponding user policy.
       */
      _generateRequirementsObject(enumAction) {
        return this.$requirementService
          .generateRequirementFactory(enumAction)
          .generateRequirement()
      }

      /**
       * Wrapper method for the validationService.
       * @param {Object} controllerRequirements requirement object of the view.
       * @param {Object} userPolicies user's policies (permissions).
       * @returns {Boolean} true if the user has a policy that allows the view's
       * requirement.
       */
      _validateRequirementsObject(controllerRequirements, userPolicies) {
        return this.$validationService
          .validatePermissions(controllerRequirements, userPolicies)
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
       * Given the controller name this method uses the requirementService
       * and the validationService to determine if the user has permisions
       * to perform the actions required by the controller.
       * @param {String} controllerName name of the controller.
       * @returns {Array} array with each action required by the controller and
       * if the user can perform it or not.
       */
      async getRequirementsOfController(controllerName) {
        // Search the controller's requirements on the map.
        const actionsRequired = this.ACTIONS_MAP[controllerName] // :list
        var requirementsList = []
        var requirementsObject = null
        var isActionAllowed = false

        try {
          const userPolicies = await this.getUserPolicies()

          actionsRequired.forEach((action) => {
            requirementsObject = this._generateRequirementsObject(action)
            isActionAllowed = this._validateRequirementsObject(requirementsObject, userPolicies)
            requirementsList.push({ action, isActionAllowed })
          })
        }
        catch (err) {
          // TODO improve error handling.
          console.error(`Missing controller '${controllerName}' in mapActions`, err)
        }
        return requirementsList
      }
    }

    // Register current class as a service
    app.service('$security_service', RBAC);
  })