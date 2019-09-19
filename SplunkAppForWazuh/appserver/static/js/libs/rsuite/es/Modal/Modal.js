import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _inheritsLoose from "@babel/runtime/helpers/esm/inheritsLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import setDisplayName from 'recompose/setDisplayName';
import setStatic from 'recompose/setStatic';
import bindElementResize, { unbind as unbindElementResize } from 'element-resize-event';
import BaseModal from 'rsuite-utils/lib/Overlay/Modal';
import Bounce from 'rsuite-utils/lib/Animation/Bounce';
import { on, getHeight, isOverflowing, getScrollbarSize, ownerDocument } from 'dom-lib';
import { prefix, ReactChildren, defaultProps, createChainedFunction, createContext } from '../utils';
import ModalDialog from './ModalDialog';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalTitle from './ModalTitle';
import ModalFooter from './ModalFooter';
import { SIZE } from '../constants';
export var ModalContext = createContext(null);
var BACKDROP_TRANSITION_DURATION = 150;

var Modal =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Modal, _React$Component);

  function Modal(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.dialogRef = void 0;
    _this.modalRef = void 0;
    _this.windowResizeListener = null;
    _this.contentElement = null;

    _this.handleShow = function () {
      var dialogElement = _this.dialogRef.current;

      _this.updateModalStyles(dialogElement);

      _this.contentElement = dialogElement.querySelector("." + _this.addPrefix('content'));
      _this.windowResizeListener = on(window, 'resize', _this.handleResize);
      bindElementResize(_this.contentElement, _this.handleResize);
    };

    _this.handleHide = function () {
      _this.destroyEvent();
    };

    _this.handleDialogClick = function (event) {
      if (event.target !== event.currentTarget) {
        return;
      }

      var onHide = _this.props.onHide;
      onHide && onHide(event);
    };

    _this.handleResize = function () {
      _this.updateModalStyles(_this.dialogRef.current);
    };

    _this.addPrefix = function (name) {
      return prefix(_this.props.classPrefix)(name);
    };

    _this.state = {
      modalStyles: {},
      bodyStyles: {}
    };
    _this.dialogRef = React.createRef();
    _this.modalRef = React.createRef();
    return _this;
  }

  var _proto = Modal.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.destroyEvent();
  };

  _proto.getStyles = function getStyles(dialogElement) {
    var _this$props = this.props,
        container = _this$props.container,
        overflow = _this$props.overflow,
        drawer = _this$props.drawer;
    var node = dialogElement || this.dialogRef.current;
    var doc = ownerDocument(node);
    var scrollHeight = node ? node.scrollHeight : 0;
    var bodyIsOverflowing = isOverflowing(container || doc.body);
    var modalIsOverflowing = scrollHeight > doc.documentElement.clientHeight;
    var styles = {
      modalStyles: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : 0,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? getScrollbarSize() : 0
      },
      bodyStyles: {}
    };

    if (!overflow) {
      return styles;
    }

    var bodyStyles = {
      overflow: 'auto'
    };

    if (node) {
      // default margin
      var headerHeight = 46;
      var footerHeight = 46;
      var contentHeight = 30;
      var headerDOM = node.querySelector("." + this.addPrefix('header'));
      var footerDOM = node.querySelector("." + this.addPrefix('footer'));
      var contentDOM = node.querySelector("." + this.addPrefix('content'));
      headerHeight = headerDOM ? getHeight(headerDOM) + headerHeight : headerHeight;
      footerHeight = footerDOM ? getHeight(footerDOM) + headerHeight : headerHeight;
      contentHeight = contentDOM ? getHeight(contentDOM) + contentHeight : contentHeight;

      if (drawer) {
        bodyStyles.height = contentHeight - (headerHeight + footerHeight);
      } else {
        /**
         * Header height + Footer height + Dialog margin
         */
        var excludeHeight = headerHeight + footerHeight + 60;
        var bodyHeight = getHeight(window) - excludeHeight;
        var maxHeight = scrollHeight >= bodyHeight ? bodyHeight : scrollHeight;
        bodyStyles.maxHeight = maxHeight;
      }
    }

    styles.bodyStyles = bodyStyles;
    return styles;
  };

  _proto.destroyEvent = function destroyEvent() {
    if (this.windowResizeListener) {
      this.windowResizeListener.off();
    }

    if (this.contentElement) {
      unbindElementResize(this.contentElement);
    }
  };

  _proto.updateModalStyles = function updateModalStyles(dialogElement) {
    this.setState(this.getStyles(dialogElement));
  };

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props2 = this.props,
        className = _this$props2.className,
        children = _this$props2.children,
        dialogClassName = _this$props2.dialogClassName,
        backdropClassName = _this$props2.backdropClassName,
        dialogStyle = _this$props2.dialogStyle,
        animation = _this$props2.animation,
        classPrefix = _this$props2.classPrefix,
        style = _this$props2.style,
        show = _this$props2.show,
        size = _this$props2.size,
        full = _this$props2.full,
        dialogComponentClass = _this$props2.dialogComponentClass,
        animationProps = _this$props2.animationProps,
        animationTimeout = _this$props2.animationTimeout,
        onHide = _this$props2.onHide,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["className", "children", "dialogClassName", "backdropClassName", "dialogStyle", "animation", "classPrefix", "style", "show", "size", "full", "dialogComponentClass", "animationProps", "animationTimeout", "onHide"]);

    var _this$state = this.state,
        modalStyles = _this$state.modalStyles,
        bodyStyles = _this$state.bodyStyles;
    var inClass = {
      in: show && !animation
    };
    var Dialog = dialogComponentClass;

    var parentProps = _.pick(rest, _.get(BaseModal, 'handledProps'));

    var items = null;

    if (children) {
      items = ReactChildren.mapCloneElement(children, function (child) {
        var displayName = child.type.displayName;

        if (displayName && displayName.indexOf('Body') !== -1) {
          return {
            style: bodyStyles
          };
        }

        return null;
      });
    }

    var classes = classNames(this.addPrefix(size), className, (_classNames = {}, _classNames[this.addPrefix('full')] = full, _classNames));
    var modal = React.createElement(Dialog, _extends({}, _.pick(rest, Object.keys(ModalDialog.propTypes || {})), {
      style: _extends({}, modalStyles, {}, style),
      classPrefix: classPrefix,
      className: classes,
      dialogClassName: dialogClassName,
      dialogStyle: dialogStyle,
      onClick: rest.backdrop === true ? this.handleDialogClick : null,
      dialogRef: this.dialogRef
    }), items);
    return React.createElement(ModalContext.Provider, {
      value: {
        onModalHide: onHide
      }
    }, React.createElement(BaseModal, _extends({
      ref: this.modalRef,
      show: show,
      onHide: onHide,
      className: this.addPrefix('wrapper'),
      onEntering: createChainedFunction(this.handleShow, this.props.onEntering),
      onExited: createChainedFunction(this.handleHide, this.props.onExited),
      backdropClassName: classNames(this.addPrefix('backdrop'), backdropClassName, inClass),
      containerClassName: classNames(this.addPrefix('open'), (_classNames2 = {}, _classNames2[this.addPrefix('has-backdrop')] = rest.backdrop, _classNames2)),
      transition: animation ? animation : undefined,
      animationProps: animationProps,
      dialogTransitionTimeout: animationTimeout,
      backdropTransitionTimeout: BACKDROP_TRANSITION_DURATION
    }, parentProps), modal));
  };

  return Modal;
}(React.Component);

