// @flow

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { ownerDocument, canUseDom, activeElement, contains, getContainer, on } from 'dom-lib';
import { polyfill } from 'react-lifecycles-compat';

import Portal from './Portal';
import ModalManager from './ModalManager';
import RefHolder from './RefHolder';
import type {
  AnimationEventFunction,
  DefaultEventFunction,
  DefaultEvent,
  ReactFindDOMNode
} from '../utils/TypeDefinition';

import { Fade } from '../Animation';

type Props = {
  /** Portal Props */
  container?: HTMLElement | (() => HTMLElement),
  onRendered?: Function,
  children?: React.Node,

  /** Transition Props */
  transition: React.ElementType,
  onEnter?: AnimationEventFunction,
  onEntering?: AnimationEventFunction,
  onEntered?: AnimationEventFunction,
  onExit?: AnimationEventFunction,
  onExiting?: AnimationEventFunction,
  onExited?: AnimationEventFunction,

  show?: boolean,
  onShow?: DefaultEventFunction,
  onHide?: DefaultEventFunction,
  backdrop?: boolean | 'static',
  onEscapeKeyUp?: DefaultEventFunction,
  onBackdropClick?: DefaultEventFunction,
  backdropStyle?: Object,
  backdropClassName?: string,
  containerClassName?: string,
  keyboard?: boolean,

  dialogTransitionTimeout?: number,
  backdropTransitionTimeout?: number,
  autoFocus?: boolean,
  enforceFocus?: boolean,

  role?: string,
  style?: Object,
  className?: string,
  animationProps?: Object
};

type States = {
  exited?: boolean
};

const modalManager = new ModalManager();
const noop = () => {};

class Modal extends React.Component<Props, States> {
  static manager = modalManager;
  static defaultProps = {
    backdrop: true,
    keyboard: true,
    autoFocus: true,
    enforceFocus: true,
    onHide: noop
  };

  constructor(props: Props) {
    super(props);
    this.state = { exited: !props.show };
  }
  componentDidMount() {
    if (this.props.show) {
      this.onShow();
    }
  }

  static getDerivedStateFromProps(nextProps: Props) {
    if (nextProps.show) {
      return { exited: false };
    } else if (!nextProps.transition) {
      // Otherwise let handleHidden take care of marking exited.
      return { exited: true };
    }
    return null;
  }

  getSnapshotBeforeUpdate(prevProps: Props) {
    if (this.props.show && !prevProps.show) {
      this.checkForFocus();
    }
    return null;
  }

  componentDidUpdate(prevProps: Props) {
    const { transition } = this.props;

    if (prevProps.show && !this.props.show && !transition) {
      // Otherwise handleHidden will call this.
      this.onHide();
    } else if (!prevProps.show && this.props.show) {
      this.onShow();
    }
  }

  componentWillUnmount() {
    const { show, transition } = this.props;

    if (show || (transition && !this.state.exited)) {
      this.onHide();
    }
  }

  onShow() {
    const doc = ownerDocument(this);
    const container = getContainer(this.props.container, doc.body);
    const { containerClassName } = this.props;

    modalManager.add(this, container, containerClassName);

    this.onDocumentKeyupListener = on(doc, 'keyup', this.handleDocumentKeyUp);
    this.onFocusinListener = on(doc, 'focus', this.enforceFocus);

    if (this.props.onShow) {
      this.props.onShow();
    }
  }

  onHide() {
    modalManager.remove(this);

    if (this.onDocumentKeyupListener) {
      this.onDocumentKeyupListener.off();
    }

    if (this.onFocusinListener) {
      this.onFocusinListener.off();
    }

    this.restoreLastFocus();
  }

  onDocumentKeyupListener = null;
  onFocusinListener = null;

  getDialogElement(): ReactFindDOMNode {
    return findDOMNode(this.dialog);
  }

  setMountNodeRef = (ref: React.ElementRef<*>) => {
    this.mountNode = ref ? ref.getMountNode() : ref;
  };

