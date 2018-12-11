/*
 * Wazuh app - Dev tools controller
 * Copyright (C) 2018 Wazuh, Inc.
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
  'jquery',
  'codemirror',
  'jsonLint',
  'javascript',
  'brace-fold',
  'foldcode',
  'foldgutter',
  'search-cursor',
  'mark-selection'
], function(
  module,
  $,
  CodeMirror,
  jsonLint,
  javascript,
  braceFold,
  foldcode,
  foldgutter,
  searchCursor,
  markSeletion
) {
  'use strict'
  class DevToolsCtrl {
    constructor(
      $scope,
      $window,
      $document,
      $navigationService,
      $notificationService,
      $requestService,
      extensions
    ) {
      this.$scope = $scope
      this.request = $requestService
      this.$window = $window
      this.appState = $navigationService
      this.errorHandler = $notificationService
      this.$document = $document
      this.groups = []
      this.linesWithClass = []
      this.widgets = []
      this.admin = extensions['admin'] === 'true' ? true : false
    }

    unescapeBuffer(s, decodeSpaces) {
      let out = new Buffer(s.length)
      let state = 0
      let n, m, hexchar

      for (let inIndex = 0, outIndex = 0; inIndex <= s.length; inIndex++) {
        let c = inIndex < s.length ? s.charCodeAt(inIndex) : NaN
        switch (state) {
          case 0: // Any character
            switch (c) {
              case 37: // '%'
                n = 0
                m = 0
                state = 1
                break
              case 43: // '+'
                if (decodeSpaces) c = 32 // ' '
              // falls through
              default:
                out[outIndex++] = c
                break
            }
            break

          case 1: // First hex digit
            hexchar = c
            if (c >= 48 /*0*/ && c <= 57 /*9*/) {
              n = c - 48 /*0*/
            } else if (c >= 65 /*A*/ && c <= 70 /*F*/) {
              n = c - 65 /*A*/ + 10
            } else if (c >= 97 /*a*/ && c <= 102 /*f*/) {
              n = c - 97 /*a*/ + 10
            } else {
              out[outIndex++] = 37 /*%*/
              out[outIndex++] = c
              state = 0
              break
            }
            state = 2
            break

          case 2: // Second hex digit
            state = 0
            if (c >= 48 /*0*/ && c <= 57 /*9*/) {
              m = c - 48 /*0*/
            } else if (c >= 65 /*A*/ && c <= 70 /*F*/) {
              m = c - 65 /*A*/ + 10
            } else if (c >= 97 /*a*/ && c <= 102 /*f*/) {
              m = c - 97 /*a*/ + 10
            } else {
              out[outIndex++] = 37 /*%*/
              out[outIndex++] = hexchar
              out[outIndex++] = c
              break
            }
            out[outIndex++] = 16 * n + m
            break
        }
      }

      // TODO support returning arbitrary buffers.

      return out.slice(0, outIndex - 1)
    }

    decodeStr(s, decoder) {
      try {
        return decoder(s)
      } catch (e) {
        return QueryString.unescape(s, true)
      }
    }

    unescape(s, decodeSpaces) {
      try {
        return decodeURIComponent(s)
      } catch (e) {
        return this.unescapeBuffer(s, decodeSpaces).toString()
      }
    }

    qsUnescape(s, decodeSpaces) {
      try {
        return decodeURIComponent(s)
      } catch (e) {
        return this.unescapeBuffer(s, decodeSpaces).toString()
      }
    }

    parse(qs, sep, eq, options) {
      sep = sep || '&'
      eq = eq || '='

      let obj = {}

      if (typeof qs !== 'string' || qs.length === 0) {
        return obj
      }

      if (typeof sep !== 'string') sep += ''

      let eqLen = eq.length
      let sepLen = sep.length

      let maxKeys = 1000
      if (options && typeof options.maxKeys === 'number') {
        maxKeys = options.maxKeys
      }

      let pairs = Infinity
      if (maxKeys > 0) pairs = maxKeys

      let decode = this.unescape
      if (options && typeof options.decodeURIComponent === 'function') {
        decode = options.decodeURIComponent
      }
      let customDecode = decode !== this.qsUnescape

      let keys = []
      let lastPos = 0
      let sepIdx = 0
      let eqIdx = 0
      let key = ''
      let value = ''
      let keyEncoded = customDecode
      let valEncoded = customDecode
      let encodeCheck = 0
      for (let i = 0; i < qs.length; ++i) {
        let code = qs.charCodeAt(i)

        // Try matching key/value pair separator (e.g. '&')
        if (code === sep.charCodeAt(sepIdx)) {
          if (++sepIdx === sepLen) {
            // Key/value pair separator match!
            let end = i - sepIdx + 1
            if (eqIdx < eqLen) {
              // If we didn't find the key/value separator, treat the substring as
              // part of the key instead of the value
              if (lastPos < end) key += qs.slice(lastPos, end)
            } else if (lastPos < end) value += qs.slice(lastPos, end)
            if (keyEncoded) key = this.decodeStr(key, decode)
            if (valEncoded) value = this.decodeStr(value, decode)
            // Use a key array lookup instead of using hasOwnProperty(), which is
            // slower
            if (keys.indexOf(key) === -1) {
              obj[key] = value
              keys[keys.length] = key
            } else {
              let curValue = obj[key]
              // `instanceof Array` is used instead of Array.isArray() because it
              // is ~15-20% faster with v8 4.7 and is safe to use because we are
              // using it with values being created within this function
              if (curValue instanceof Array) curValue[curValue.length] = value
              else obj[key] = [curValue, value]
            }
            if (--pairs === 0) break
            keyEncoded = valEncoded = customDecode
            encodeCheck = 0
            key = value = ''
            lastPos = i + 1
            sepIdx = eqIdx = 0
          }
          continue
        } else {
          sepIdx = 0
          if (!valEncoded) {
            // Try to match an (valid) encoded byte (once) to minimize unnecessary
            // calls to string decoding functions
            if (code === 37 /*%*/) {
              encodeCheck = 1
            } else if (
              encodeCheck > 0 &&
              ((code >= 48 /*0*/ && code <= 57) /*9*/ ||
              (code >= 65 /*A*/ && code <= 70) /*Z*/ ||
                (code >= 97 /*a*/ && code <= 102)) /*z*/
            ) {
              if (++encodeCheck === 3) valEncoded = true
            } else {
              encodeCheck = 0
            }
          }
        }

        // Try matching key/value separator (e.g. '=') if we haven't already
        if (eqIdx < eqLen) {
          if (code === eq.charCodeAt(eqIdx)) {
            if (++eqIdx === eqLen) {
              // Key/value separator match!
              let end = i - eqIdx + 1
              if (lastPos < end) key += qs.slice(lastPos, end)
              encodeCheck = 0
              lastPos = i + 1
            }
            continue
          } else {
            eqIdx = 0
            if (!keyEncoded) {
              // Try to match an (valid) encoded byte once to minimize unnecessary
              // calls to string decoding functions
              if (code === 37 /*%*/) {
                encodeCheck = 1
              } else if (
                encodeCheck > 0 &&
                ((code >= 48 /*0*/ && code <= 57) /*9*/ ||
                (code >= 65 /*A*/ && code <= 70) /*Z*/ ||
                  (code >= 97 /*a*/ && code <= 102)) /*z*/
              ) {
                if (++encodeCheck === 3) keyEncoded = true
              } else {
                encodeCheck = 0
              }
            }
          }
        }

        if (code === 43 /*+*/) {
          if (eqIdx < eqLen) {
            if (i - lastPos > 0) key += qs.slice(lastPos, i)
            key += '%20'
            keyEncoded = true
          } else {
            if (i - lastPos > 0) value += qs.slice(lastPos, i)
            value += '%20'
            valEncoded = true
          }
          lastPos = i + 1
        }
      }

      // Check if we have leftover key or value data
      if (pairs > 0 && (lastPos < qs.length || eqIdx > 0)) {
        if (lastPos < qs.length) {
          if (eqIdx < eqLen) key += qs.slice(lastPos)
          else if (sepIdx < sepLen) value += qs.slice(lastPos)
        }
        if (keyEncoded) key = this.decodeStr(key, decode)
        if (valEncoded) value = this.decodeStr(value, decode)
        // Use a key array lookup instead of using hasOwnProperty(), which is
        // slower
        if (keys.indexOf(key) === -1) {
          obj[key] = value
          keys[keys.length] = key
        } else {
          let curValue = obj[key]
          // `instanceof Array` is used instead of Array.isArray() because it
          // is ~15-20% faster with v8 4.7 and is safe to use because we are
          // using it with values being created within this function
          if (curValue instanceof Array) curValue[curValue.length] = value
          else obj[key] = [curValue, value]
        }
      }

      return obj
    }

    $onInit() {
      this.apiInputBox = CodeMirror.fromTextArea(
        this.$document[0].getElementById('api_input'),
        {
          lineNumbers: true,
          matchBrackets: true,
          mode: { name: 'javascript', json: true },
          theme: 'ttcn',
          foldGutter: true,
          styleSelectedText: true,
          gutters: ['CodeMirror-foldgutter']
        }
      )

      this.apiInputBox.on('change', () => {
        this.groups = this.analyzeGroups()
        const currentState = this.apiInputBox.getValue().toString()
        this.appState.setCurrentDevTools(currentState)
        const currentGroup = this.calculateWhichGroup()
        if (currentGroup) {
          const hasWidget = this.widgets.filter(
            item => item.start === currentGroup.start
          )
          if (hasWidget.length)
            this.apiInputBox.removeLineWidget(hasWidget[0].widget)
          setTimeout(() => this.checkJsonParseError(), 450)
        }
      })

      this.apiInputBox.on('cursorActivity', () => {
        const currentGroup = this.calculateWhichGroup()
        this.highlightGroup(currentGroup)
      })

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
          gutters: ['CodeMirror-foldgutter']
        }
      )

      this.$scope.send = firstTime => this.send(firstTime)

      this.$scope.help = () => {
        this.$window.open(
          'https://documentation.wazuh.com/current/user-manual/api/reference.html'
        )
      }

      this.init()
      this.$scope.send(true)
    }

    analyzeGroups() {
      try {
        const currentState = this.apiInputBox.getValue().toString()
        this.appState.setCurrentDevTools(currentState)

        const tmpgroups = []
        const splitted = currentState.split(
          /[\r\n]+(?=(?:GET|PUT|POST|DELETE)\b)/gm
        )
        let start = 0
        let end = 0

        const slen = splitted.length
        for (let i = 0; i < slen; i++) {
          let tmp = splitted[i].split('\n')
          if (Array.isArray(tmp)) tmp = tmp.filter(item => !item.includes('#'))
          const cursor = this.apiInputBox.getSearchCursor(splitted[i], null, {
            multiline: true
          })

          if (cursor.findNext()) start = cursor.from().line
          else return []

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

          tmpgroups.push({
            requestText: tmpRequestText,
            requestTextJson: tmpRequestTextJson,
            start,
            end
          })
        }

        return tmpgroups
      } catch (error) {
        return []
      }
    }

    highlightGroup(group) {
      for (const line of this.linesWithClass) {
        this.apiInputBox.removeLineClass(
          line,
          'background',
          'CodeMirror-styled-background'
        )
      }
      this.linesWithClass = []
      if (group) {
        if (!group.requestTextJson) {
          this.linesWithClass.push(
            this.apiInputBox.addLineClass(
              group.start,
              'background',
              'CodeMirror-styled-background'
            )
          )
          return
        }
        for (let i = group.start; i <= group.end; i++) {
          this.linesWithClass.push(
            this.apiInputBox.addLineClass(
              i,
              'background',
              'CodeMirror-styled-background'
            )
          )
        }
      }
    }

    checkJsonParseError() {
      const affectedGroups = []
      for (const widget of this.widgets) {
        this.apiInputBox.removeLineWidget(widget.widget)
      }
      this.widgets = []
      for (const item of this.groups) {
        if (item.requestTextJson) {
          try {
            // jsonLint.parse(item.requestTextJson)
          } catch (error) {
            affectedGroups.push(item.requestText)
            const msg = this.$document[0].createElement('div')
            msg.id = new Date().getTime() / 1000
            const icon = msg.appendChild(this.$document[0].createElement('div'))

            icon.className = 'lint-error-icon'
            icon.id = new Date().getTime() / 1000
            icon.onmouseover = () => {
              const advice = msg.appendChild(
                this.$document[0].createElement('span')
              )
              advice.id = new Date().getTime() / 1000
              advice.innerText = error.message || 'Error parsing query'
              advice.className = 'lint-block-wz'
            }

            icon.onmouseleave = () => {
              msg.removeChild(msg.lastChild)
            }

            this.widgets.push({
              start: item.start,
              widget: this.apiInputBox.addLineWidget(item.start, msg, {
                coverGutter: false,
                noHScroll: true
              })
            })
          }
        }
      }
      return affectedGroups
    }

    init() {
      this.apiInputBox.setSize('auto', '100%')
      this.apiOutputBox.setSize('auto', '100%')
      const currentState = this.appState.getCurrentDevTools()
      if (!currentState) {
        const demoStr =
          'GET /\n\n# Comment here\nGET /agents\n' +
          JSON.stringify({ limit: 1 }, null, 2)
        this.appState.setCurrentDevTools(demoStr)
        this.apiInputBox.getDoc().setValue(demoStr)
      } else {
        this.apiInputBox.getDoc().setValue(currentState)
      }
      this.groups = this.analyzeGroups()
      const currentGroup = this.calculateWhichGroup()
      this.highlightGroup(currentGroup)
    }

    calculateWhichGroup(firstTime) {
      try {
        const selection = this.apiInputBox.getCursor()
        const desiredGroup = firstTime
          ? this.groups.filter(item => item.requestText)
          : this.groups.filter(
              item =>
                item.requestText &&
                (item.end >= selection.line && item.start <= selection.line)
            )

        // Place play button at first line from the selected group
        const cords = this.apiInputBox.cursorCoords({
          line: desiredGroup[0].start,
          ch: 0
        })
        if (!$('#play_button').is(':visible')) $('#play_button').show()
        const currentPlayButton = $('#play_button').offset()
        $('#play_button').offset({
          top: cords.top,
          left: currentPlayButton.left
        })
        if (firstTime) this.highlightGroup(desiredGroup[0])
        return desiredGroup[0]
      } catch (error) {
        $('#play_button').hide()
        return null
      }
    }

    async send(firstTime) {
      try {
        this.groups = this.analyzeGroups()
        const desiredGroup = this.calculateWhichGroup(firstTime)
        if (desiredGroup) {
          if (firstTime) {
            const cords = this.apiInputBox.cursorCoords({
              line: desiredGroup.start,
              ch: 0
            })
            const currentPlayButton = $('#play_button').offset()
            $('#play_button').offset({
              top: cords.top + 10,
              left: currentPlayButton.left
            })
          }

          const affectedGroups = this.checkJsonParseError()
          const filteredAffectedGroups = affectedGroups.filter(
            item => item === desiredGroup.requestText
          )
          if (filteredAffectedGroups.length) {
            this.apiOutputBox.setValue('Error parsing JSON query')
            return
          }

          let method = ''
          if (this.admin) {
            method = desiredGroup.requestText.startsWith('GET')
              ? 'GET'
              : desiredGroup.requestText.startsWith('POST')
              ? 'POST'
              : desiredGroup.requestText.startsWith('PUT')
              ? 'PUT'
              : desiredGroup.requestText.startsWith('DELETE')
              ? 'DELETE'
              : 'GET'
          } else {
            method = 'GET'
          }
          const requestCopy = desiredGroup.requestText.includes(method)
            ? desiredGroup.requestText.split(method)[1].trim()
            : desiredGroup.requestText

          // Checks for inline parameters
          const inlineSplit = requestCopy.split('?')

          const extra =
            inlineSplit && inlineSplit[1] ? this.parse(inlineSplit[1]) : {}

          const req = requestCopy
            ? requestCopy.startsWith('/')
              ? requestCopy
              : `/${requestCopy}`
            : '/'

          let JSONraw = {}
          try {
            JSONraw = JSON.parse(desiredGroup.requestTextJson)
          } catch (error) {
            JSONraw = {}
          }

          if (typeof extra.pretty !== 'undefined') delete extra.pretty
          if (typeof JSONraw.pretty !== 'undefined') delete JSONraw.pretty

          // Assign inline parameters
          for (const key in extra) JSONraw[key] = extra[key]

          const path = req.includes('?') ? req.split('?')[0] : req

          // if (typeof JSONraw === 'object') JSONraw.devTools = true
          const output = await this.request.apiReq(path, JSONraw, method)
          const result =
            output.data && output.data.data && !output.data.error
              ? JSON.stringify(output.data.data, null, 2)
              : output.data.message || 'Unkown error'
          this.apiOutputBox.setValue(result)
        } else {
          this.apiOutputBox.setValue('Welcome!')
        }
      } catch (error) {
        const parsedError = this.errorHandler.showSimpleToast(error)
        if (typeof parsedError === 'string') {
          return this.apiOutputBox.setValue(parsedError)
        } else if (error && error.data && typeof error.data === 'object') {
          return this.apiOutputBox.setValue(JSON.stringify(error.data))
        } else {
          return this.apiOutputBox.setValue('Empty')
        }
      }
    }
  }

  // Logs controller
  module.controller('devToolsCtrl', DevToolsCtrl)
})
