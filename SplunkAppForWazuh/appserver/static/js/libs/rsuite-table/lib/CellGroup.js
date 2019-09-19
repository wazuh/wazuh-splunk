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

var CellGroup = function (_React$PureComponent) {
  _inherits(CellGroup, _React$PureComponent);

  function CellGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CellGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CellGroup.__proto__ || Object.getPrototypeOf(CellGroup)).call.apply(_ref, [this].concat(args))), _this), _this.addPrefix = function (name) {
      return (0, _utils.prefix)(_this.props.classPrefix)(name);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CellGroup, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          fixed = _props.fixed,
          width = _props.width,
          left = _props.left,
          height = _props.height,
          style = _props.style,
          classPrefix = _props.classPrefix,
          className = _props.className,
          rest = _objectWithoutProperties(_props, ['fixed', 'width', 'left', 'height', 'style', 'classPrefix', 'className']);

      var classes = (0, _classnames2.default)(classPrefix, className, (_classNames = {}, _defineProperty(_classNames, this.addPrefix('fixed-' + (fixed || '')), fixed), _defineProperty(_classNames, this.addPrefix('scroll'), !fixed), _classNames));
      var styles = _extends({
        width: width,
        height: height
      }, style);
      var unhandled = (0, _utils.getUnhandledProps)(CellGroup, rest);

      (0, _domLib.translateDOMPositionXY)(styles, left, 0);

      return React.createElement('div', _extends({}, unhandled, { className: classes, style: styles }));
    }
  }]);

  return CellGroup;
}(React.PureComponent);

CellGroup.defaultProps = {
  classPrefix: (0, _utils.defaultClassPrefix)('table-cell-group')
};
CellGroup.handledProps = ['className', 'classPrefix', 'fixed', 'height', 'left', 'style', 'width'];
CellGroup.propTypes = {
  fixed: _propTypes2.default.oneOf(['left', 'right']),
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  left: _propTypes2.default.number,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  classPrefix: _propTypes2.default.string
};
exports.default = CellGroup;