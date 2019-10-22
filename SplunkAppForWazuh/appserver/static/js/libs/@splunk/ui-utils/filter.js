"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringToKeywords = stringToKeywords;
exports.testPhrase = testPhrase;
exports.keywordLocationsAll = keywordLocationsAll;
exports.keywordLocations = keywordLocations;
exports.filterByKeywords = filterByKeywords;

var _lodash = require("lodash");

/**
 * @file
 * A set of functions for filtering items, often menu items. For simple use cases,
 * use `filterByKeywords`. `stringToKeywords` and `testPhrase` should be used when more control
 * of the filtering is necessary.
 */

/**
 * Converts a string (filterPhrase) to an array of keyword tokens. Tokens are usually words, but may
 * be a multi-word phrase if quotes are used. The output is suitable for the `testPhrase` function.
 *
 * @param {String} filterPhrase - The phrase to be broken into keywork tokens.
 * @returns {String[]}
 * @public
 */
function stringToKeywords(filterPhrase) {
  if (!(0, _lodash.isString)(filterPhrase)) {
    return [];
  }

  return (filterPhrase.match(/(?:[^\s"]+|"[^"]*")+/g) || []).map(function (word) {
    return word.replace(/^"(.*)"$/, '$1').toLowerCase();
  });
}
/**
 * Tests if a phrase matches a list of keywords. All keywords must be included in the phrase for a
 * match.
 *
 * Examples:
 * ```js
 * stringToKeywords('Named Bob'); // ['Named', 'Bob']
 * stringToKeywords('"Named Bob"'); // ['Named Bob']
 * stringToKeywords('A Street Cat "Named Bob"'); // ['A', 'Street', 'Cat', 'Named Bob']
 * ```
 *
 * @param {String} phrase - The test phrase.
 * @param {String[]} keywords - An array of keywords, as returned by `stringToKeywords`.
 * @returns {Boolean}
 * @public
 */


function testPhrase(phrase, keywords) {
  if (!(0, _lodash.isString)(phrase)) {
    return false;
  }

  var p = phrase.toLowerCase();
  return keywords.every(function (keyword) {
    return (0, _lodash.includes)(p, keyword);
  });
}
/**
 * Looks for keyword locations in a phrase. Not all keywords need to match for results to be returned.
 *
 * @param {String} phrase - The test phrase.
 * @param {String[]} keywords - An array of keywords, as returned by `stringToKeywords`.
 * @returns {Object[] | false} An array of matches with keyword, start index, and end index. Array is sorted
 * by start and end index. Keyword
 * ranges may overlap. Example:
 * ```js
 * [
 *     {
 *         keyword: 'the dash',
 *         start: 0,
 *         end: 8,
 *     },
 *     {
 *         keyword: 'sales',
 *         start: 12,
 *         end: 17,
 *     },
 * ]
 * ```
 * @private
 */


function keywordLocationsAll(phrase, keywords) {
  if (!(0, _lodash.isString)(phrase) || !keywords || !keywords.length) {
    return false;
  }

  var p = phrase.toLowerCase();
  var matches = keywords.reduce(function (acc, keyword) {
    var start = p.indexOf(keyword);

    if (start >= 0) {
      acc.push({
        keyword: keyword,
        start: start,
        end: start + keyword.length
      });
    }

    return acc;
  }, []).sort(function (a, b) {
    if (a.start !== b.start) {
      return a.start > b.start ? 1 : -1;
    }

    return a.end > b.end ? 1 : -1;
  });
  return matches;
}
/**
 * Looks for keyword locations in a phrase and return portions of the string that match one or more
 * keywords. The return value can be used to highlight the matched text.
 *
 * @param {String} phrase - The test phrase.
 * @param {String[]} keywords - An array of keywords, as returned by `stringToKeywords`.
 * @returns {Object[] | false} An array of location with start index, and end index. Keyword
 * ranges may overlap. Example:
 * ```js
 * [
 *     {
 *         start: 0,
 *         end: 8,
 *     },
 *     {
 *         start: 12,
 *         end: 17,
 *     },
 * ]
 * ```
 * @public
 */


function keywordLocations(phrase, keywords) {
  var matches = keywordLocationsAll(phrase, keywords);

  if (!matches || matches.length !== keywords.length) {
    return false;
  }

  var _matches$ = matches[0],
      start = _matches$.start,
      end = _matches$.end;
  var locations = [];

  function pushLocation() {
    locations.push({
      start: start,
      end: end
    });
  }

  matches.slice(1).forEach(function (match) {
    if (match.start > end) {
      pushLocation();
      start = match.start;
      end = match.end;
    } else if (match.end > end) {
      end = match.end;
    }
  });
  pushLocation();
  return locations;
}
/**
 * Filters an array of `items` against the `filterPhrase`.
 *
 * @param {Array} items - An array of strings or objects to filter.
 * @param {String} filterPhrase
 * @param {Function} [valueGetter] - An optional function that returns the property of interest if
 * filtering an array of objects.
 * @returns {Array} A filtered list of items.
 * @public
 */


function filterByKeywords(items, filterPhrase) {
  var valueGetter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (item) {
    return item;
  };
  var keywords = stringToKeywords(filterPhrase);
  return items.filter(function (item) {
    return testPhrase(valueGetter(item), keywords);
  });
}