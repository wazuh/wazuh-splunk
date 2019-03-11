/*
 * Wazuh app - Fetch png from visualization div
 * Copyright (C) 2015-2019 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

define(['../module', 'domToImg'], function(app, domToImg) {
  'use strict'
  class Vis2PNG {
    constructor($rootScope, $currentDataService) {
      this.$rootScope = $rootScope
      this.rawArray = []
      this.htmlObject = {}
      this.working = false
      this.currentDataService = $currentDataService
    }

    async checkArray(visArray) {
      //sectionTitle, filters, metrics
      try {
        this.working = true
        const len = visArray.length
        let currentCompleted = 0
        await Promise.all(
          visArray.map(async currentValue => {
            const tmpNode = $("#"+currentValue + " .panel-body")
            let title = document
              .getElementById(currentValue)
              .parentElement.getElementsByTagName('span')[0].innerHTML
              
            if (title.search('<span')) title = title.substring(0, title.search('<span')) {
              const classes = document
                .getElementById(currentValue)
                .className.split(' ')
            }
            try {
              if (!classes.includes('table')) {
                const tmpResult = await domToImg.toPng(tmpNode[0],{'width':tmpNode.width(),'height':tmpNode.height()})
                if (tmpResult === 'data:,') {
                  return Promise.reject('Impossible fetch visualizations')
                }
                this.rawArray.push({
                  element: tmpResult,
                  width: tmpNode.width(),
                  height: tmpNode.height(),
                  id: currentValue,
                  title: title
                })
              }
            } catch (error) {
              console.error('Error', error.message || error)
            } // eslint-disable-line
            
            currentCompleted++
            this.$rootScope.reportStatus = `Generating report...${Math.round(
              (currentCompleted / len) * 100
            )}%`
            if (!this.$rootScope.$$phase) this.$rootScope.$digest()
          })
        )
        this.working = false
        this.$rootScope.reportStatus = `Generating PDF document...`
        return this.rawArray
      } catch (error) {
        this.working = false
        return Promise.reject(error)
      }
    }

    isWorking() {
      return this.working
    }

    clear() {
      this.rawArray = []
      this.htmlObject = {}
    }

    assignHTMLItem(id, content) {
      this.htmlObject[id] = content
    }
  }
  app.service('vis2png', Vis2PNG)
})
