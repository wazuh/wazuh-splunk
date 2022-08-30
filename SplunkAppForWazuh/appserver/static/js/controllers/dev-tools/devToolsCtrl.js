/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/*
 * Wazuh App - API console - Dev tools controller
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
define([
  '../module',
  'jQuery',
  '../../libs/codemirror-conv/lib/codemirror',
  '../../libs/codemirror-conv/json-lint',
  '../../libs/codemirror-conv/javascript',
  '../../libs/codemirror-conv/brace-fold',
  '../../libs/codemirror-conv/foldcode',
  '../../libs/codemirror-conv/foldgutter',
  '../../libs/codemirror-conv/search-cursor',
  '../../libs/codemirror-conv/mark-selection',
  '../../libs/codemirror-conv/show-hint',
  '../../libs/codemirror-conv/querystring-browser/bundle',
  '../../utils/excluded-devtools-autocomplete-keys',
  'FileSaver',
], function (
  app,
  $,
  CodeMirror,
  jsonLint,
  _javascript,
  _braceFold,
  _foldcode,
  _foldgutter,
  _searchCursor,
  _markSeletion,
  _showHint,
  _queryString,
  ExcludedIntelliSenseTriggerKeys
) {
  'use strict'
  class DevToolsController {
    /**
     * Constructor
     * @param {*} $scope
     * @param {*} $requestService,
     * @param {*} $window
     * @param {*} appState
     * @param {*} $notificationService
     * @param {*} $document
     */
    constructor(
      $scope,
      $requestService,
      $window,
      $navigationService,
      $notificationService,
      $appVersionService,
      $document,
      $apiRequestModelFactory
    ) {
      this.$scope = $scope
      this.appDocuVersion = $appVersionService.getDocumentationVersion()
      this.request = $requestService
      this.$window = $window
      this.appState = $navigationService
      this.notification = $notificationService
      this.$document = $document
      this.apiRequestFactory = $apiRequestModelFactory
      this.groups = [] // Each request is a group of lines in the editor
      this.selectedGroup = null // Selected request group (focused one)
      this.linesWithClass = []
      this.errorWidgets = []
    }

    /**
     * When controller loads
     */
    $onInit() {
      try {
        this.initKeyListeners()
        this.initWindowsResizeListeners()
        this.initCodeMirror()
        this.restoreStateFromCache()
        // Read the groups of requests
        this.identifyGroups()
        // On init, select and highlight the first request group
        this.selectedGroup = this.groups[0]
        this.highlightSelectedGroup()
        this.initButtons()

        // Refresh the panels when the initialization is complete
        setTimeout((_) => {
          this.apiInputBox.refresh()
          this.apiOutputBox.refresh()
        }, 1)

        /**
         * Scope callbacks
         */
        this.$scope.send = () => this.send()
        this.$scope.help = () => {
          this.$window.open(
            `https://documentation.wazuh.com/${this.appDocuVersion}/user-manual/api/reference.html`
          )
        }
        this.$scope.exportOutput = () => this.exportOutput()
      } catch (error) {
        this.notification.showErrorToast(error)
      }
    }

    /**
     * Keyboard listeners
     */
    initKeyListeners() {
      let multipleKeyPressed = []

      $(this.$document[0]).keydown((e) => {
        // Record keys pressed, saving them in the array.
        if (!multipleKeyPressed.includes(e.which)) {
          multipleKeyPressed.push(e.which)
        }
        // Look for the Shift + Enter keys combination
        if (
          multipleKeyPressed.includes(16) && // Shift key
          multipleKeyPressed.includes(13) && // Enter key
          multipleKeyPressed.length === 2
        ) {
          e.preventDefault()
          this.send()
        }
      })

      // Clear the array
      $(this.$document[0]).keyup((_) => {
        multipleKeyPressed = []
      })
    }

    /**
     * Register event listerner for window resizing and panels width changes.
     */
    initWindowsResizeListeners() {
      // Event: onMouseDown - windows separator
      $('.wz-dev-column-separator').mousedown(function (e) {
        e.preventDefault()
        const leftOrigWidth = $('#wz-dev-left-column').width()
        const rightOrigWidth = $('#wz-dev-right-column').width()

        $(document).mousemove(function (e) {
          const leftWidth = e.pageX - 85 + 14
          let rightWidth = leftOrigWidth - leftWidth
          $('#wz-dev-left-column').css('width', leftWidth)
          $('#wz-dev-right-column').css('width', rightOrigWidth + rightWidth)
        })
      })

      // Event: onMouseUp - windows separator
      $(document).mouseup(function () {
        $(document).unbind('mousemove')
      })

      // Event: onWindowResize
      this.$window.onresize = () => {
        $('#wz-dev-left-column').attr(
          'style',
          'width: calc(30% - 7px); !important'
        )
        $('#wz-dev-right-column').attr(
          'style',
          'width: calc(70% - 7px); !important'
        )
      }
    }

    /**
     * CodeMirror initialization
     */
    async initCodeMirror() {
      // Input panel
      this.apiInputBox = CodeMirror.fromTextArea(
        this.$document[0].getElementById('api_input'),
        {
          lineNumbers: true,
          matchBrackets: true,
          mode: { name: 'javascript', json: true },
          theme: 'ttcn',
          foldGutter: true,
          styleSelectedText: true,
          gutters: ['CodeMirror-foldgutter'],
        }
      )
      this.apiInputBox.setSize('auto', '100%')
      this.apiInputBox.model = []

      // Input panel: onKeyUp
      this.apiInputBox.on('keyup', function (cm, e) {
        if (
          !ExcludedIntelliSenseTriggerKeys[(e.keyCode || e.which).toString()]
        ) {
          cm.execCommand('autocomplete', null, {
            completeSingle: false,
          })
        }
      })

      // Input panel: onChange
      this.apiInputBox.on('change', () => {
        this.identifyGroups()
        this.validateGroupsAsJSON()
      })

      // Input panel: onCursorActivity
      this.apiInputBox.on('cursorActivity', () => {
        this.setSelectedGroup()
        this.highlightSelectedGroup()
      })

      // Output panel
      this.apiOutputBox = CodeMirror.fromTextArea(
        this.$document[0].getElementById('api_output'),
        {
          lineNumbers: true,
          matchBrackets: true,
          mode: { name: 'javascript', json: true },
          readOnly: true,
          lineWrapping: true,
          styleActiveLine: true,
          theme: 'ttcn',
          foldGutter: true,
          gutters: ['CodeMirror-foldgutter'],
        }
      )
      this.apiOutputBox.setSize('auto', '100%')
      // Initial welcome message
      this.setOutput('Welcome!')

      // Fetch the API spec, used for hints and validation
      await this.getAPIspec()
      // Register helper plugin for CodeMirror
      this.registerCodeMirrorHintPlugin()
      CodeMirror.commands.autocomplete = function (cm) {
        CodeMirror.showHint(cm, CodeMirror.hint.dictionaryHint, {
          completeSingle: false,
        })
      }
    }

    /**
     * Exports results in JSON format
     */
    exportOutput() {
      try {
        // eslint-disable-next-line
        const blob = new Blob([this.apiOutputBox.getValue()], {
          type: 'application/json',
        })
        saveAs(blob, 'export.json') // eslint-disable-line
      } catch (error) {
        this.notification.showErrorToast(error.message || error)
      }
    }

    /**
     * Reads the instructions on the input panel and identify each group of
     * lines composing a request.
     *
     * Once completed, updates this.groups array with the new groups.
     */
    identifyGroups() {
      try {
        const currentState = this.saveCurrentState()

        const groups = []
        const splitted = currentState
          .split(/[\r\n]+(?=(?:GET|PUT|POST|DELETE|#)\b)/gm)
          .filter((item) => item.replace(/\s/g, '').length)
        let start = 0
        let end = 0
        let starts = []
        const slen = splitted.length
        for (let i = 0; i < slen; i++) {
          let tmp = splitted[i].split('\n')
          if (Array.isArray(tmp)) {
            tmp = tmp.filter((item) => !item.includes('#'))
          }
          const cursor = this.apiInputBox.getSearchCursor(splitted[i], null, {
            multiline: true,
          })

          if (cursor.findNext()) {
            start = cursor.from().line
          } else {
            throw new Error() // break this for loop the hard way :'(
          }

          /**
           * Prevents from user frustation when there are duplicated queries.
           * We want to look for the next query when available, even if it
           * already exists but it's not the selected query.
           */
          if (tmp.length) {
            // It's a safe loop since findNext method returns null if there
            // is no next query.
            while (
              this.apiInputBox.getLine(cursor.from().line) !== tmp[0] &&
              cursor.findNext()
            ) {
              start = cursor.from().line
            }
            // It's a safe loop since findNext method returns null if there
            // is no next query.
            while (starts.includes(start) && cursor.findNext()) {
              start = cursor.from().line
            }
          }
          starts.push(start)

          end = start + tmp.length

          const tmpRequestText = tmp[0]
          let tmpRequestTextJson = ''

          const tmplen = tmp.length
          for (let j = 1; j < tmplen; ++j) {
            if (!!tmp[j] && !tmp[j].includes('#')) {
              tmpRequestTextJson += tmp[j]
            }
          }

          if (tmpRequestTextJson && typeof tmpRequestTextJson === 'string') {
            let rtjlen = tmp.length
            while (rtjlen--) {
              if (tmp[rtjlen].trim() === '}') break
              else end -= 1
            }
          }

          if (!tmpRequestTextJson && tmp.length > 1) {
            tmp = [tmp[0]]
            end = start + 1
          }

          if (i === slen - 1 && !tmpRequestTextJson) {
            if (tmp.length > 1) end -= tmp.length - 1
          }

          end--

          groups.push({
            requestText: tmpRequestText,
            requestTextJson: tmpRequestTextJson,
            start,
            end,
          })
        }

        this.groups = groups
      } catch (error) {
        this.groups = []
      }
    }

    /**
     * Highlight the selected group, unhighlighting the previous one.
     */
    highlightSelectedGroup() {
      // Clear previous group
      for (const line of this.linesWithClass) {
        this.apiInputBox.removeLineClass(
          line,
          'background',
          'CodeMirror-styled-background'
        )
      }
      this.linesWithClass = []

      // Highlight the selected group, if present
      const group = this.selectedGroup
      if (group) {
        for (let line = group.start; line <= group.end; line++) {
          this.linesWithClass.push(
            this.apiInputBox.addLineClass(
              line,
              'background',
              'CodeMirror-styled-background'
            )
          )
        }
      }
    }

    /**
     * Validate the payload of the requests. Adds an error icon (widget)
     * next to the request.
     */
    validateGroupsAsJSON() {
      // Clear previous widgets
      for (const widget of this.errorWidgets) {
        this.apiInputBox.removeLineWidget(widget.widget)
      }
      this.errorWidgets = []

      // For each group, parse its payload as JSON in order to validate it,
      // and create a new error widget if it has syntax errors.
      for (const group of this.groups) {
        if (group.requestTextJson) {
          try {
            jsonLint.parse(group.requestTextJson)
          } catch (error) {
            const root = this.$document[0]

            // Error message
            const msg = root.createElement('div')
            msg.id = new Date().getTime() / 1000

            // Error icon
            const icon = msg.appendChild(root.createElement('div'))
            icon.className = 'lint-error-icon'
            icon.id = new Date().getTime() / 1000

            // Error icon: onMouseOver
            icon.onmouseover = () => {
              const advice = msg.appendChild(root.createElement('span'))
              advice.id = new Date().getTime() / 1000
              advice.innerText = error.message || 'Error parsing query'
              advice.className = 'lint-block-wz'
            }

            // Error icon: onMouseLeave
            icon.onmouseleave = () => {
              msg.removeChild(msg.lastChild)
            }

            // Add the error to the errorWidgets array.
            this.errorWidgets.push({
              start: group.start,
              widget: this.apiInputBox.addLineWidget(group.start, msg, {
                coverGutter: false,
                noHScroll: true,
              }),
            })
          }
        }
      }
    }

    /**
     * Load the API specification to provide hints (autocomplete) using the
     * plugin helper.
     */
    async getAPIspec() {
      try {
        const response = await this.request.httpReq(
          'GET',
          '/api/autocomplete',
          {}
        )
        this.apiInputBox.model = !response.error ? response.data : []
      } catch (error) {
        this.apiInputBox.model = []
      }
    }

    /**
     * Initialize the hint plugin for CodeMirror
     */
    registerCodeMirrorHintPlugin() {
      const self = this
      // Register our custom Codemirror hint plugin.
      CodeMirror.registerHelper('hint', 'dictionaryHint', function (editor) {
        const model = editor.model
        function getDictionary(line, word) {
          let hints = []
          const exp = line.split(/\s+/g)
          const currentGroup = self.selectedGroup
          const editorCursor = editor.getCursor()
          // Get http method, path, query params from API request
          const [
            inputRequest,
            inputHttpMethod,
            inputPath,
            inputQueryParamsStart,
            inputQueryParams,
            inputEndpoint,
            inputHttpMethodEndpoints,
            apiEndpoint,
          ] = self.destructureGroup(currentGroup)

          // Get API endpoint path hints
          if (
            exp[0] &&
            currentGroup &&
            currentGroup.start === editorCursor.line &&
            !word.includes('{')
          ) {
            // Get hints for requests as: http_method api_path?query_params
            if (inputHttpMethod && inputPath && inputQueryParamsStart) {
              // Split the query params as {key, value}[] where key=value in query param
              const inputQuery =
                (inputQueryParams &&
                  inputQueryParams
                    .split('&')
                    .filter((item) => item)
                    .map((item) => {
                      const [key, value] = item.split('=')
                      return { key, value }
                    })) ||
                []
              // It is defining query param value query_param=
              const definingQueryParamValue =
                inputQueryParams && inputQueryParams.includes('&')
                  ? inputRequest.lastIndexOf('=') >
                    inputRequest.lastIndexOf('&')
                  : !!(inputQueryParams || '').includes('?') ||
                    inputRequest.lastIndexOf('=') >
                      inputRequest.lastIndexOf('?')

              if (
                !definingQueryParamValue &&
                apiEndpoint &&
                apiEndpoint.query
              ) {
                const inputQueryPreviousEntriesKeys = inputQuery
                  .filter((query) => query.key && query.value)
                  .map((query) => query.key)
                hints = apiEndpoint.query
                  .filter(
                    (query) =>
                      !inputQueryPreviousEntriesKeys.includes(query.name)
                  )
                  .map(
                    (item) =>
                      `${inputPath}${inputQuery
                        .filter((query) => query.key && query.value)
                        .reduce(
                          (accum, query, index) =>
                            `${accum}${index > 0 ? '&' : ''}${query.key}=${
                              query.value
                            }`,
                          '?'
                        )}${
                        inputQuery.filter((query) => query.key && query.value)
                          .length > 0
                          ? '&'
                          : ''
                      }${item.name}=`
                  )
              }
            } else if (inputHttpMethod) {
              // Get hints for all http method endpoint
              if (!inputPath) {
                hints = inputHttpMethodEndpoints.map(
                  (endpoint) => endpoint.name
                )
              } else {
                // Get hints for requests as: http_method api_path
                hints = inputHttpMethodEndpoints
                  .map((endpoint) => ({
                    ...endpoint,
                    splitURL: endpoint.name.split('/').filter((item) => item),
                  }))
                  .filter((endpoint) =>
                    endpoint.splitURL.reduce((accum, splitPath, index) => {
                      if (!accum) {
                        return accum
                      }
                      if (
                        splitPath.startsWith(':') ||
                        !inputEndpoint[index] ||
                        (inputEndpoint[index] &&
                          splitPath.startsWith(inputEndpoint[index]))
                      ) {
                        return true
                      }
                    }, true)
                  )
                  .map((endpoint) =>
                    endpoint.splitURL.reduce(
                      (accum, splitPath, index) =>
                        `${accum}/${
                          (splitPath.startsWith(':') && inputEndpoint[index]) ||
                          splitPath
                        }`,
                      ''
                    )
                  )
              }
            }
            // Get API endpoint body params hints
          } else if (
            currentGroup &&
            currentGroup.requestText &&
            currentGroup.requestTextJson &&
            currentGroup.start < editorCursor.line &&
            currentGroup.end > editorCursor.line
          ) {
            const reLineStart = /^(\s*)(?:"|')(\S*)(?::)?$/ // Line starts with
            const spaceLineStart = (line.match(reLineStart) || [])[1] || ''
            const inputKeyBodyParam = (line.match(reLineStart) || [])[2] || ''

            const renderBodyParam = (parameter, spaceLineStart) => {
              let valueBodyParam = ''
              if (parameter.type === 'string') {
                valueBodyParam = '""'
              } else if (parameter.type === 'array') {
                valueBodyParam = '[]'
              } else if (parameter.type === 'object') {
                const paramPropertiesKeys = Object.keys(
                  parameter.properties
                ).sort()
                const lastIndex = paramPropertiesKeys.length - 1
                valueBodyParam = `{\n${paramPropertiesKeys
                  .map(
                    (keyProperty, index) =>
                      `${spaceLineStart}\t${renderBodyParam(
                        {
                          name: keyProperty,
                          ...parameter.properties[keyProperty],
                        },
                        spaceLineStart + '\t'
                      )}${lastIndex !== index ? ',' : ''}`
                  )
                  .join('\n')}\n${spaceLineStart}}`
              }
              return `"${parameter.name}": ${valueBodyParam}`
            }

            const getInnerKeysBodyRequest = () => {
              let jsonBodyKeyCurrent = []
              let jsonBodyKeyCurrentPosition = {
                start: { line: currentGroup.start, ch: 0 },
                end: { line: currentGroup.start, ch: 0 },
              }
              return [
                ...Array(currentGroup.end + 1 - currentGroup.start).keys(),
              ].reduce((jsonBodyKeyCursor, lineNumberRange) => {
                const editorLineNumber = currentGroup.start + lineNumberRange
                const editorLineContent = editor.getLine(editorLineNumber)
                const openBracket = editorLineContent.indexOf('{')
                const closeBracket = editorLineContent.indexOf('}')
                const keyOpenBracket = (editorLineContent.match(
                  /\s*"(\S+)"\s*:\s*\{/
                ) || [])[1]
                keyOpenBracket &&
                  jsonBodyKeyCurrent.push(keyOpenBracket) &&
                  (jsonBodyKeyCurrentPosition.start = {
                    line: editorLineNumber,
                    ch: openBracket,
                  })

                closeBracket !== -1 &&
                  (jsonBodyKeyCurrentPosition.end = {
                    line: editorLineNumber,
                    ch: closeBracket,
                  })
                if (
                  !jsonBodyKeyCursor &&
                  editorCursor.line > jsonBodyKeyCurrentPosition.start.line &&
                  editorCursor.line < jsonBodyKeyCurrentPosition.end.line
                ) {
                  jsonBodyKeyCursor = [...jsonBodyKeyCurrent]
                }
                closeBracket !== -1 && jsonBodyKeyCurrent.pop()
                return jsonBodyKeyCursor
              }, false)
            }
            const getInnerPropertyBodyParamObject = (object, keys) => {
              if (!keys || !keys.length) {
                return object
              }
              const key = keys.shift()
              if (
                !object.properties ||
                !object.properties[key] ||
                object.properties[key].type !== 'object'
              ) {
                return []
              }
              return getInnerPropertyBodyParamObject(
                object.properties[key],
                keys
              )
            }

            if (apiEndpoint && apiEndpoint.body && reLineStart.test(line)) {
              let inputBodyPreviousKeys
              let paramsBody = apiEndpoint.body
              let requestBodyCursorKeys
              if (apiEndpoint.body[0].type === 'object') {
                requestBodyCursorKeys = getInnerKeysBodyRequest()
                const paramInnerBody = getInnerPropertyBodyParamObject(
                  apiEndpoint.body[0],
                  [...requestBodyCursorKeys]
                )
                paramsBody = Object.keys(paramInnerBody.properties)
                  .sort()
                  .map((keyBodyParam) => ({
                    name: keyBodyParam,
                    ...paramInnerBody.properties[keyBodyParam],
                  }))
              }
              try {
                const bodySanitizedBodyParam =
                  currentGroup.requestTextJson.replace(/(,\s*"\S*\s*)\}/g, '}')
                inputBodyPreviousKeys = Object.keys(
                  (requestBodyCursorKeys || []).reduce(
                    (acumm, key) => acumm[key],
                    JSON.parse(bodySanitizedBodyParam)
                  )
                )
              } catch (error) {
                inputBodyPreviousKeys = []
              }

              hints = paramsBody
                .filter(
                  (bodyParam) =>
                    !inputBodyPreviousKeys.includes(bodyParam.name) &&
                    bodyParam.name &&
                    (inputKeyBodyParam
                      ? bodyParam.name.includes(inputKeyBodyParam)
                      : true)
                )
                .map((bodyParam) => ({
                  text: renderBodyParam(bodyParam, spaceLineStart),
                  _moveCursor: ['string', 'array'].includes(bodyParam.type),
                  displayText: bodyParam.name,
                  bodyParam,
                  hint: (_cm, _self, data) => {
                    editor.replaceRange(
                      line.replace(/\S+/, '') + data.text,
                      { line: editorCursor.line, ch: editorCursor.ch },
                      { line: editorCursor.line, ch: 0 }
                    )
                    const textReplacedLine = editor.getLine(editorCursor.line)
                    editor.setCursor({
                      line: editorCursor.line,
                      ch: data._moveCursor
                        ? textReplacedLine.length - 1
                        : textReplacedLine.length,
                    })
                  },
                }))
            }
          } else {
            hints = model.map((a) => a.method)
          }
          const final_hints = hints.map((chain) => {
            let t = 0
            return (chain = chain.replace(/\?/g, (match) => {
              t++
              return t > 1 ? '' : match
            }))
          })
          return final_hints
        }

        const cur = editor.getCursor()
        const curLine = editor.getLine(cur.line)
        let start = cur.ch
        let end = start
        const whiteSpace = /\s/
        while (end < curLine.length && !whiteSpace.test(curLine.charAt(end))) {
          ++end
        }
        while (start && !whiteSpace.test(curLine.charAt(start - 1))) {
          --start
        }
        const curWord = start !== end && curLine.slice(start, end)
        return {
          list: (!curWord
            ? []
            : getDictionary(curLine, curWord).filter(function (item) {
                return item.toUpperCase().includes(curWord.toUpperCase())
              })
          ).sort(),
          from: CodeMirror.Pos(cur.line, start),
          to: CodeMirror.Pos(cur.line, end),
        }
      })
    }

    /**
     * Saves the current state of the API console to the browser's cache
     * @returns saved state (current)
     */
    saveCurrentState() {
      const currentState = this.apiInputBox.getValue().toString()
      this.appState.setCurrentDevTools(currentState)
      return currentState
    }

    /**
     * Restores the API console state from the browser's cache.
     * If not available, the default requests are used instead.
     */
    restoreStateFromCache() {
      const currentState = this.appState.getCurrentDevTools()
      if (!currentState) {
        const demoStr =
          'GET /agents?status=active\n\n' +
          '#Example comment\n' +
          'GET /manager/info\n\n' +
          'GET /syscollector/000/packages?search=ssh\n' +
          JSON.stringify({ limit: 5 }, null, 2)

        this.appState.setCurrentDevTools(demoStr)
        this.apiInputBox.getDoc().setValue(demoStr)
      } else {
        this.apiInputBox.getDoc().setValue(currentState)
      }
    }

    /**
     * Finds the selected group and updates this.selectedGroup.
     * Updates the buttons.
     * @see updateButtons
     */
    setSelectedGroup() {
      try {
        const selection = this.apiInputBox.getCursor()
        const desiredGroup = this.groups.filter(
          (item) =>
            item.requestText &&
            item.end >= selection.line &&
            item.start <= selection.line
        )
        let docuURL = ''

        if (desiredGroup.length > 0) {
          // apiEndpoint is at the last position of the array, hence .pop()
          const apiEndpoint = this.destructureGroup(desiredGroup[0]).pop()

          // Arrange the documentation for this request
          if (apiEndpoint && apiEndpoint.documentation) {
            docuURL = apiEndpoint.documentation.replace(
              '/current/',
              `/${this.appDocuVersion}/`
            )
          }
        }

        this.selectedGroup = desiredGroup[0] || null

        // Get the cursor's position for the selected line.
        // The line can be part of a group (request) or not.
        const coords = this.apiInputBox.cursorCoords({
          line: desiredGroup[0]?.start ?? selection.line ?? 0,
          ch: 0,
        })
        this.updateButtons(coords, docuURL)
      } catch (error) {
        console.error(error)
        this.selectedGroup = null
      }
    }

    /**
     * Destructure the API request represented by the given group
     * @param {object} group group from this.groups to destructure
     * @returns array
     */
    destructureGroup(group) {
      const [
        inputRequest,
        inputHttpMethod,
        inputPath,
        inputQueryParamsStart,
        inputQueryParams,
      ] =
        (group &&
          group.requestText &&
          group.requestText.match(
            /^(GET|PUT|POST|DELETE) ([^\?]*)(\?)?(\S+)?/
          )) ||
        []

      // Split the input request path as array and lowercase
      const inputEndpoint =
        (inputPath &&
          inputPath
            .split('/')
            .filter((item) => item)
            .map((item) => item.toLowerCase())) ||
        []

      // Get all API endpoints with http method in the request
      const inputHttpMethodEndpoints =
        (
          this.apiInputBox.model.find(
            (item) => item.method === inputHttpMethod
          ) || {}
        ).endpoints || []

      // Find the API endpoint in the request
      const apiEndpoint = inputHttpMethodEndpoints
        .map((endpoint) => ({
          ...endpoint,
          splitURL: endpoint.name.split('/').filter((item) => item),
        }))
        .filter((endpoint) => endpoint.splitURL.length === inputEndpoint.length)
        .find((endpoint) =>
          endpoint.splitURL.reduce(
            (accum, str, index) =>
              accum &&
              (str.startsWith(':')
                ? true
                : str.toLowerCase() === inputEndpoint[index]),
            true
          )
        )
      return [
        inputRequest,
        inputHttpMethod,
        inputPath,
        inputQueryParamsStart,
        inputQueryParams,
        inputEndpoint,
        inputHttpMethodEndpoints,
        apiEndpoint,
      ]
    }

    /**
     * Applies initial styles to the Play and the Documentaion buttons.
     *
     * This is required, as the buttons would be placed outside of the
     * input panel otherwise.
     */
    initButtons() {
      const coords = this.apiInputBox.cursorCoords({
        line: 0,
        ch: 0,
      })
      const currentPlayButton = $('#play_button').offset()

      // Initial offset
      $('#play_button')
        .offset({
          top: coords.top + 35,
          left: currentPlayButton.left,
        })
        .show()
      $('#wazuh_dev_tools_documentation')
        .offset({
          top: coords.top + 35,
        })
        .show()
    }

    /**
     * Updates the Play and Documentation buttons, by modifying their position
     * and visibility depending on the cursor's position.
     *
     * If the cursor position is not over a valid API endpoint, both buttons
     * are hidden.
     *
     * If no documentation link is found for the selected request, the
     * documentation link is hidden.
     *
     * The buttons are re-enabled if the previous conditions are no longer
     * present.
     *
     * The buttons positions are always updated to the cursor's position.
     *
     * @param {object} coords CodeMirror's cursor coordinates
     * @param {string} docuLink documentation link for the selected request
     */
    updateButtons(coords, docuLink = '') {
      // Update buttons' visbility
      docuLink === ''
        ? $('#wazuh_dev_tools_documentation').hide()
        : $('#wazuh_dev_tools_documentation').show()
      this.selectedGroup === null
        ? $('#play_button').hide()
        : $('#play_button').show()

      const currentPlayButton = $('#play_button').offset()
      // Update buttons' position
      $('#play_button').offset({
        top: coords.top,
        left: currentPlayButton.left,
      })
      $('#wazuh_dev_tools_documentation').attr('href', docuLink).offset({
        top: coords.top,
      })
    }

    /**
     * Updates the value of the output panel.
     * @param {string} value text to set
     */
    setOutput(value) {
      this.apiOutputBox.setValue(value)
    }

    /**
     * Makes a request to the Wazuh API
     * @param {string} method one of GET, POST, PUT, DELETE
     * @param {string} path API endpoint
     * @param {object} payload requests payload, body
     * @returns API response, as a model
     * @see apiResponseFactory.js
     */
    async actuallySend(method, path, payload = {}) {
      return await this.apiRequestFactory
        .getRequest(method, path, payload)
        .send()
    }

    /**
     * Prepares the selected request to be sent to the API.
     *
     * Checks that the request is valid, sends it and updates the output panel,
     * also handling any error that might have happened.
     * @see actuallySend @see groupHasErrors @see setOutput
     */
    async send() {
      try {
        const group = this.selectedGroup
        if (!group) {
          throw new RangeError('No group is selected')
        }
        if (this.groupHasErrors(group)) {
          throw new SyntaxError('The selected group contains syntax errors')
        }

        const [mMethod, mPath] = group.requestText.split(' ')
        const mPayload =
          group.requestTextJson.length > 0
            ? JSON.parse(group.requestTextJson)
            : {}
        const response = await this.actuallySend(mMethod, mPath, mPayload)
        const output = JSON.stringify(
          response.getRawResponse(),
          null,
          2
        ).replace(/\\\\/g, '\\')
        this.setOutput(output)
      } catch (error) {
        if (error instanceof RangeError || error instanceof SyntaxError) {
          this.setOutput(error.name + ': ' + error.message)
        } else if (typeof error === 'string') {
          this.setOutput(error)
        } else if (error.data && typeof error.data === 'object') {
          this.setOutput(JSON.stringify(error))
        } else {
          this.setOutput('Empty')
        }
      }
    }

    /**
     * Look for errors on the given group
     * @param {object} group group to check
     * @returns true if the group has errors, false otherwise
     */
    groupHasErrors(group) {
      return (
        this.errorWidgets.filter(
          (item) => item.widget.line.text === group.requestText
        ).length > 0
      )
    }
  }
  app.controller('devToolsCtrl', DevToolsController)
})
