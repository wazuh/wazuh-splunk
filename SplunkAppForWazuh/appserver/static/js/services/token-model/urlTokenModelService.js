define([
  '../module',
  'splunkjs/mvc',
  'splunkjs/mvc/simpleform/formutils',
  'splunkjs/mvc/simplexml/urltokenmodel',
], function (module, mvc, FormUtils, UrlTokenModel) {
  'use strict'

  class urlTokenModel {
    /**
     * Encapsulates the Splunk token management
     */
    constructor() {
      this.urlTokenModel = new UrlTokenModel({ id: 'tokenModel' })
      this.defaultTokenModel = mvc.Components.getInstance('default', {
        create: true,
      })
      this.submittedTokenModel = mvc.Components.getInstance('submitted', {
        create: true,
      })
      mvc.Components.registerInstance('url', this.urlTokenModel)
      this.defaultTokenModel.set(this.urlTokenModel.toJSON())

      this.urlTokenModel.on('url:navigate', () => {
        this.defaultTokenModel.set(this.urlTokenModel.toJSON())
        // eslint-disable-next-line no-undef
        if (typeof _.isEmpty !== 'undefined') {
          //eslint-disable-line
          if (
            !_.isEmpty(this.urlTokenModel.toJSON()) && // eslint-disable-line
            !_.all(this.urlTokenModel.toJSON(), _.isUndefined) // eslint-disable-line
          ) {
            this.submitTokens()
          } else {
            this.submittedTokenModel.clear()
          }
        }
      })
    }

    /**
     * Returns if the default token model has a certain token
     * @param {String} token
     */
    has(token) {
      return this.defaultTokenModel.has(token)
    }

    /**
     * Handle value change
     * @param {String} value
     */
    handleValueChange(value) {
      FormUtils.handleValueChange(value)
    }

    /**
     * Set page loading token
     * @param {Boolean} pageLoading
     */
    submitTokens(pageLoading) {
      FormUtils.submitForm({ replaceState: pageLoading })
    }

    /**
     * Returns a submittedTokenModel token
     * @param {String} name
     */
    get(name) {
      return this.submittedTokenModel.get(name)
    }

    /**
     * Sets a defaultTokenModel token
     * @param {String} token
     */
    set(token) {
      this.defaultTokenModel.set(token)
    }

    /**
     * Returns the submittedTokenModel of the app
     */
    getSubmittedTokenModel() {
      return this.submittedTokenModel
    }

    /**
     * Returns if the defaultTokenModel has a certain token
     * @param {String} token
     */
    defaultTokenModelHas(token) {
      return this.defaultTokenModel.has(token)
    }

    /**
     * Handles the onChange event
     * @param {Event} event
     * @param {Function} cb
     */
    onChange(event, cb) {
      this.submittedTokenModel.on(
        'change:' + event,
        (model, authSuccessToken, opts) => {
          return cb(
            model,
            authSuccessToken,
            opts,
            this.submittedTokenModel.get(event)
          )
        }
      )
    }
  }

  module.service('$urlTokenModel', urlTokenModel)
})