  setModalNodeRef = (ref: React.ElementRef<*>) => {
    this.modalNode = ref;
  };

  setDialogRef = (ref: React.ElementRef<*>) => {
    this.dialog = ref;
  };

  isTopModal() {
    return modalManager.isTopModal(this);
  }

  handleHidden = (...args: Array<any>) => {
    this.setState({ exited: true });
    this.onHide();
    const { onExited } = this.props;

    onExited && onExited(...args);
  };

  handleBackdropClick = (event: DefaultEvent) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    const { onBackdropClick, backdrop, onHide } = this.props;

    onBackdropClick && onBackdropClick(event);
    backdrop && onHide && onHide();
  };

  handleDocumentKeyUp = (event: DefaultEvent) => {
    const { keyboard, onHide, onEscapeKeyUp } = this.props;
    if (keyboard && event.keyCode === 27 && this.isTopModal()) {
      onEscapeKeyUp && onEscapeKeyUp(event);
      onHide && onHide();
    }
  };

  checkForFocus() {
    if (canUseDom) {
      this.lastFocus = activeElement();
    }
  }

  restoreLastFocus() {
    // Support: <=IE11 doesn't support `focus()` on svg elements
    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus.focus();
      this.lastFocus = null;
    }
  }

  enforceFocus = () => {
    let { enforceFocus } = this.props;

    if (!enforceFocus || !this.isTopModal()) {
      return;
    }

    let active = activeElement(ownerDocument(this));
    let modal = this.getDialogElement();

    if (modal && modal !== active && !contains(modal, active)) {
      modal.focus();
    }
  };

  mountNode = null;
  modalNode = null;
  backdrop = null;
  dialog = null;
  lastFocus = null;

  bindBackdropRef = (ref: React.ElementRef<*>) => {
    this.backdrop = ref;
  };

  renderBackdrop() {
    const {
      transition,
      backdrop,
      backdropTransitionTimeout,
      backdropStyle,
      backdropClassName
    } = this.props;

    let backdropNode = (
      <div
        ref={this.bindBackdropRef}
        style={backdropStyle}
        className={backdropClassName}
        onClick={backdrop === true ? this.handleBackdropClick : undefined}
        role="button"
        tabIndex={-1}
      />
    );

    if (transition) {
      backdropNode = (
        <Fade transitionAppear in={this.props.show} timeout={backdropTransitionTimeout}>
          {backdropNode}
        </Fade>
      );
    }

    return backdropNode;
  }

  render() {
    let {
      children,
      transition: Transition,
      backdrop,
      dialogTransitionTimeout,
      style,
      className,
      container,
      animationProps,
      ...rest
    } = this.props;

    const { onExit, onExiting, onEnter, onEntering, onEntered } = rest;
    const show = !!rest.show;
    const mountModal = show || (Transition && !this.state.exited);

    if (!mountModal) {
      return null;
    }

    let dialog = React.Children.only(children);
    const { role, tabIndex } = dialog.props;

    if (role === undefined || tabIndex === undefined) {
      dialog = React.cloneElement(dialog, {
        role: role === undefined ? 'document' : role,
        tabIndex: tabIndex === null ? '-1' : tabIndex
      });
    }

    if (Transition) {
      dialog = (
        <Transition
          {...animationProps}
          transitionAppear
          unmountOnExit
          in={show}
          timeout={dialogTransitionTimeout}
          onExit={onExit}
          onExiting={onExiting}
          onExited={this.handleHidden}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
        >
          {dialog}
        </Transition>
      );
    }

    return (
      <Portal ref={this.setMountNodeRef} container={container}>
        <div
          ref={this.setModalNodeRef}
          role={rest.role || 'dialog'}
          style={style}
          className={className}
        >
          {backdrop && this.renderBackdrop()}
          <RefHolder ref={this.setDialogRef}>{dialog}</RefHolder>
        </div>
      </Portal>
    );
  }
}

polyfill(Modal);

export default Modal;
