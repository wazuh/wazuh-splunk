// @flow

import * as React from 'react';
import classNames from 'classnames';

import BaseOverlay from './BaseOverlay';
import Fade from '../Animation/Fade';

import type {
  AnimationEventFunction,
  DefaultEventFunction,
  Placement
} from '../utils/TypeDefinition';

type Props = {
  animation?: boolean,
  container?: HTMLElement | (() => HTMLElement),
  containerPadding?: number,
  children: React.Element<any>,
  className?: string,
  rootClose?: boolean,
  show?: boolean,
  shouldUpdatePosition?: boolean,
  preventOverflow?: boolean,
  target?: Function,
  transition?: React.ElementType,
  onRendered?: Function,
  onEnter?: AnimationEventFunction,
  onEntering?: AnimationEventFunction,
  onEntered?: AnimationEventFunction,
  onExit?: AnimationEventFunction,
  onExiting?: AnimationEventFunction,
  onExited?: AnimationEventFunction,
  onHide?: DefaultEventFunction,
  placement?: Placement,
  positionRef?: React.ElementRef<*>
};

class Overlay extends React.Component<Props> {
  /**
   * Note that `handledProps` are generated automatically during
   * build with `babel-plugin-transform-react-flow-handled-props`
   */
  static handledProps = [];
  static defaultProps = {
    animation: true,
    transition: Fade
  };

  render() {
    let { children: child, animation, transition, ...props } = this.props;

    if (!animation) {
      transition = undefined;
    }

    if (!transition) {
      child = React.Children.only(child);
      child = React.cloneElement(child, {
        className: classNames('in', child.props.className)
      });
    }

    return (
      <BaseOverlay {...props} transition={transition}>
        {child}
      </BaseOverlay>
    );
  }
}

export default Overlay;
