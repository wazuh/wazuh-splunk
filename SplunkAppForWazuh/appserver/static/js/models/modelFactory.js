define(['./module'], function (app) {
  app.factory('$modelFactory', function () {
    // TODO: analize code coverage of setters.

    /**
     * Success model class.
     *
     * Intended for being used when the Wazuh API replies with status codes:
     *   - 200 OK
     *
     * NOTE: this is the base model, so the fields and methods of this class
     * are inherited on the rest of the models.
     */
    class SuccessResponseModel {
      #data
      #message
      #error

      /**
       *
       * @param {Object} api_response response.data
       */
      constructor(api_response = {}) {
        this.#data = api_response?.data ?? {}
        this.#message = api_response?.message ?? ''
        this.#error = api_response?.error ?? 0
      }

      getError() {
        return this.#error
      }

      hasError() {
        return this.#error > 0
      }

      getMessage() {
        return this.#message
      }

      getData() {
        return this.#data
      }

      getAffectedItems() {
        return this.getData()?.affected_items ?? []
      }

      setError(error_code = 1) {
        this.#error = error_code
      }

      setMessage(msg) {
        this.#message = msg
      }

      setData(data) {
        this.#data = data
      }
    }

    /**
     * Generic model class.
     *
     * Intended for being usec for any unexpected reply, as a server side error
     * or similar. Otherwise, use the concrete classes for Wazuh API responses.
     */
    class GenericResponseModel extends SuccessResponseModel {
      constructor(api_response = {}) {
        super(api_response)
      }
    }

    /**
     * Simple error model.
     *
     * Intended for use when the Wazuh API replies with status codes:
     *   - 400 Bad Request
     *   - 401 Unauthorized
     *   - 405 Method Not Allowed
     */
    class ErrorResponseModel extends GenericResponseModel {
      #title
      #detail

      constructor(api_response = {}) {
        super(api_response)
        this.#title = api_response?.title ?? ''
        this.#detail = api_response?.detail ?? ''
        this.setMessage(`${this.getTitle()}: ${this.getDetail()}`)
      }

      /**
       * @override
       */
      hasError() {
        return true
      }

      getTitle() {
        return this.#title
      }

      getDetail() {
        return this.#detail
      }

      setTitle(t) {
        this.#title = t
      }

      setDetail(d) {
        this.#detail = d
      }
    }

    /**
     * Extended error model.
     *
     * Intended for use when the Wazuh API replies with status codes:
     *   - 403 Forbidden
     *   - 429 Too Many Requests
     */
    class ExtendedErrorResponseModel extends ErrorResponseModel {
      #remediation
      #dapi_errors

      constructor(api_response = {}) {
        super(api_response)
        this.#remediation = api_response?.remediation ?? ''
        this.#dapi_errors = api_response?.dapi_errors ?? ''
        this.setError(api_response?.error ?? api_response?.code ?? 1)
      }

      getRemediation() {
        return this.#remediation
      }

      getDapiErrors() {
        return this.#dapi_errors
      }

      setRemediation(remediation) {
        this.#remediation = remediation
      }

      setDapiErrors(errors) {
        this.#dapi_errors = errors
      }
    }

    return {
      /**
       * Factory method.
       * @param {Object} opt response.data
       */
      getResponse(opt = {}) {
        // Only responses with status_code 200 have the 'data' property
        if ('data' in opt) {
          return new SuccessResponseModel(opt)
        }
        // Only responses with status_code 403, 429 have the 'remediation' property
        if ('remediation' in opt) {
          return new ExtendedErrorResponseModel(opt)
        }
        // If the response does not have the 'remediation' property but has
        // the 'title' property, then its status_code must be 400, 401 or 405.
        if ('title' in opt) {
          return new ErrorResponseModel(opt)
        }
        // Any other case (timeouts, server side error, unreachable API...)
        else {
          return new GenericResponseModel(opt)
        }
      },
    }
  })
})
