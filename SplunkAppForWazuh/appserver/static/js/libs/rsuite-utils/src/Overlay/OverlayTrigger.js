// @flow

import * as React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import _ from 'lodash';

import Overlay from './Overlay';
import isNullOrUndefined from '../utils/isNullOrUndefined';
import createChainedFunction from '../utils/createChainedFunction';
import handleMouseOverOut from '../utils/handleMouseOverOut';
import isOneOf from '../utils/isOneOf';
import Portal from './Portal';

import type {
  Placement,
  DefaultEventFunction,
  DefaultEvent,
  TriggerName
} from '../utils/TypeDefinition';

const unsupportedCreatePortal = !ReactDOM.createPortal;

type Props = {
  target?: Function,
  container?: HTMLElement | (() => HTMLElement),
  containerPadding?: number,
  placement?: Placement,
  show?: boolean,
  rootClose?: boolean,
  onHide?: Function,
  transition?: React.ElementType,
  onEnter?: Function,
  onEntering?: Function,
  onEntered?: Function,
  onExit?: Function,
  onExiting?: Function,
  onExited?: Function,
  animation?: React.ElementType | boolean,
  trigger: TriggerName | Array<TriggerName>,
  delay?: number,
  delayShow?: number,
  delayHide?: number,
  defaultOpen?: boolean,
  open?: boolean,
  speaker: React.Element<any>,
  children: React.Node,
  onMouseOver?: DefaultEventFunction,
  onMouseOut?: DefaultEventFunction,
  onClick?: DefaultEventFunction,
  onBlur?: DefaultEventFunction,
  onFocus?: DefaultEventFunction,
  disabled?: boolean,
  preventOverflow?: boolean
};

type OverlayTriggerProps = {
  'aria-describedby': string,
  onMouseOver?: DefaultEventFunction,
  onMouseOut?: DefaultEventFunction,
  onBlur?: DefaultEventFunction,
  onClick?: DefaultEventFunction,
  onFocus?: DefaultEventFunction
};

type States = {
  isOverlayShown?: boolean,
  isOnSpeaker?: boolean
};

class OverlayTrigger extends React.Component<Props, States> {
  static defaultProps = {
    trigger: ['hover', 'focus'],
    delayHide: 200,
    placement: 'bottomStart',
    rootClose: true
  };

  constructor(props: Props) {
    super(props);

    this.handleMouseOver = (e: DefaultEvent) => handleMouseOverOut(this.handleDelayedShow, e);
    this.handleMouseOut = (e: DefaultEvent) => handleMouseOverOut(this.handleDelayedHide, e);

    this.state = {
      isOverlayShown: props.defaultOpen
    };
  }

  componentDidMount() {
    if (unsupportedCreatePortal) {
      this.mountNode = document.createElement('div');
      this.renderOverlay();
    }
  }

  componentDidUpdate() {
    if (unsupportedCreatePortal && this.mountNode) {
      this.renderOverlay();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.hoverShowDelay);
    clearTimeout(this.hoverHideDelay);

    if (unsupportedCreatePortal) {
      ReactDOM.unmountComponentAtNode(this.mountNode);
      this.mountNode = null;
    }
  }

  getOverlayTarget = () => findDOMNode(this); // eslint-disable-line react/no-find-dom-node

  getOverlay() {
    const { open, speaker, trigger, onHide } = this.props;

    const { isOverlayShown } = this.state;
    const overlayProps = {
      ..._.pick(this.props, Overlay.handledProps),
      show: _.isUndefined(open) ? isOverlayShown : open,
      target: this.getOverlayTarget
    };

    if (isOneOf('click', trigger)) {
      overlayProps.onHide = createChainedFunction(this.hide, onHide);
    } else if (isOneOf('active', trigger)) {
      overlayProps.onHide = createChainedFunction(this.hide, onHide);
    }

    const speakerProps: Object = {
      onMouseEnter: this.handleSpeakerMouseEnter,
      onMouseLeave: this.handleSpeakerMouseLeave,
      placement: overlayProps.placement
    };

    return <Overlay {...overlayProps}>{React.cloneElement(speaker, speakerProps)}</Overlay>;
  }

  speaker = null;
  handleMouseOver = null;
  handleMouseOut = null;
  hoverShowDelay: any = null;
  hoverHideDelay: any = null;
  target = null;
  mountNode = null;