Modal.propTypes = {
  classPrefix: PropTypes.string,
  size: PropTypes.oneOf(SIZE),
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onRendered: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  dialogClassName: PropTypes.string,
  backdropClassName: PropTypes.string,
  style: PropTypes.object,
  dialogStyle: PropTypes.object,
  backdropStyle: PropTypes.object,
  show: PropTypes.bool,
  full: PropTypes.bool,
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  keyboard: PropTypes.bool,
  transition: PropTypes.elementType,
  dialogTransitionTimeout: PropTypes.number,
  backdropTransitionTimeout: PropTypes.number,
  autoFocus: PropTypes.bool,
  enforceFocus: PropTypes.bool,
  overflow: PropTypes.bool,
  drawer: PropTypes.bool,
  dialogComponentClass: PropTypes.elementType,
  animation: PropTypes.any,
  animationProps: PropTypes.object,
  animationTimeout: PropTypes.number,
  onEscapeKeyUp: PropTypes.func,
  onBackdropClick: PropTypes.func,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
};
Modal.defaultProps = {
  size: 'sm',
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  animation: Bounce,
  animationTimeout: 300,
  dialogComponentClass: ModalDialog,
  overflow: true
};
var EnhancedModal = defaultProps({
  classPrefix: 'modal'
})(Modal);
setStatic('Body', ModalBody)(EnhancedModal);
setStatic('Header', ModalHeader)(EnhancedModal);
setStatic('Title', ModalTitle)(EnhancedModal);
setStatic('Footer', ModalFooter)(EnhancedModal);
setStatic('Dialog', ModalDialog)(EnhancedModal);
export default setDisplayName('Modal')(EnhancedModal);