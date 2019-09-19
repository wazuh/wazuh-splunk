'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var _domLib = require('dom-lib');

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _ModalManager = require('./ModalManager');

var _ModalManager2 = _interopRequireDefault(_ModalManager);

var _RefHolder = require('./RefHolder');

var _RefHolder2 = _interopRequireDefault(_RefHolder);

var _Animation = require('../Animation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var modalManager = new _ModalManager2.default();
var noop = function noop() {};

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.onDocumentKeyupListener = null;
    _this.onFocusinListener = null;

    _this.setMountNodeRef = function (ref) {
      _this.mountNode = ref ? ref.getMountNode() : ref;
    };

    _this.setModalNodeRef = function (ref) {
      _this.modalNode = ref;
    };

    _this.setDialogRef = function (ref) {
      _this.dialog = ref;
    };

    _this.handleHidden = function () {
      _this.setState({ exited: true });
      _this.onHide();
      var onExited = _this.props.onExited;


      onExited && onExited.apply(undefined, arguments);
    };

    _this.handleBackdropClick = function (event) {
      if (event.target !== event.currentTarget) {
        return;
      }

      var _this$props = _this.props,
          onBackdropClick = _this$props.onBackdropClick,
          backdrop = _this$props.backdrop,
          onHide = _this$props.onHide;


      onBackdropClick && onBackdropClick(event);
      backdrop && onHide && onHide();
    };

    _this.handleDocumentKeyUp = function (event) {
      var _this$props2 = _this.props,
          keyboard = _this$props2.keyboard,
          onHide = _this$props2.onHide,
          onEscapeKeyUp = _this$props2.onEscapeKeyUp;

      if (keyboard && event.keyCode === 27 && _this.isTopModal()) {
        onEscapeKeyUp && onEscapeKeyUp(event);
        onHide && onHide();
      }
    };

    _this.enforceFocus = function () {
      var enforceFocus = _this.props.enforceFocus;


      if (!enforceFocus || !_this.isTopModal()) {
        return;
      }

      var active = (0, _domLib.activeElement)((0, _domLib.ownerDocument)(_this));
      var modal = _this.getDialogElement();

      if (modal && modal !== active && !(0, _domLib.contains)(modal, active)) {
        modal.focus();
      }
    };

    _this.mountNode = null;
    _this.modalNode = null;
    _this.backdrop = null;
    _this.dialog = null;
    _this.lastFocus = null;

    _this.bindBackdropRef = function (ref) {
      _this.backdrop = ref;
    };

    _this.state = { exited: !props.show };
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.show) {
        this.onShow();
      }
    }
  }, {
    key: 'getSnapshotBeforeUpdate',
    value: function getSnapshotBeforeUpdate(prevProps) {
      if (this.props.show && !prevProps.show) {
        this.checkForFocus();
      }
      return null;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var transition = this.props.transition;


      if (prevProps.show && !this.props.show && !transition) {
        // Otherwise handleHidden will call this.
        this.onHide();
      } else if (!prevProps.show && this.props.show) {
        this.onShow();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props = this.props,
          show = _props.show,
          transition = _props.transition;


      if (show || transition && !this.state.exited) {
        this.onHide();
      }
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      var doc = (0, _domLib.ownerDocument)(this);
      var container = (0, _domLib.getContainer)(this.props.container, doc.body);
      var containerClassName = this.props.containerClassName;


      modalManager.add(this, container, containerClassName);

      this.onDocumentKeyupListener = (0, _domLib.on)(doc, 'keyup', this.handleDocumentKeyUp);
      this.onFocusinListener = (0, _domLib.on)(doc, 'focus', this.enforceFocus);

      if (this.props.onShow) {
        this.props.onShow();
      }
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      modalManager.remove(this);

      if (this.onDocumentKeyupListener) {
        this.onDocumentKeyupListener.off();
      }

      if (this.onFocusinListener) {
        this.onFocusinListener.off();
      }

      this.restoreLastFocus();
    }
  }, {
    key: 'getDialogElement',
    value: function getDialogElement() {
      return (0, _reactDom.findDOMNode)(this.dialog);
    }
  }, {
    key: 'isTopModal',
    value: function isTopModal() {
      return modalManager.isTopModal(this);
    }
  }, {
    key: 'checkForFocus',
    value: function checkForFocus() {
      if (_domLib.canUseDom) {
        this.lastFocus = (0, _domLib.activeElement)();
      }
    }
  }, {
    key: 'restoreLastFocus',
    value: function restoreLastFocus() {
      // Support: <=IE11 doesn't support `focus()` on svg elements
      if (this.lastFocus && this.lastFocus.focus) {
        this.lastFocus.focus();
        this.lastFocus = null;
      }
    }
  }, {
    key: 'renderBackdrop',
    value: function renderBackdrop() {
      var _props2 = this.props,
          transition = _props2.transition,
          backdrop = _props2.backdrop,
          backdropTransitionTimeout = _props2.backdropTransitionTimeout,
          backdropStyle = _props2.backdropStyle,
          backdropClassName = _props2.backdropClassName;


      var backdropNode = React.createElement('div', {
        ref: this.bindBackdropRef,
        style: backdropStyle,
        className: backdropClassName,
        onClick: backdrop === true ? this.handleBackdropClick : undefined,
        role: 'button',
        tabIndex: -1
      });

      if (transition) {
        backdropNode = React.createElement(
          _Animation.Fade,
          { transitionAppear: true, 'in': this.props.show, timeout: backdropTransitionTimeout },
          backdropNode
        );
      }

      return backdropNode;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          children = _props3.children,
          Transition = _props3.transition,
          backdrop = _props3.backdrop,
          dialogTransitionTimeout = _props3.dialogTransitionTimeout,
          style = _props3.style,
          className = _props3.className,
          container = _props3.container,
          animationProps = _props3.animationProps,
          rest = _objectWithoutProperties(_props3, ['children', 'transition', 'backdrop', 'dialogTransitionTimeout', 'style', 'className', 'container', 'animationProps']);

      var onExit = rest.onExit,
          onExiting = rest.onExiting,
          onEnter = rest.onEnter,
          onEntering = rest.onEntering,
          onEntered = rest.onEntered;

      var show = !!rest.show;
      var mountModal = show || Transition && !this.state.exited;

      if (!mountModal) {
        return null;
      }

      var dialog = React.Children.only(children);
      var _dialog$props = dialog.props,
          role = _dialog$props.role,
          tabIndex = _dialog$props.tabIndex;


      if (role === undefined || tabIndex === undefined) {
        dialog = React.cloneElement(dialog, {
          role: role === undefined ? 'document' : role,
          tabIndex: tabIndex === null ? '-1' : tabIndex
        });
      }

      if (Transition) {
        dialog = React.createElement(
          Transition,
          _extends({}, animationProps, {
            transitionAppear: true,
            unmountOnExit: true,
            'in': show,
            timeout: dialogTransitionTimeout,
            onExit: onExit,
            onExiting: onExiting,
            onExited: this.handleHidden,
            onEnter: onEnter,
            onEntering: onEntering,
            onEntered: onEntered
          }),
          dialog
        );
      }

      return React.createElement(
        _Portal2.default,
        { ref: this.setMountNodeRef, container: container },
        React.createElement(
          'div',
          {
            ref: this.setModalNodeRef,
            role: rest.role || 'dialog',
            style: style,
            className: className
          },
          backdrop && this.renderBackdrop(),
          React.createElement(
            _RefHolder2.default,
            { ref: this.setDialogRef },
            dialog
          )
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps) {
      if (nextProps.show) {
        return { exited: false };
      } else if (!nextProps.transition) {
        // Otherwise let handleHidden take care of marking exited.
        return { exited: true };
      }
      return null;
    }
  }]);

  return Modal;
}(React.Component);

Modal.manager = modalManager;
Modal.defaultProps = {
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  onHide: noop
};
Modal.handledProps = ['animationProps', 'autoFocus', 'backdrop', 'backdropClassName', 'backdropStyle', 'backdropTransitionTimeout', 'children', 'className', 'container', 'containerClassName', 'dialogTransitionTimeout', 'enforceFocus', 'keyboard', 'onBackdropClick', 'onEnter', 'onEntered', 'onEntering', 'onEscapeKeyUp', 'onExit', 'onExited', 'onExiting', 'onHide', 'onRendered', 'onShow', 'role', 'show', 'style', 'transition'];


(0, _reactLifecyclesCompat.polyfill)(Modal);

exports.default = Modal;