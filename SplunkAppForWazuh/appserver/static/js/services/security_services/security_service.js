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
      }

      /**
       * Wrapper method for the requirementsService.
       * @param {enumActions} enumAction action to generate the
       * requirement object for.
       * @returns a requirement object for the action, to match the
       * corresponding user policy.
       */
      // DEPRECATED
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
      // DEPRECATED
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
       * @returns {{[key: string]: boolean}} object with each action required 
       * by the controller and if the user can perform it or not.
       */
      // DEPRECATED
      async getRequirementsOfController(controllerName) {

        try {
          // Search the controller's requirements on the map.
          const actionsRequired = this.ACTIONS_MAP[controllerName] // :list
          const userPolicies = await this.getUserPolicies()

          return actionsRequired.reduce((accum, action) => {
            const requirementsObject = this._generateRequirementsObject(action)
            const isActionAllowed = this._validateRequirementsObject(requirementsObject, userPolicies)
            accum[action] = isActionAllowed
            return accum
          }, {})
        }
        catch (err) {
          // TODO improve error handling.
          console.error(`Missing controller '${controllerName}' in mapActions`, err)
        }
      }

      /**
       * Given the RBAC permission requirements, returns if the user
       * has permissions to perform the action required.
       * @param {Object} requirements name of the controller.
       * @returns {Boolean} the user can/can't perform the action.
       */
      userHasPermissions(requirements) {
        // return this.$validationService.validatePermissions(requirements, this.userPermissions.get())
        const requirement_name = Object.keys(requirements)[0]
        return this.matchActionsInPolicies(requirements)
          .filter(item => {
            if (item.action === requirement_name)
              return item.isAllowed
            else
              return false
          }).length > 0
      }

      /**
       * Given the RBAC action and the agent data ({id, group}), returns
       * if the user has permissions to perform the action required.
       * @param {Object} requirements name of the controller.
       * @returns {Boolean} the user can/can't perform the action.
       */
      userHasPermissionsSecurityActionWithAgent(action, agentData) {
        console.log('action', action, agentData)
        return (
          agentData &&
          this.userHasPermissions(
            {
              [action]: [
                `agent:id:${agentData.id}`,
                ...agentData.group.map(group => `agent:group:${group}`)
              ]
            }
          )
        )
      }

      // Step 1: matching by actions
      matchActionsInPolicies(actions/*, policies = this.getUserPolicies()*/) {
        const policies = this.userPermissions.get()
        const rbac_mode_allows = policies['rbac_mode'] === 'black'
        const required_actions = Object.keys(actions)
        const policies_actions = Object.keys(policies)

        var actions_permissions = new Array()

        required_actions.forEach(action => {
          actions_permissions.push(
            {
              'action': action,
              'isAllowed': policies_actions.includes(action) || rbac_mode_allows
            }
          )
        })

        return actions_permissions
      }
      /*
      
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

    }

    // Register current class as a service
    app.service('$security_service', RBAC);
  })