  enterSpeaker = false;
  enterTrigger = false;

  handleSpeakerMouseEnter = () => {
    this.enterSpeaker = true;
  };

  handleSpeakerMouseLeave = () => {
    const { trigger } = this.props;
    this.enterSpeaker = false;
    if (!isOneOf('click', trigger) && !isOneOf('active', trigger)) {
      this.handleHide();
    }
  };

  hide = () => {
    this.setState({ isOverlayShown: false });
  };

  show = () => {
    this.setState({ isOverlayShown: true });
  };

  handleHide = () => {
    if (!this.enterSpeaker && !this.enterTrigger) {
      this.hide();
    }
  };

  handleToggle = () => {
    if (this.state.isOverlayShown) {
      this.handleHide();
    } else {
      this.show();
    }
  };

  handleDelayedShow = () => {
    const { delayShow, delay } = this.props;

    this.enterTrigger = true;
    if (!isNullOrUndefined(this.hoverHideDelay)) {
      clearTimeout(this.hoverHideDelay);
      this.hoverHideDelay = null;
      this.show();
      return;
    }

    if (this.state.isOverlayShown) {
      return;
    }

    const nextDelay = !isNullOrUndefined(delayShow) ? delayShow : delay;

    if (!nextDelay) {
      this.show();
      return;
    }

    this.hoverShowDelay = setTimeout(() => {
      this.hoverShowDelay = null;
      this.show();
    }, nextDelay);
  };

  handleDelayedHide = () => {
    const { delayHide, delay } = this.props;
    this.enterTrigger = false;
    if (!isNullOrUndefined(this.hoverShowDelay)) {
      clearTimeout(this.hoverShowDelay);
      this.hoverShowDelay = null;
      return;
    }

    if (!this.state.isOverlayShown || !isNullOrUndefined(this.hoverHideDelay)) {
      return;
    }

    const nextDelay = !isNullOrUndefined(delayHide) ? delayHide : delay;

    if (!nextDelay) {
      this.handleHide();
      return;
    }

    this.hoverHideDelay = setTimeout(() => {
      let { isOnSpeaker } = this.state;
      if (isOnSpeaker) {
        return;
      }
      clearTimeout(this.hoverHideDelay);
      this.hoverHideDelay = null;
      this.handleHide();
    }, nextDelay);
  };

  renderOverlay() {
    if (this.speaker) {
      ReactDOM.unstable_renderSubtreeIntoContainer(this, this.speaker, this.mountNode);
    }
  }

  render() {
    const {
      children,
      speaker,
      onClick,
      trigger,
      onMouseOver,
      onMouseOut,
      onFocus,
      onBlur,
      disabled
    } = this.props;

    const triggerComponent = React.Children.only(children);
    const triggerProps = triggerComponent.props;

    const props: OverlayTriggerProps = {
      key: 'triggerComponent',
      'aria-describedby': _.get(speaker, ['props', 'id'])
    };

    props.onClick = createChainedFunction(triggerProps.onClick, onClick);

    if (!disabled) {
      if (isOneOf('click', trigger)) {
        props.onClick = createChainedFunction(this.handleToggle, props.onClick);
      }

      if (isOneOf('active', trigger)) {
        props.onClick = createChainedFunction(this.show, props.onClick);
      }

      if (isOneOf('hover', trigger)) {
        props.onMouseOver = createChainedFunction(
          this.handleMouseOver,
          onMouseOver,
          triggerProps.onMouseOver
        );
        props.onMouseOut = createChainedFunction(
          this.handleMouseOut,
          onMouseOut,
          triggerProps.onMouseOut
        );
      }

      if (isOneOf('focus', trigger)) {
        props.onFocus = createChainedFunction(
          this.handleDelayedShow,
          onFocus,
          triggerProps.onFocus
        );

        props.onBlur = createChainedFunction(this.handleDelayedHide, onBlur, triggerProps.onBlur);
      }
    }

    if (unsupportedCreatePortal) {
      this.speaker = this.getOverlay();
      return React.cloneElement(triggerComponent, props);
    }

    return [
      React.cloneElement(triggerComponent, props),
      <Portal key="portal">{this.getOverlay()}</Portal>
    ];
  }
}

export default OverlayTrigger;
