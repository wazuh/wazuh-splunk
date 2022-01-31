define(["../module"], function (module) {
  "use strict"

  module.service("$requestService", [
    "$http",
    "$apiIndexStorageService",
    "$q",
    function ($https, $apiIndexStorageService, $q) {
      constructor
      /**
       * Generated and returns the browser base URL + Splunk Port
       */
      const getBaseUrl = () => {
        return `${window.location.href.split(/\/[a-z][a-z]-[A-Z][A-Z]\//)[0]}/`
      }

      /**
       * Generates and returns the browser base URL + Splunk Port
       */
      const getWellFormedUri = (endpoint) => {
        try {
          return `${getBaseUrl()}en-US/custom/SplunkAppForWazuh/${endpoint}`
        } catch (err) {
          return Promise.reject(err)
        }
      }

      /**
       * Performs a HTTP request
       * @param {String} method
       * @param {String} endpoint
       * @param {Boolean} includedApi
       * @param {Object} payload
       */
      const httpReq = async (method, endpoint, payload = {}) => {
        try {
          if (!method || !endpoint) {
            throw new Error("Missing parameters")
          }
          const tmpUrl = getWellFormedUri(endpoint)
          const data = {}

          // Set content type to form urlencoded
          $https.defaults.headers.post["Content-Type"] =
            "application/x-www-form-urlencoded"
          // GET METHOD
          if (method === "GET")
            Object.assign(data, await $https.get(tmpUrl, { params: payload }))
          // PUT METHOD
          else if (method === "PUT")
            Object.assign(data, await $https.post(tmpUrl, $.param(payload)))
          // POST METHOD
          else if (method === "POST")
            Object.assign(data, await $https.post(tmpUrl, $.param(payload)))
          // DELETE METHOD
          else if (method === "DELETE") {
            Object.assign(data, await $https.post(tmpUrl, $.param(payload)))
          }
          if (!data) {
            throw new Error(
              `Error doing a request to ${tmpUrl}, method: ${method}.`
            )
          }
          if (data.error && data.error !== "0") {
            throw new Error("HTTP error from server: ", data.error)
          }
          return $q.resolve(data)
        } catch (error) {
          console.error("error in request ", error)
          return $q.reject(error)
        }
      }

      /**
       * Performs a GET request to Wazuh API
       * @param {String} endpoint
       * @param {Object} opts
       */
      const apiReq = async (endpoint, opts = null, method = "GET") => {
        try {
          $https.defaults.headers.post["Content-Type"] =
            "application/x-www-form-urlencoded"
          const currentApi = $apiIndexStorageService.getApi()
          const apiId =
            currentApi && currentApi["_key"] ? currentApi["_key"] : opts["_key"]
          const payload = { apiId, endpoint, method }
          if (opts && typeof opts === `object`) {
            Object.assign(payload, opts)
          }
          const backPoint = payload.delay ? "/queue/add_job" : "/api/request"
          const result = await httpReq("POST", backPoint, payload)
          if (
            result &&
            result.data &&
            result.data.error &&
            result.data.error === 3099
          ) {
            throw new Error("ERROR3099 - Wazuh not ready yet.")
          }
          return result
        } catch (err) {
          return Promise.reject(
            "Cannot access to selected API, please check your API configuration."
          )
        }
      }

      const wazuhIsReady = async (opts = null) => {
        try {
          $https.defaults.headers.post["Content-Type"] =
            "application/x-www-form-urlencoded"
          const currentApi = $apiIndexStorageService.getApi()
          const apiId =
            currentApi && currentApi["_key"] ? currentApi["_key"] : opts["_key"]
          const endpoint = "/api/wazuh_ready"
          const method = "GET"
          const payload = { apiId, method }
          const result = await httpReq("POST", endpoint, payload)
          return result
        } catch (err) {
          return Promise.reject(err)
        }
      }

      const sendConfiguration = async (url, content) => {
        try {
          const result = await apiReq(
            `${url}`,
            { content, origin: "raw" },
            "PUT"
          )
          if (
            !result ||
            !result.data ||
            !result.data.data ||
            result.data.error !== 0
          ) {
            if (result.data.error === 1905) {
              return result
            } else {
              throw new Error(
                result.data.message || result.data.error || "Cannot send file."
              )
            }
          }
          return result
        } catch (error) {
          return Promise.reject(error)
        }
      }

      const sendGroupConfiguration = async (url, content) => {
        try {
          const result = await apiReq(
            `${url}`,
            { content, origin: "xmleditor" },
            "PUT"
          )

          if (!result || !result.data || result.data.error !== 0) {
            if (result.data.error === 1905) {
              return result
            } else {
              throw new Error(
                result.data.message || result.data.error || "Cannot send file."
              )
            }
          }
          return result
        } catch (error) {
          return Promise.reject(error)
        }
      }

      const getConfiguration = async (url) => {
        try {
          const result = await apiReq(url)
          if (!result || !result.data || result.data.error !== 0) {
            throw new Error("Cannot get file.")
          }
          return result
        } catch (error) {
          return Promise.reject(error)
        }
      }

      const service = {
        getBaseUrl: getBaseUrl,
        getWellFormedUri: getWellFormedUri,
        apiReq: apiReq,
        httpReq: httpReq,
        sendConfiguration: sendConfiguration,
        sendGroupConfiguration: sendGroupConfiguration,
        getConfiguration: getConfiguration,
        wazuhIsReady: wazuhIsReady,
      }
      return service
    },
  ])
})
