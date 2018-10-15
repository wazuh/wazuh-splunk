define([
  '../module',
  "splunkjs/mvc",
  "splunkjs/mvc/utils",
  "splunkjs/mvc/tokenutils",
  "underscore",
  "jquery",
  "splunkjs/mvc/simplexml",
  "splunkjs/mvc/simplexml/dashboardview",
  "splunkjs/mvc/simpleform/formutils",
  "splunkjs/mvc/simplexml/urltokenmodel"
], function (
  module,
  mvc,
  utils,
  TokenUtils,
  _,
  $,
  DashboardController,
  Dashboard,
  FormUtils,
  UrlTokenModel
) {
    'use strict'


    class urlTokenModel {

      constructor() {
        console.log('creating urltokenmodel service')
        this.urlTokenModel = new UrlTokenModel({ id: 'tokenModel' })
        this.defaultTokenModel = mvc.Components.getInstance('default', { create: true })
        this.submittedTokenModel = mvc.Components.getInstance('submitted', { create: true })
        mvc.Components.registerInstance('url', this.urlTokenModel)
        this.defaultTokenModel.set(this.urlTokenModel.toJSON())

        this.urlTokenModel.on('url:navigate', () => {
          this.defaultTokenModel.set(this.urlTokenModel.toJSON())
          if (!_.isEmpty(this.urlTokenModel.toJSON()) && !_.all(this.urlTokenModel.toJSON(), _.isUndefined)) {
            this.submitTokens()
          } else {
            this.submittedTokenModel.clear()
          }
        })
      }

      has(token){
        return this.defaultTokenModel.has(token)
      }

      handleValueChange(value) {
        FormUtils.handleValueChange(value)
      }
      
      submitTokens(pageLoading) {
        FormUtils.submitForm({ replaceState: pageLoading })
      }

      get(name) {
        return this.submittedTokenModel.get(name)
      }

      set(token) {
        this.defaultTokenModel.set(token)
      }

      defaultTokenModelHas(token) {
        return this.defaultTokenModel.has(token)
      }

      onChange(event, cb) {
        this.submittedTokenModel.on('change:' + event, (model, authSuccessToken, opts) => {
          console.log('changed in class')
          return cb(model, authSuccessToken, opts, this.submittedTokenModel.get(event))
        })
      }


    }

    module.service('$urlTokenModel', urlTokenModel)
  })
