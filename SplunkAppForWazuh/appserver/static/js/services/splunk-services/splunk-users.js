define(
  ['../module'],
  function (app) {
    'use strict'

    /**
     * 
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
       * 
       * @returns 
       */
      async getCurrentUser() {
        try {
          const { data } = await this.httpReq(
            `GET`,
            `/users/get_current_user`
          )
          return data
        } catch (err) {
          return Promise.reject(err)
        }
      };

      /**
       * 
       * @returns 
       */
      async getInternalUsers() {
        try {
          const { data } = await this.httpReq(
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