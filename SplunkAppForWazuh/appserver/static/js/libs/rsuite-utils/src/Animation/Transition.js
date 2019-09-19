// @flow

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { on, transition } from 'dom-lib';
import classNames from 'classnames';
import _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat';
import getAnimationEnd from '../utils/getAnimationEnd';

import type {
  ReactFindDOMNode,
  DefaultEvent,
  AnimationEventFunction
} from '../utils/TypeDefinition';

export const UNMOUNTED = 0;
export const EXITED = 1;
export const ENTERING = 2;
export const ENTERED = 3;
export const EXITING = 4;

function noop() {}

type Props = {
  animation?: boolean,
  children?: React.Node,
  className?: string,
  in?: boolean,
  unmountOnExit?: boolean,
  transitionAppear?: boolean,
  timeout?: number,

  exitedClassName?: string,
  exitingClassName?: string,
  enteredClassName?: string,
  enteringClassName?: string,

  onEnter: AnimationEventFunction,
  onEntering: AnimationEventFunction,
  onEntered: AnimationEventFunction,
  onExit: AnimationEventFunction,
  onExiting: AnimationEventFunction,
  onExited: AnimationEventFunction
};

type State = {
  status?: number
};

class Transition extends React.Component<Props, State> {
  /**
   * Note that `handledProps` are generated automatically during
   * build with `babel-plugin-transform-react-flow-handled-props`
   */
  static handledProps = [];
  static displayName = 'Transition';
  static defaultProps = {
    timeout: 1000,

    onEnter: noop,
    onEntering: noop,
    onEntered: noop,

    onExit: noop,
    onExiting: noop,
    onExited: noop
  };

  constructor(props: Props) {
    super(props);

    let initialStatus: number;
    if (props.in) {
      initialStatus = props.transitionAppear ? EXITED : ENTERED;
    } else {
      initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
    }

    this.state = {
      status: initialStatus
    };

    this.nextCallback = null;
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.in && nextProps.unmountOnExit) {
      if (prevState.status === UNMOUNTED) {
        // Start enter transition in componentDidUpdate.
        return { status: EXITED };
      }
    }
    return null;
  }

  componentDidMount() {
    if (this.props.transitionAppear && this.props.in) {
      this.performEnter(this.props);
    }
  }

  getSnapshotBeforeUpdate() {
    if (!this.props.in || !this.props.unmountOnExit) {
      this.needsUpdate = true;
    }
    return null;
  }

  componentDidUpdate() {
    const { status } = this.state;
    const { unmountOnExit } = this.props;

    if (unmountOnExit && status === EXITED) {
      if (this.props.in) {
        this.performEnter(this.props);
      } else {
        /*eslint-disable*/
        if (this.instanceElement) {
          this.setState({ status: UNMOUNTED });
        }
      }
      return;
    }

    if (this.needsUpdate) {
      this.needsUpdate = false;

      if (this.props.in) {
        if (status === EXITING || status === EXITED) {
          this.performEnter(this.props);
        }
      } else if (status === ENTERING || status === ENTERED) {
        this.performExit(this.props);
      }
    }
  }

  componentWillUnmount() {
    this.cancelNextCallback();
    this.instanceElement = null;
  }

  animationEventListener = null;
  instanceElement = null;

  onTransitionEnd(node: ReactFindDOMNode, handler: Function) {
    this.setNextCallback(handler);

    if (this.animationEventListener) {
      this.animationEventListener.off();
    }

    if (node) {
      const { timeout, animation } = this.props;
      this.animationEventListener = on(
        node,
        animation ? getAnimationEnd() : transition.end,
        this.nextCallback
      );
      if (timeout !== null) {
        setTimeout(this.nextCallback, timeout);
      }
    } else {
      setTimeout(this.nextCallback, 0);
    }
  }

  setNextCallback(callback: (event: DefaultEvent) => void) {
    let active = true;

    this.nextCallback = (event?: DefaultEvent) => {
      if (!active) {
        return;
      }

      if (event) {
        if (this.instanceElement === event.target) {
          callback(event);
          active = false;
          this.nextCallback = null;
        }
        return;
      }

      callback(event);
      active = false;
      this.nextCallback = null;
    };

    this.nextCallback.cancel = () => {
      active = false;
    };

    return this.nextCallback;
  }

  performEnter(props: Props) {
    const { onEnter, onEntering, onEntered } = props || this.props;

    this.cancelNextCallback();
    const node = findDOMNode(this);

    this.instanceElement = node;
    onEnter(node);

    this.safeSetState({ status: ENTERING }, () => {
      onEntering(node);
      this.onTransitionEnd(node, () => {
        this.safeSetState({ status: ENTERED }, () => {
          onEntered(node);
        });
      });
    });
  }

  performExit(props: Props) {
    const { onExit, onExiting, onExited } = props || this.props;

    this.cancelNextCallback();
    const node = findDOMNode(this);

    this.instanceElement = node;
    onExit(node);

    this.safeSetState({ status: EXITING }, () => {
      onExiting(node);

      this.onTransitionEnd(node, () => {
        this.safeSetState({ status: EXITED }, () => {
          onExited(node);
        });
      });
    });
  }

  cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  }

  safeSetState(nextState: State, callback: Function) {
    if (this.instanceElement) {
      this.setState(nextState, this.setNextCallback(callback));
    }
  }

  nextCallback: any = null;
  needsUpdate = null;

  render() {
    const status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    const {
      children,
      className,
      exitedClassName,
      enteringClassName,
      enteredClassName,
      exitingClassName,
      ...rest
    } = this.props;

    const childProps = _.omit(rest, Transition.handledProps);

    let transitionClassName;
    if (status === EXITED) {
      transitionClassName = exitedClassName;
    } else if (status === ENTERING) {
      transitionClassName = enteringClassName;
    } else if (status === ENTERED) {
      transitionClassName = enteredClassName;
    } else if (status === EXITING) {
      transitionClassName = exitingClassName;
    }

    const child = React.Children.only(children);

    return React.cloneElement(child, {
      ...childProps,
      className: classNames(child.props.className, className, transitionClassName)
    });
  }
}

polyfill(Transition);

export default Transition;
