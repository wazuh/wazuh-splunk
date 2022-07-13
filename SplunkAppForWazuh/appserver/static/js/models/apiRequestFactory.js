define(['./module'], function (app) {
  app.factory('$apiRequestModelFactory', function ($requestService) {
    /**
     * Generic Http request class.
     *
     * @class
     * @abstract
     */
    class HttpRequest {
      #method
      #path
      #payload
      _payloadToSend
      /**
       * Common content types
       * @readonly
       */
      CONTENT_TYPES = ['none']
      /**
       * @private
       * @member
       */
      #content_type

      /**
       * Class constructor
       *
       * The content type is set to NONE by default.
       *
       * @constructor
       * @param {string} method   one of "GET", "POST", "PUT", "DELETE"
       * @param {string} path     Wazuh API endpoint
       * @param {string} payload  request payload
       */
      constructor(method, path, payload = {}) {
        if (method === undefined || path === undefined) {
          throw new Error(
            'Missing required parameters. A HttpRequest instance must have a ' +
              `valid method and path. Found: method ${method}, path ${path}`
          )
        }

        this.#method = method
        this.#path = path
        this.#payload = payload
        this._payloadToSend = payload
        this.setContentType('none')
        // Enable for debugging
        // console.log(this)
      }

      /* ================= */
      /* Protected methods */
      /* ================= */

      /**
       * Builds the payload depending on the request's class.
       * @protected
       * @abstract
       */
      _preparePayload() {
        throw new Error('This method must be implemented on the subclases')
      }

      /**
       * Extends the default content types array.
       * @protected
       * @param {Array} additionalContentTypes
       */
      _extendAvailableContentTypes(additionalContentTypes) {
        const extendedContentTypes = [
          ...this.getAvailableContentTypes(),
          ...additionalContentTypes,
        ]
        // Update and lock (immutable array object)
        this.CONTENT_TYPES = Object.freeze(extendedContentTypes)
      }

      /**
       * Returns the received payload. This might or not be the actual
       * payload sent to the backend, depending on the request type.
       * @returns the payload received in the constructor
       * @protected
       * @see _payloadToSend
       */
      _getPayload() {
        return this.#payload
      }

      /**
       * @returns the payload to send to the backend, stringified
       * @protected
       */
      _getStringifiedPayload() {
        return JSON.stringify(this._getPayload())
      }

      /* ================ */
      /*  Public methods  */
      /* ================ */

      /**
       * Sends the request to the backend, meant to be re-sent to the Wazuh API
       * @returns {apiResponseModel} API response for the current request, as a
       * model
       * @see requestService::apiReqInModel()
       * @public
       */
      async send() {
        return await $requestService.apiReqInModel(
          this.#path,
          this._payloadToSend,
          this.#method
        )
      }

      /**
       * Sets the content type for the request.
       *
       * This value is sent to the App's backend as 'origin`
       *
       * @public
       * @param {CONTENT_TYPES} contentType
       */
      setContentType(contentType) {
        if (this.getAvailableContentTypes().indexOf(contentType) !== -1) {
          this.#content_type = contentType
        } else {
          throw new TypeError(
            'Invalid content type for this request. Must be one of [' +
              this.getAvailableContentTypes() +
              `], got '${contentType}'`
          )
        }
      }

      /**
       * @public
       * @returns the requests content type
       */
      getContentType() {
        return this.#content_type
      }

      /**
       * @public
       * @returns array with available content types for the class
       * @see CONTENT_TYPES
       */
      getAvailableContentTypes() {
        return this.CONTENT_TYPES
      }
    }

    /**
     * Get request class
     * @class
     */
    class GetRequest extends HttpRequest {
      /**
       * Class constructor
       *
       * @constructor
       * @param {string} method   one of "GET", "POST", "PUT", "DELETE"
       * @param {string} path     Wazuh API endpoint
       * @param {string} payload  request payload
       */
      constructor(method, path, payload = {}) {
        super(method, path, payload)

        if (method != 'GET') {
          throw new Error(+`Invalid method. Found: ${method}, GET expected`)
        }

        // Available content types for this request
        const mContentTypes = ['xmlreader', 'raw']

        // Initialize content type for this request
        this._extendAvailableContentTypes(mContentTypes)
        this._preparePayload()
      }

      /**
       * Builds the _payloadToSend member by inyecting the content type to
       * to be used on the backend's request to the Wazuh API.
       *
       * If content_type != NONE, the request's payload  will look
       * like this:
       *     {
       *        'origin': CONTENT_TYPE
       *     }
       *
       * @protected
       */
      _preparePayload() {
        this._payloadToSend =
          this.getContentType() === 'none'
            ? this._getPayload()
            : { origin: this.getContentType() }
      }
    }

    /**
     * Post request class
     * @class
     */
    class PostRequest extends HttpRequest {
      /**
       * Class constructor
       *
       * @constructor
       * @param {string} method   one of "GET", "POST", "PUT", "DELETE"
       * @param {string} path     Wazuh API endpoint
       * @param {string} payload  request payload
       */
      constructor(method, path, payload = {}) {
        super(method, path, payload)

        if (method != 'POST') {
          throw new Error(+`Invalid method. Found: ${method}, POST expected`)
        }

        const mContentTypes = ['xmlreader', 'json', 'raw']

        // Initialize content type for this request
        this._extendAvailableContentTypes(mContentTypes)
        // Default content type is set to JSON
        this.setContentType('json')
        this._preparePayload()
      }

      /**
       * Builds the _payloadToSend member by inyecting the content type to
       * to be used on the backend's request to the Wazuh API.
       *
       * If content_type != NONE, the request's payload  will look
       * like this:
       *     {
       *        'origin': CONTENT_TYPE
       *        'content': data matching the content type
       *     }
       *
       * @protected
       */
      _preparePayload() {
        this._payloadToSend =
          this.getContentType() === 'none'
            ? this._getPayload()
            : {
                origin: this.getContentType(),
                content: this._getStringifiedPayload(),
              }
      }
    }

    /**
     * Put request class
     * @class
     */
    class PutRequest extends HttpRequest {
      /**
       * Class constructor
       *
       * @constructor
       * @param {string} method   one of "GET", "POST", "PUT", "DELETE"
       * @param {string} path     Wazuh API endpoint
       * @param {string} payload  request payload
       */
      constructor(method, path, payload = {}) {
        super(method, path, payload)

        if (method != 'PUT') {
          throw new Error(+`Invalid method. Found: ${method}, PUT expected`)
        }

        const mContentTypes = ['xmlreader', 'json', 'raw']

        // Initialize content type for this request
        this._extendAvailableContentTypes(mContentTypes)
        // Default content type is set to JSON
        this.setContentType('json')
        this._preparePayload()
      }

      /**
       * Builds the _payloadToSend member by inyecting the content type to
       * to be used on the backend's request to the Wazuh API.
       *
       * If content_type != NONE, the request's payload  will look
       * like this:
       *     {
       *        'origin': CONTENT_TYPE
       *        'content': data matching the content type
       *     }
       *
       * @protected
       */
      _preparePayload() {
        this._payloadToSend =
          this.getContentType() === 'none'
            ? this._getPayload()
            : {
                origin: this.getContentType(),
                content: this._getStringifiedPayload(),
              }
      }
    }

    /**
     * Delete request class
     * @class
     */
    class DeleteRequest extends HttpRequest {
      /**
       * Class constructor
       *
       * @constructor
       * @param {string} method   one of "GET", "POST", "PUT", "DELETE"
       * @param {string} path     Wazuh API endpoint
       * @param {string} payload  request payload
       */
      constructor(method, path, payload = {}) {
        super(method, path, payload)

        if (method != 'DELETE') {
          throw new Error(+`Invalid method. Found: ${method}, DELETE expected`)
        }
      }
    }

    return {
      /**
       * Factory Method pattern.
       * @param {String} method HTTP method. One of GET, POST, PUT, DELETE
       * @param {String} path API endpoint
       * @param {Object} payload dictionary containing the request's body
       * @returns
       */
      getRequest(method, path, payload = {}) {
        switch (method.toUpperCase()) {
          case 'GET':
            return new GetRequest(method, path, payload)
          case 'POST':
            return new PostRequest(method, path, payload)
          case 'PUT':
            return new PutRequest(method, path, payload)
          case 'DELETE':
            return new DeleteRequest(method, path, payload)
          default:
            throw RangeError(
              'Invalid method. Must be one of ["GET", "POST", "PUT", "DELETE"]'
            )
        }
      },
    }
  })
})
