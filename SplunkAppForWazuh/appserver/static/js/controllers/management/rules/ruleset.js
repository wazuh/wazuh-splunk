define(['../../module'], function (controllers) {

  'use strict'

  class Ruleset {
    constructor($scope, $sce, $notificationService, view) {
      this.scope = $scope
      this.view = view
      this.toast = $notificationService.showSimpleToast
      this.sce = $sce
      this.colors = [
        '#004A65', '#00665F', '#BF4B45', '#BF9037', '#1D8C2E', 'BB3ABF',
        '#00B1F1', '#00F2E2', '#7F322E', '#7F6025', '#104C19', '7C267F',
        '#0079A5', '#00A69B', '#FF645C', '#FFC04A', '#2ACC43', 'F94DFF',
        '#0082B2', '#00B3A7', '#401917', '#403012', '#2DD947', '3E1340',
        '#00668B', '#008C83', '#E55A53', '#E5AD43', '#25B23B', 'E045E5'
      ]
      this.scope.appliedFilters = []
      try {
        this.filter = JSON.parse(window.localStorage[`${this.view}`]) || []
      } catch (err) { this.filter = [] }
      this.scope.searchTerm = ''
      this.scope.viewingDetail = false
      this.scope.isArray = angular.isArray
      this.initialize()
    }

    /**
     * On controller load
     */
    initialize() {
      (this.view === 'decoders') ? delete window.localStorage.ruleset : delete window.localStorage.decoders
      this.scope.search = (term) => this.search(term)
      this.scope.includesFilter = (filterName) => this.includesFilter(filterName)
      this.scope.getFilter = (filterName) => this.getFilter(filterName)
      this.scope.removeFilter = (filterName) => this.removeFilter(filterName)
      this.scope.colorRuleArg = (ruleArg) => this.colorRegex(ruleArg)
      this.scope.closeDetailView = (clear) => this.closeDetailView(clear)
      if (this.view === 'ruleset') {
        this.scope.colorRuleArg = (regex) => this.colorRegex(regex)
      } else {
        this.scope.colorRegex = (regex) => this.colorRegex(regex)
      }
      this.scope.colorOrder = (order) => this.colorOrder(order)
    }

    colorRegex(regex) {
      regex = regex.toString()
      let valuesArray = regex.match(/\(((?!<\/span>).)*?\)(?!<\/span>)/gmi)
      let coloredString = regex
      if (valuesArray && valuesArray.length) {
        for (let i = 0, len = valuesArray.length; i < len; i++) {
          coloredString = coloredString.replace(/\(((?!<\/span>).)*?\)(?!<\/span>)/mi, '<span style="color: ' + this.colors[i] + ' ">' + valuesArray[i] + '</span>')
        }
      }
      return this.sce.trustAsHtml(coloredString)
    }

    colorOrder(order) {
      order = order.toString()
      let valuesArray = order.split(',')
      let coloredString = order
      for (let i = 0, len = valuesArray.length; i < len; i++) {
        coloredString = coloredString.replace(valuesArray[i], '<span style="color: ' + this.colors[i] + ' ">' + valuesArray[i] + '</span>')
      }
      return this.sce.trustAsHtml(coloredString)
    }


    /**
    * Closes the detail view
    */
    closeDetailView(clear) {
      if (clear) this.scope.appliedFilters = this.scope.appliedFilters.slice(0, this.scope.appliedFilters.length - 1)
      this.scope.viewingDetail = false
        (this.view === 'ruleset') ? this.scope.currentRule = false : this.scope.currentDecoder = false
      if (!this.scope.$$phase) this.scope.$digest()
    }


    /**
    * Searches a rule
    * @param {String} term 
    */
    search(term) {
      if(!term) term = ''
      if (this.view === 'ruleset' && term && term.startsWith('group:') && term.split('group:')[1].trim()) {
        this.scope.customSearch = ''
        const filter = { name: 'group', value: term.split('group:')[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(item => item.name !== 'group')
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast('wazuhFilter', { filter })
      } else if (this.view === 'ruleset' && term && term.startsWith('level:') && term.split('level:')[1].trim()) {
        this.scope.customSearch = ''
        const filter = { name: 'level', value: term.split('level:')[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(item => item.name !== 'level')
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast('wazuhFilter', { filter })
      } else if (this.view === 'ruleset' && term && term.startsWith('pci:') && term.split('pci:')[1].trim()) {
        this.scope.customSearch = ''
        const filter = { name: 'pci', value: term.split('pci:')[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(item => item.name !== 'pci')
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast('wazuhFilter', { filter })
      } else if (this.view === 'ruleset' && term && term.startsWith('gdpr:') && term.split('gdpr:')[1].trim()) {
        this.scope.customSearch = ''
        const filter = { name: 'gdpr', value: term.split('gdpr:')[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(item => item.name !== 'gdpr')
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('file:') && term.split('file:')[1].trim()) {
        this.scope.customSearch = ''
        const filter = { name: 'file', value: term.split('file:')[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(item => item.name !== 'file')
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast('wazuhFilter', { filter })
      } else if (term && term.startsWith('path:') && term.split('path:')[1].trim()) {
        this.scope.customSearch = ''
        const filter = { name: 'path', value: term.split('path:')[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(item => item.name !== 'path')
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast('wazuhFilter', { filter })
      } else {
        this.scope.$broadcast('wazuhSearch', { term, removeFilters: false })
      }
      return
    }

    /**
    * Gets a filter by name
    * @param {String} filterName 
    * @returns {String}
    */
    getFilter(filterName) {
      const filtered = this.scope.appliedFilters.filter(item => item.name === filterName)
      return filtered.length ? filtered[0].value : ''
    }

    /**
    * Removes a filter by name
    * @param {String} filterName 
    */
    removeFilter(filterName) {
      try {
        this.filter = this.scope.appliedFilters.filter(item => item.name !== filterName)
        this.scope.appliedFilters = this.scope.appliedFilters.filter(item => item.name !== filterName)
        if (window.localStorage[`${this.view}`] && JSON.parse(window.localStorage[`${this.view}`])) {
          JSON.parse(window.localStorage[`${this.view}`]).map((item, index) => {
            if (item.name === filterName) {
              const tempFilter = JSON.parse(window.localStorage[`${this.view}`])
              tempFilter.splice(index, 1)
              window.localStorage[`${this.view}`] = JSON.stringify(tempFilter)
            }
          })
        }
        return this.scope.$broadcast('wazuhRemoveFilter', { filterName })
      } catch (err) {
        this.toast('Error removing the filter')
      }
    }

    /**
    * Checks if a filter contains the passed string
    * @param {String} filterName 
    * @returns {Boolean}
    */
    includesFilter(filterName) {
      return this.scope.appliedFilters.map(item => item.name).includes(filterName)
    }
  }
  controllers.controller('managerRulesetCtrl', Ruleset)
  return Ruleset
})
