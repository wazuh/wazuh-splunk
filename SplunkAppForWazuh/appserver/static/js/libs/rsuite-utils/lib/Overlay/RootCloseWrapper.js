'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var _domLib = require('dom-lib');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isLeftClickEvent(event) {
  return (0, _get3.default)(event, 'button') === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || (0, _get3.default)(event, 'shiftKey'));
}

var RootCloseWrapper = function (_React$Component) {
  _inherits(RootCloseWrapper, _React$Component);

  function RootCloseWrapper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RootCloseWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RootCloseWrapper.__proto__ || Object.getPrototypeOf(RootCloseWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.onDocumentClickListener = null, _this.onDocumentKeyupListener = null, _this.handleDocumentClick = function (event) {
      /* eslint-disable */
      if ((0, _domLib.contains)((0, _reactDom.findDOMNode)(_this), event.target)) {
        return;
      }
      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }

      var target = _this.props.target;

      if (target) {
        if ((0, _domLib.contains)(target(), event.target)) {
          return;
        }
      }

      var onRootClose = _this.props.onRootClose;

      onRootClose && onRootClose();
    }, _this.handleDocumentKeyUp = function (event) {
      if (event.keyCode === 27) {
        var _onRootClose = _this.props.onRootClose;

        _onRootClose && _onRootClose();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RootCloseWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.bindRootCloseHandlers();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unbindRootCloseHandlers();
    }
  }, {
    key: 'bindRootCloseHandlers',
    value: function bindRootCloseHandlers() {
      var doc = window.document;
      this.onDocumentClickListener = (0, _domLib.on)(doc, 'click', this.handleDocumentClick);
      this.onDocumentKeyupListener = (0, _domLib.on)(doc, 'keyup', this.handleDocumentKeyUp);
    }
  }, {
    key: 'unbindRootCloseHandlers',
    value: function unbindRootCloseHandlers() {
      if (this.onDocumentClickListener) {
        this.onDocumentClickListener.off();
      }

      if (this.onDocumentKeyupListener) {
        this.onDocumentKeyupListener.off();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return RootCloseWrapper;
}(React.Component);

RootCloseWrapper.handledProps = ['children', 'onRootClose', 'target'];
exports.default = RootCloseWrapper;