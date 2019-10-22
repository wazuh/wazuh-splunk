"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sprintfFormat = sprintfFormat;
exports.sprintfParse = sprintfParse;

var _lodash = require("lodash");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// This file was adapted from [Alexandru's sprintf-js implementation](https://github.com/alexei/sprintf.js),
// which is BSD-3-Clause-licensed:
//
// Copyright (c) 2007-present, Alexandru Mărășteanu <hello@alexei.ro>
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
// * Redistributions of source code must retain the above copyright
//   notice, this list of conditions and the following disclaimer.
// * Redistributions in binary form must reproduce the above copyright
//   notice, this list of conditions and the following disclaimer in the
//   documentation and/or other materials provided with the distribution.
// * Neither the name of this software nor the names of its contributors may be
//   used to endorse or promote products derived from this software without
//   specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// End of BSD-3-Clause license text.

/**
 * RegExs used by sprintf.
 * @private
 */
var re = {
  notType: /[^T]/,
  notPrimitive: /[^v]/,
  number: /[diefg]/,
  numericArg: /[bcdiefguxX]/,
  json: /[j]/,
  text: /^[^\x25]+/,
  modulo: /^\x25{2}/,
  placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
  key: /^([a-z_][a-z_\d]*)/i,
  keyAccess: /^\.([a-z_][a-z_\d]*)/i,
  indexAccess: /^\[(\d+)\]/,
  sign: /^[+-]/
};
/**
 * Internal helper.
 * @private
 */

function sprintf(key) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  // eslint-disable-next-line no-use-before-define
  return sprintfFormat(sprintfParse(key), [key].concat(rest));
}
/**
 * Internal implementation of sprintf.
 * @private
 */


function sprintfFormat(parseTree, argv) {
  /* eslint-disable default-case, no-bitwise, no-nested-ternary */
  var treeLength = parseTree.length;
  var cursor = 1;
  var arg;
  var output = '';
  var i;
  var k;
  var ph;
  var pad;
  var padCharacter;
  var padLength;
  var isPositive;
  var sign;

  for (i = 0; i < treeLength; i += 1) {
    if (typeof parseTree[i] === 'string') {
      output += parseTree[i];
    } else if (_typeof(parseTree[i]) === 'object') {
      ph = parseTree[i]; // convenience purposes only

      if (ph.keys) {
        // keyword argument
        arg = argv[cursor];

        for (k = 0; k < ph.keys.length; k += 1) {
          if (!(0, _lodash.has)(arg, ph.keys[k])) {
            throw new Error(sprintf('[sprintf] property "%s" does not exist', ph.keys[k]));
          }

          arg = arg[ph.keys[k]];
        }
      } else if (ph.paramNo) {
        // positional argument (explicit)
        arg = argv[ph.paramNo];
      } else {
        // positional argument (implicit)
        arg = argv[cursor];
        cursor += 1;
      }

      if (re.notType.test(ph.type) && re.notPrimitive.test(ph.type) && arg instanceof Function) {
        arg = arg();
      }

      if (re.numericArg.test(ph.type) && typeof arg !== 'number' && Number.isNaN(Number(arg))) {
        throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg));
      }

      if (re.number.test(ph.type)) {
        isPositive = arg >= 0;
      }

      switch (ph.type) {
        case 'b':
          arg = parseInt(arg, 10).toString(2);
          break;

        case 'c':
          arg = String.fromCharCode(parseInt(arg, 10));
          break;

        case 'd':
        case 'i':
          arg = parseInt(arg, 10);
          break;

        case 'j':
          arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width, 10) : 0);
          break;

        case 'e':
          arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential();
          break;

        case 'f':
          arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
          break;

        case 'g':
          arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
          break;

        case 'o':
          arg = (parseInt(arg, 10) >>> 0).toString(8);
          break;

        case 's':
          arg = String(arg);
          arg = ph.precision ? arg.substring(0, ph.precision) : arg;
          break;

        case 't':
          arg = String(!!arg);
          arg = ph.precision ? arg.substring(0, ph.precision) : arg;
          break;

        case 'T':
          arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
          arg = ph.precision ? arg.substring(0, ph.precision) : arg;
          break;

        case 'u':
          arg = parseInt(arg, 10) >>> 0;
          break;

        case 'v':
          arg = arg.valueOf();
          arg = ph.precision ? arg.substring(0, ph.precision) : arg;
          break;

        case 'x':
          arg = (parseInt(arg, 10) >>> 0).toString(16);
          break;

        case 'X':
          arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
          break;
      }

      if (re.json.test(ph.type)) {
        output += arg;
      } else {
        if (re.number.test(ph.type) && (!isPositive || ph.sign)) {
          sign = isPositive ? '+' : '-';
          arg = arg.toString().replace(re.sign, '');
        } else {
          sign = '';
        }

        padCharacter = ph.padChar ? ph.padChar === '0' ? '0' : ph.padChar.charAt(1) : ' ';
        padLength = ph.width - (sign + arg).length;
        pad = ph.width ? padLength > 0 ? (0, _lodash.repeat)(padCharacter, padLength) : '' : '';
        output += ph.align ? sign + arg + pad : padCharacter === '0' ? sign + pad + arg : pad + sign + arg;
      }
    }
  }

  return output;
  /* eslint-enable default-case, no-bitwise, no-nested-ternary */
}
/**
 * Cache used by sprintfParse
 * @private
 */


var sprintfParseCache = Object.create(null);
/**
 * Creates an AST of fmt.
 *
 * @param {String} fmt - The target string.
 * @returns {Array} An AST of fmt.
 * @private
 */

function sprintfParse(fmt) {
  if (sprintfParseCache[fmt]) {
    return sprintfParseCache[fmt];
  }

  var current = fmt;
  var match;
  var argNames = 0;
  var parseTree = [];

  while (current) {
    /* eslint-disable no-cond-assign, no-bitwise */
    if ((match = re.text.exec(current)) !== null) {
      parseTree.push(match[0]);
    } else if ((match = re.modulo.exec(current)) !== null) {
      parseTree.push('%');
    } else if ((match = re.placeholder.exec(current)) !== null) {
      if (match[2]) {
        argNames |= 1;
        var replacementField = match[2];
        var fieldMatch = [];
        var fieldList = [];

        if ((fieldMatch = re.key.exec(replacementField)) !== null) {
          fieldList.push(fieldMatch[1]);

          while ((replacementField = replacementField.substring(fieldMatch[0].length)) !== '') {
            if ((fieldMatch = re.keyAccess.exec(replacementField)) !== null) {
              fieldList.push(fieldMatch[1]);
            } else if ((fieldMatch = re.indexAccess.exec(replacementField)) !== null) {
              fieldList.push(fieldMatch[1]);
            } else {
              throw new SyntaxError('[sprintf] failed to parse named argument key');
            }
          }
        } else {
          throw new SyntaxError('[sprintf] failed to parse named argument key');
        }

        match[2] = fieldList;
      } else {
        argNames |= 2;
      }

      if (argNames === 3) {
        throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported');
      }

      parseTree.push({
        placeholder: match[0],
        paramNo: match[1],
        keys: match[2],
        sign: match[3],
        padChar: match[4],
        align: match[5],
        width: match[6],
        precision: match[7],
        type: match[8]
      });
    } else {
      throw new SyntaxError('[sprintf] unexpected placeholder');
    }

    current = current.substring(match[0].length);
    /* eslint-enable no-cond-assign, no-bitwise */
  }

  return sprintfParseCache[fmt] = parseTree;
}