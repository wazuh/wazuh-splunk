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

      _validateRequirementsObject(controllerRequirements, userPolicies = this.getUserPolicies()) {
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
          console.log(response.data.data)
          return response.data
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

        actionsRequired.forEach((action) => {
          requirementsObject = this._generateRequirementsObject(action)
          isActionAllowed = this._validateRequirementsObject(requirementsObject)
          requirementsList.push({action, isActionAllowed})

          console.log("HOLA")
          console.log(`[RBAC - ${controllerName}]`)
          console.log(requirementsObject)
          console.log(isActionAllowed)
          console.log(requirementsList)
        })
        
        return requirementsList
      }
    }

    // Register current class as a service
    app.service('$security_service', RBAC);
  })