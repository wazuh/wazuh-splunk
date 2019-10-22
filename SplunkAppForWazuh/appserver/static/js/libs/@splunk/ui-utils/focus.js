"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSortedTabbableElements = getSortedTabbableElements;
exports.handleTab = handleTab;
exports.takeFocus = takeFocus;

var _keyboard = require("@splunk/ui-utils/keyboard");

var _lodash = require("lodash");

/**
 * @file
 * Utilities for managing focus in the browser.
 */
var tabbableSelectors = "a[href], input:not([disabled]), select:not([disabled]),\n     textarea:not([disabled]), button:not([disabled]), [tabindex], [contenteditable]";

var isHidden = function isHidden(element) {
  return !(element.offsetWidth || element.offsetHeight || element.getClientRects().length > 0) || getComputedStyle(element).visibility === 'hidden';
};
/**
 * Sorts the tabbable elements in the provided container.
 *
 * @param {Element} container - The target container.
 * @returns {Element[]}
 * @public
 */


function getSortedTabbableElements(container) {
  var elems = container.querySelectorAll(tabbableSelectors);
  var tabbableElems = (0, _lodash.filter)(elems, function (el) {
    return !isHidden(el) && el.tabIndex >= 0 || el === document.activeElement;
  });
  return (0, _lodash.sortBy)(tabbableElems, function (el) {
    if (el.tabIndex > 0) {
      return -1 / el.tabIndex;
    }

    return 0;
  });
}
/**
 * A key event handler that moves focus among tabbable elements within a container.
 *
 * @param {Element} container - The target container.
 * @param {Event} event - The key event to handle.
 * @returns {Element|null} The element focus was applied to or `null` if focus was not applied.
 * @public
 */


function handleTab(container, event) {
  // Ignore events bubbling up from portals
  if (!container.contains(document.activeElement)) {
    return null;
  } // Ensure this is a valid event


  if ((0, _keyboard.keycode)(event) !== 'tab' || event.metaKey || event.altKey || event.controlKey) {
    return null;
  }

  var tabbableElements = getSortedTabbableElements(container);

  if (tabbableElements.length === 0) {
    // if the container is focused, don't allow the focus to leave.
    if (document.activeElement === container) {
      event.preventDefault();
      return container;
    }

    return null;
  } // Find the current index or set default.


  var currentElement = event && event.target || container.querySelector(':focus');
  var currentIndex = tabbableElements.indexOf(currentElement);

  if (currentIndex === -1) {
    currentIndex = event.shiftKey ? 0 : tabbableElements.length - 1;
  } // Shift the array instead of the current index.


  if (event.shiftKey) {
    tabbableElements.unshift(tabbableElements.pop()); // move last to first
  } else {
    tabbableElements.push(tabbableElements.shift()); // move first to last
  } // Focus


  event.preventDefault();
  tabbableElements[currentIndex].focus();
  return tabbableElements[currentIndex];
}
/**
 * A helper method that will focus on the first focusable element in a container.
 * If a contained element already has focus, focus will not shift.
 *
 * @param {Element} container - The container that should take focus.
 * @param {String} [defaultElement='first'] - The target of focus, either 'first' or 'container'.
 * @returns {Element|null} The element that was focused, or null if no element was focused.
 * @public
 */


function takeFocus(container) {
  var defaultElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'first';
  var currentElement = container.querySelector(':focus');

  if (currentElement) {
    return currentElement;
  }

  if (defaultElement === 'first') {
    var targetEl = getSortedTabbableElements(container)[0];

    if (targetEl) {
      (0, _lodash.defer)(function () {
        return targetEl.focus();
      });
      return targetEl;
    }
  }

  if (container.hasAttribute('tabIndex')) {
    (0, _lodash.defer)(function () {
      return container.focus();
    });
    return container;
  }

  return null;
}