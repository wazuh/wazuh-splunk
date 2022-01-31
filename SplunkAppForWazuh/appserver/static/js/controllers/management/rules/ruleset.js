define(["../../module", "FileSaver"], function (app) {
  "use strict"

  class Ruleset {
    /**
     * Class Ruleset
     * @param {*} $scope
     * @param {*} $sce
     * @param {*} $notificationService
     * @param {String} view
     * @param {*} $currentDataService
     * @param {*} $tableFilterService
     * @param {*} $csvRequestService
     * @param {*} $restartService
     */
    constructor(
      $scope,
      $sce,
      $notificationService,
      view,
      $currentDataService,
      $tableFilterService,
      $csvRequestService,
      $restartService,
      $fileEditor
    ) {
      this.scope = $scope
      this.view = view
      this.notification = $notificationService
      this.api = $currentDataService.getApi()
      this.wzTableFilter = $tableFilterService
      this.csvReq = $csvRequestService
      this.sce = $sce
      this.restartService = $restartService
      this.colors = [
        "#004A65",
        "#00665F",
        "#BF4B45",
        "#BF9037",
        "#1D8C2E",
        "BB3ABF",
        "#00B1F1",
        "#00F2E2",
        "#7F322E",
        "#7F6025",
        "#104C19",
        "7C267F",
        "#396e3e",
        "#00A69B",
        "#FF645C",
        "#FFC04A",
        "#2ACC43",
        "F94DFF",
        "#0082B2",
        "#00B3A7",
        "#401917",
        "#403012",
        "#2DD947",
        "3E1340",
        "#00668B",
        "#008C83",
        "#E55A53",
        "#E5AD43",
        "#25B23B",
        "E045E5",
      ]
      this.fileEditor = $fileEditor
      this.scope.appliedFilters = []
      try {
        this.filter = JSON.parse(window.localStorage[`${this.view}`]) || []
      } catch (err) {
        this.filter = []
      }
      this.scope.uploadingFiles = false
      this.scope.searchTerm = ""
      this.scope.viewingDetail = false
      this.scope.showLogtest = window.sessionStorage.showLogtest === "true"
      this.scope.fullScreen = false
      this.scope.isArray = angular.isArray // eslint-disable-line
      this.initialize()
    }

    /**
     * On controller load
     */
    initialize() {
      this.scope.rulesetFiles = false
      this.setInitialCustomFilters()
      this.view === "decoders"
        ? delete window.localStorage.ruleset
        : delete window.localStorage.decoders
      this.scope.search = (term) => this.search(term)
      this.scope.includesFilter = (filterName) =>
        this.includesFilter(filterName)
      this.scope.getFilter = (filterName) => this.getFilter(filterName)
      this.scope.switchLogtest = () => this.switchLogtest()
      this.scope.removeFilter = (filterName) => this.removeFilter(filterName)
      this.scope.colorRuleArg = (ruleArg) => this.colorRegex(ruleArg)
      this.scope.closeDetailView = (clear) => this.closeDetailView(clear)
      this.scope.downloadCsv = (path, name) => this.downloadCsv(path, name)
      if (this.view === "ruleset") {
        this.scope.colorRuleArg = (regex) => this.colorRegex(regex)
      } else {
        this.scope.colorRegex = (regex) => this.colorRegex(regex)
      }
      this.scope.colorOrder = (order) => this.colorOrder(order)
      this.scope.restart = () => this.restart()
      this.scope.closeRestartConfirmation = () =>
        this.closeRestartConfirmation()

      this.scope.enableSave = () => this.enableSave()

      this.scope.switchFiles = () => this.switchFiles()
      this.scope.switchUploadFiles = () => this.switchUploadFiles()

      this.scope.closeEditingFile = () => this.closeEditingFile()
      this.scope.xmlIsValid = (valid) => this.xmlIsValid(valid)
      this.scope.saveFile = (file, dir) => this.saveFile(file, dir)

      this.scope.$on("configSavedSuccessfully", (event) => {
        event.stopPropagation()
        this.scope.overwrite = false
      })

      this.scope.$on("RuleIdContentReady", (event, params) => {
        event.preventDefault()
        this.scope.$broadcast("XMLContentReady", {
          data: params.data,
        })
      })
      this.scope.$on("saveComplete", (event) => {
        event.stopPropagation()
        this.scope.saveIncomplete = false
      })
      this.scope.$on("fileAlreadyExists", (event) => {
        event.stopPropagation()
        this.scope.saveIncomplete = false
        this.scope.overwrite = true
        this.scope.$applyAsync()
      })

      this.scope.$on("editFile", (ev, params) => {
        ev.stopPropagation()
        this.editFile(params.file, params.path, params.readOnly)
      })

      this.scope.$on("performRestart", (event) => {
        event.stopPropagation()
        this.restart()
      })

      this.scope.$on("loadingContent", (event, data) => {
        this.scope.loadingContent = data.status
        event.preventDefault()
      })
      this.scope.$on("applyFilter", (event, parameters) => {
        this.scope.search(parameters.filter)
      })
    }

    /**
     * Switch between rules or files table
     */
    switchFiles() {
      this.scope.rulesetFiles = !this.scope.rulesetFiles
      this.removeAllFilters()
    }

    /**
     * Open or closes the upload files view
     */
    switchUploadFiles() {
      this.scope.uploadingFiles = !this.scope.uploadingFiles
      setTimeout(() => {
        this.scope.$applyAsync()
      }, 1)
    }

    /**
     * Exports the table in CSV format
     */
    async downloadCsv(path, name) {
      try {
        this.notification.showSimpleToast(
          "Your download should begin automatically..."
        )
        const currentApi = this.api["_key"]
        const output = await this.csvReq.fetch(
          path,
          currentApi,
          this.wzTableFilter.get()
        )
        const blob = new Blob([output], { type: "text/csv" }) // eslint-disable-line
        saveAs(blob, name) // eslint-disable-line
        return
      } catch (error) {
        this.notification.showErrorToast("Error downloading CSV")
      }
      return
    }

    /**
     * Returns the color
     * @param {*} regex
     */
    colorRegex(regex) {
      if (regex) {
        regex = regex.toString()
        let valuesArray = regex.match(/\(((?!<\/span>).)*?\)(?!<\/span>)/gim)
        let coloredString = regex
        if (valuesArray && valuesArray.length) {
          for (let i = 0, len = valuesArray.length; i < len; i++) {
            coloredString = coloredString.replace(
              /\(((?!<\/span>).)*?\)(?!<\/span>)/im,
              '<span style="color: ' +
                this.colors[i] +
                ' ">' +
                valuesArray[i] +
                "</span>"
            )
          }
        }
        return this.sce.trustAsHtml(coloredString)
      }
      return
    }

    /**
     * Returns the color
     * @param {*} order
     */
    colorOrder(order) {
      order = order.toString()
      let valuesArray = order.split(",")
      let coloredString = order
      for (let i = 0, len = valuesArray.length; i < len; i++) {
        coloredString = coloredString.replace(
          valuesArray[i],
          '<span style="color: ' +
            this.colors[i] +
            ' ">' +
            valuesArray[i] +
            "</span>"
        )
      }
      return this.sce.trustAsHtml(coloredString)
    }

    /**
     * Closes the detail view
     */
    closeDetailView(clear) {
      if (clear)
        this.scope.appliedFilters = this.scope.appliedFilters.slice(
          0,
          this.scope.appliedFilters.length - 1
        )
      this.scope.viewingDetail = false(this.view === "ruleset")
        ? (this.scope.currentRule = false)
        : (this.scope.currentDecoder = false)
      this.scope.$applyAsync()
    }

    /**
     * Searches a rule
     * @param {String} term
     */
    search(term) {
      let clearInput = true
      if (!term) term = ""
      if (
        this.view === "ruleset" &&
        term &&
        term.startsWith("group:") &&
        term.split("group:")[1].trim()
      ) {
        this.scope.customSearch = ""
        const filter = { name: "group", value: term.split("group:")[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(
          (item) => item.name !== "group"
        )
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast("wazuhFilter", { filter })
      } else if (
        this.view === "ruleset" &&
        term &&
        term.startsWith("level:") &&
        term.split("level:")[1].trim()
      ) {
        this.scope.customSearch = ""
        const filter = { name: "level", value: term.split("level:")[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(
          (item) => item.name !== "level"
        )
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast("wazuhFilter", { filter })
      } else if (
        this.view === "ruleset" &&
        term &&
        term.startsWith("pci:") &&
        term.split("pci:")[1].trim()
      ) {
        this.scope.customSearch = ""
        const filter = { name: "pci", value: term.split("pci:")[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(
          (item) => item.name !== "pci"
        )
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast("wazuhFilter", { filter })
      } else if (
        this.view === "ruleset" &&
        term &&
        term.startsWith("gdpr:") &&
        term.split("gdpr:")[1].trim()
      ) {
        this.scope.customSearch = ""
        const filter = { name: "gdpr", value: term.split("gdpr:")[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(
          (item) => item.name !== "gdpr"
        )
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast("wazuhFilter", { filter })
      } else if (
        term &&
        term.startsWith("file:") &&
        term.split("file:")[1].trim()
      ) {
        this.scope.customSearch = ""
        const filter = { name: "file", value: term.split("file:")[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(
          (item) => item.name !== "file"
        )
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast("wazuhFilter", { filter })
      } else if (
        term &&
        term.startsWith("relative_dirname:") &&
        term.split("relative_dirname:")[1].trim()
      ) {
        this.scope.customSearch = ""
        const filter = {
          name: "relative_dirname",
          value: term.split('"relative_dirname":')[1].trim(),
        }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(
          (item) => item.name !== "relative_dirname"
        )
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast("wazuhFilter", { filter })
      } else if (
        term &&
        term.startsWith("hipaa:") &&
        term.split("hipaa:")[1].trim()
      ) {
        this.scope.custom_search = ""
        const filter = { name: "hipaa", value: term.split("hipaa:")[1].trim() }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(
          (item) => item.name !== "hipaa"
        )
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast("wazuhFilter", { filter })
      } else if (
        term &&
        term.startsWith("nist-800-53:") &&
        term.split("nist-800-53:")[1].trim()
      ) {
        this.scope.custom_search = ""
        const filter = {
          name: "nist-800-53",
          value: term.split("nist-800-53:")[1].trim(),
        }
        this.scope.appliedFilters = this.scope.appliedFilters.filter(
          (item) => item.name !== "nist-800-53"
        )
        this.scope.appliedFilters.push(filter)
        this.scope.$broadcast("wazuhFilter", { filter })
      } else {
        clearInput = false
        this.scope.$broadcast("wazuhSearch", { term, removeFilters: false })
      }
      if (clearInput) {
        const searchBar = $("#search-input-rules")
        searchBar.val("")
      }
      this.scope.$applyAsync()
      this.applyCustomFilters()
      return
    }

    /**
     * Gets a filter by name
     * @param {String} filterName
     * @returns {String}
     */
    getFilter(filterName) {
      const filtered = this.scope.appliedFilters.filter(
        (item) => item.name === filterName
      )
      return filtered.length ? filtered[0].value : ""
    }

    /**
     * Open or closes Logtest
     */
    switchLogtest() {
      this.scope.showLogtest = !this.scope.showLogtest
      window.sessionStorage.showLogtest = this.scope.showLogtest
    }

    /**
     * Removes a filter by name
     * @param {String} filterName
     */
    removeFilter(filterName) {
      try {
        this.filter = this.scope.appliedFilters.filter(
          (item) => item.name !== filterName
        )
        this.scope.appliedFilters = this.scope.appliedFilters.filter(
          (item) => item.name !== filterName
        )
        if (
          window.localStorage[`${this.view}`] &&
          JSON.parse(window.localStorage[`${this.view}`])
        ) {
          JSON.parse(window.localStorage[`${this.view}`]).map((item, index) => {
            if (item.name === filterName) {
              const tempFilter = JSON.parse(window.localStorage[`${this.view}`])
              tempFilter.splice(index, 1)
              window.localStorage[`${this.view}`] = JSON.stringify(tempFilter)
            }
          })
        }
        this.applyCustomFilters()
        return this.scope.$broadcast("wazuhRemoveFilter", { filterName })
      } catch (err) {
        this.notification.showErrorToast("Error removing the filter")
      }
    }

    /**
     * Removes all filters
     *
     */
    removeAllFilters() {
      try {
        window.localStorage.removeItem(`${this.view}`)
        this.applyCustomFilters()
      } catch (err) {
        this.notification.showErrorToast("Error removing the filter")
      }
    }

    /**
     * Gets the path from the state name
     */
    getPathFromState() {
      try {
        const state = window.sessionStorage.getItem("params")
        if (state === "mg-rules") {
          return "etc/rules"
        } else if (state === "mg-decoders") {
          return "etc/decoders"
        }
        return false
      } catch (error) {
        return false
      }
    }

    /**
     * Sets initial filters
     */
    setInitialCustomFilters() {
      try {
        const path = this.getPathFromState()
        if (path) {
          this.scope.appliedCustomFilters = [
            { name: "relative_dirname", value: path },
          ]
        }
      } catch (error) {
        this.notification.showErrorToast("Cannot initialize custom filters.")
      }
    }

    /**
     * Adds or remove filters for the local rules or decoders
     */
    applyCustomFilters() {
      try {
        const path = this.getPathFromState()
        if (path) {
          const filters = [{ name: "relative_dirname", value: path }]
          const restFilters = this.scope.appliedFilters.filter(
            (item) => item.name !== "relative_dirname"
          )
          filters.push(...restFilters)
          this.scope.appliedCustomFilters = filters
        }
      } catch (error) {
        this.notification.showErrorToast(
          "Cannot apply filter for custom rules or decoders files."
        )
      }
    }

    /**
     * Checks if a filter contains the passed string
     * @param {String} filterName
     * @returns {Boolean}
     */
    includesFilter(filterName) {
      return this.scope.appliedFilters
        .map((item) => item.name)
        .includes(filterName)
    }

    /**
     * Restarts the manager or cluster
     */
    async restart() {
      try {
        const result = await this.restartService.restart()
        this.notification.showSimpleToast(result)
      } catch (error) {
        this.notification.showErrorToast(error)
      }
    }

    /**
     * Enables save button
     */
    enableSave() {
      this.scope.overwrite = false
    }

    /**
     * Close editor
     */
    closeEditingFile() {
      this.scope.editingRulesetFile = false
      this.scope.editingFile = false
      this.scope.addingNewFile = false
      this.scope.overwrite = false
      this.scope.fetchedXML = ""
      this.scope.XMLContent = false
    }

    /**
     * Check if XML is valid
     * @param {Boolean} valid
     */
    xmlIsValid(valid) {
      this.scope.xmlHasErrors = valid
      this.scope.$applyAsync()
    }

    /**
     * Open xml editior box
     * @param {String} file
     */
    async editFile(file, path, readOnly = false) {
      try {
        if (readOnly) {
          this.scope.XMLContent = await this.fileEditor.getConfiguration(
            file,
            path,
            null,
            readOnly
          )
          this.scope.$broadcast("XMLContentReady", {
            data: this.scope.XMLContent,
          })
          this.scope.fileName = file
        } else {
          this.scope.editingRulesetFile = {
            file,
            dir: path,
            path: `${path}/${file}`,
          }
          this.scope.fetchedXML = await this.fileEditor.getConfiguration(
            file,
            path,
            null,
            readOnly
          )
          this.scope.$broadcast("fetchedFile", { data: this.scope.fetchedXML })
        }
      } catch (error) {
        this.scope.fetchedXML = null
        this.notification.showErrorToast(error.message || error)
      }
      this.scope.$applyAsync()
      return
    }

    /**
     * Saves the file content
     * @param {String} file
     */
    saveFile(file, dir) {
      this.scope.saveIncomplete = true
      this.scope.$broadcast("saveXmlFile", {
        file,
        dir,
        overwrite: true,
      })
    }

    /**
     * Fetchs readable file content
     * @param {String} file
     */
    async fetchReadableFileContent(file) {
      try {
        const result = await this.fileEditor.getConfiguration(file)
        return result
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
  app.controller("managerRulesetCtrl", Ruleset)
  return Ruleset
})
