'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domLib = require('dom-lib');

var _utils = require('./utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_React$PureComponent) {
  _inherits(Row, _React$PureComponent);

  function Row() {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
  }

  _createClass(Row, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          width = _props.width,
          height = _props.height,
          top = _props.top,
          style = _props.style,
          isHeaderRow = _props.isHeaderRow,
          headerHeight = _props.headerHeight,
          rowRef = _props.rowRef,
          classPrefix = _props.classPrefix,
          rest = _objectWithoutProperties(_props, ['className', 'width', 'height', 'top', 'style', 'isHeaderRow', 'headerHeight', 'rowRef', 'classPrefix']);

      var addPrefix = (0, _utils.prefix)(classPrefix);
      var classes = (0, _classnames2.default)(classPrefix, className, _defineProperty({}, addPrefix('header'), isHeaderRow));

      var styles = _extends({
        minWidth: width,
        height: isHeaderRow ? headerHeight : height
      }, style);
      (0, _domLib.translateDOMPositionXY)(styles, 0, top);

      var unhandled = (0, _utils.getUnhandledProps)(Row, rest);

      return React.createElement('div', _extends({}, unhandled, { ref: rowRef, className: classes, style: styles }));
    }
  }]);

  return Row;
}(React.PureComponent);

Row.defaultProps = {
  classPrefix: (0, _utils.defaultClassPrefix)('table-row'),
  height: 46,
  headerHeight: 40,
  isHeaderRow: false
};
Row.handledProps = ['className', 'classPrefix', 'headerHeight', 'height', 'isHeaderRow', 'rowRef', 'style', 'top', 'width'];
Row.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  headerHeight: _propTypes2.default.number,
  top: _propTypes2.default.number,
  isHeaderRow: _propTypes2.default.bool,
  rowRef: function rowRef() {
    return (typeof (React.ElementRef == null ? {} : React.ElementRef) === 'function' ? _propTypes2.default.instanceOf(React.ElementRef == null ? {} : React.ElementRef) : _propTypes2.default.any).apply(this, arguments);
  },
  className: _propTypes2.default.string,
  classPrefix: _propTypes2.default.string,
  style: _propTypes2.default.object
};
exports.default = Row;