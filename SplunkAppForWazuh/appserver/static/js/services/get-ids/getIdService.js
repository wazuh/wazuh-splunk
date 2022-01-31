define(["../module"], function (module) {
  "use strict"

  class GetIdService {
    constructor($requestService) {
      this.req = $requestService.apiReq
    }

    /**
     * Returns the id of an agent
     * @param {String} : the agent name
     * @returns {Number} : the id of the agent
     */
    async agent(agent) {
      try {
        if (agent && typeof agent === "string") {
          const data = await this.req(`/agents?name=${agent}`)
          return data.data.data.items[0].id
        } else {
          throw Error("Invalid agent format")
        }
      } catch (err) {
        return Promise.reject(err.message || err)
      }
    }
  }

  module.service("$getIdService", GetIdService)
})
