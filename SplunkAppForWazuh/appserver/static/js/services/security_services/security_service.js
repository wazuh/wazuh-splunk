define(
  ['../module'],
  function (app) {
    'use strict'

    class RBAC {

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

      _generateRequirementsObject(enumAction) {
        return this.$requirementService
          .generateRequirementFactory(enumAction)
          .generateRequirement()
      }

      _validateRequirementsObject(controllerRequirements, userPolicies) {
        return this.$validationService
          .validatePermissions(controllerRequirements, userPolicies)
      }

      /**
       * TODO save on rootScope or similiar
       * @returns user's policies
       */
      async getUserPolicies() {
        try {
          const response = await this.apiReq('/security/users/me/policies')
          return response.data.data
        } catch (err) {
          return Promise.reject(err)
        }
      };

      getRequirementsOfController(controllerName) {
        // buscar en el map los requisitos del controlador
        const actionsRequired = this.ACTIONS_MAP[controllerName] // :list
        var requirementsList = []
        var requirementsObject = null
        var isActionAllowed = false

        this.getUserPolicies()
          .then(userPolicies => {
            actionsRequired.forEach((action) => {
              requirementsObject = this._generateRequirementsObject(action)
              isActionAllowed = this._validateRequirementsObject(requirementsObject, userPolicies)
              requirementsList.push({ action, isActionAllowed })
              
              console.log("User policies")
              console.log(userPolicies)
              console.log(`[RBAC - ${controllerName}]`)
              console.log(requirementsObject)
              console.log(isActionAllowed)
              console.log(requirementsList)
            })

            return requirementsList
          })
          .catch(error => console.error(error))
      }
    }

    // Register current class as a service
    app.service('$security_service', RBAC);
  })