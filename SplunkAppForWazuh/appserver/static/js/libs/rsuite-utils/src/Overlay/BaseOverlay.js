// @flow

import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';

import Portal from './Portal';
import Position from './Position';
import RootCloseWrapper from './RootCloseWrapper';

import type {
  AnimationEventFunction,
  DefaultEventFunction,
  Placement
} from '../utils/TypeDefinition';

type Props = {
  container?: HTMLElement | (() => HTMLElement),
  onRendered?: Function,
  children?: React.Node,
  className?: string,
  target?: Function,
  containerPadding?: number,
  placement?: Placement,
  shouldUpdatePosition?: boolean,
  preventOverflow?: boolean,

  show?: boolean,
  rootClose?: boolean,
  onHide?: DefaultEventFunction,
  transition?: React.ElementType,
  onEnter?: AnimationEventFunction,
  onEntering?: AnimationEventFunction,
  onEntered?: AnimationEventFunction,
  onExit?: AnimationEventFunction,
  onExiting?: AnimationEventFunction,
  onExited?: AnimationEventFunction,
  positionRef?: React.ElementRef<*>
};

type State = {
  exited?: boolean
};

class Overlay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { exited: !props.show };
  }

  static getDerivedStateFromProps(nextProps: Props) {
    if (nextProps.show) {
      return { exited: false };
    } else if (!nextProps.transition) {
      return { exited: true };
    }
    return null;
  }

  handleHidden = (...args: Array<any>) => {
    this.setState({ exited: true });
    const { onExited } = this.props;
    onExited && onExited(...args);
  };

  render() {
    const {
      container,
      containerPadding,
      target,
      placement,
      shouldUpdatePosition,
      rootClose,
      children,
      transition: Transition,
      show,
      onHide,
      positionRef,
      preventOverflow,
      ...props
    } = this.props;

    const mountOverlay = show || (Transition && !this.state.exited);

    if (!mountOverlay) {
      return null;
    }

    let child = children;

    const positionProps = {
      container,
      containerPadding,
      target,
      placement,
      shouldUpdatePosition,
      preventOverflow
    };

    child = (
      <Position {...positionProps} ref={positionRef}>
        {child}
      </Position>
    );

    if (Transition) {
      let { onExit, onExiting, onEnter, onEntering, onEntered } = props;
      child = (
        <Transition
          in={show}
          transitionAppear
          onExit={onExit}
          onExiting={onExiting}
          onExited={this.handleHidden}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
        >
          {child}
        </Transition>
      );
    }

    if (rootClose) {
      child = (
        <RootCloseWrapper target={target} onRootClose={onHide}>
          {child}
        </RootCloseWrapper>
      );
    }

    return <Portal container={container}>{child}</Portal>;
  }
}

polyfill(Overlay);

export default Overlay;
