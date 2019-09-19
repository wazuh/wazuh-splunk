'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function execCommandCopy() {
  var succeeded = void 0;
  try {
    succeeded = document.execCommand('copy');
  } catch (err) {
    succeeded = false;
  }
  return succeeded;
}

function select(input) {
  var selectedText = void 0;
  var isReadOnly = input.hasAttribute('readonly');
  if (!isReadOnly) {
    input.setAttribute('readonly', '');
  }
  input.select();
  input.setSelectionRange(0, input.value.length);
  if (!isReadOnly) {
    input.removeAttribute('readonly');
  }
  selectedText = input.value;
  return selectedText;
}

function copy(text) {
  var _fakeElemStyle;

  var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  var fakeElem = document.createElement('textarea');
  var yPosition = window.pageYOffset || document.documentElement.scrollTop;
  var fakeElemStyle = (_fakeElemStyle = {
    // Prevent zooming on iOS
    fontSize: '12pt',
    // Reset box model
    border: '0',
    padding: '0',
    margin: '0',
    // Move element out of screen horizontally
    position: 'absolute'
  }, _defineProperty(_fakeElemStyle, isRTL ? 'right' : 'left', '-9999px'), _defineProperty(_fakeElemStyle, 'top', yPosition + 'px'), _fakeElemStyle);
  Object.keys(fakeElemStyle).forEach(function (key) {
    fakeElem.style[key] = fakeElemStyle[key];
  });

  fakeElem.setAttribute('readonly', '');
  fakeElem.value = text;
  document.body.appendChild(fakeElem);
  select(fakeElem);
  var result = execCommandCopy();
  document.body.removeChild(fakeElem);
  return result;
}

exports.default = copy;