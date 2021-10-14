define(
  ['../module'],
  function (app) {
    'use strict'

    /**
     * Class to handle Splunk's users.
     */
    class SplunkUsers {

      /**
       * Constructor
       * 
       * @param {*} $requestService 
       */
      constructor($requestService) { 
        this.httpReq = $requestService.httpReq
      };

      /**
       * @returns {Object} logged in user.
       */
      async getCurrentUser() {
        try {
          const data = await this.httpReq(
            `GET`,
            `/users/get_current_user`
          )
          return data
        } catch (err) {
          return Promise.reject(err)
        }
      };

      /**
       * @returns {Object} a list with every user registered in Splunk.
       */
      async getInternalUsers() {
        try {
          const data = await this.httpReq(
            `GET`,
            `/users/get_users`
          )
          return data
        } catch (err) {
          return Promise.reject(err)
        }
      };

    }

    // Register current class as a service
    app.service('$splunkUsers', SplunkUsers);
  })