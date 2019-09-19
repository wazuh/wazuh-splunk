// @flow

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import _ from 'lodash';
import { ownerDocument, getContainer, on } from 'dom-lib';
import overlayPositionUtils from '../utils/overlayPositionUtils';
import shallowEqual from '../utils/shallowEqual';
import type { Placement } from '../utils/TypeDefinition';

export type Props = {
  children?: React.Node,
  className?: string,
  target?: Function,
  container?: HTMLElement | (() => HTMLElement),
  containerPadding?: number,
  placement?: Placement,
  shouldUpdatePosition?: boolean,
  preventOverflow?: boolean
};

type State = {
  positionLeft?: number,
  positionTop?: number,
  arrowOffsetLeft?: null | number,
  arrowOffsetTop?: null | number,
  positionClassName?: string
};

class Position extends React.Component<Props, State> {
  static displayName = 'Position';
  static defaultProps = {
    containerPadding: 0,
    placement: 'right',
    shouldUpdatePosition: false
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      positionLeft: 0,
      positionTop: 0,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };
  }

  componentDidMount() {
    this.updatePosition(false);
    if (this.container && this.props.preventOverflow) {
      this.containerScrollListener = on(
        this.container.tagName === 'BODY' ? window : this.container,
        'scroll',
        this.updatePosition
      );
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (!shallowEqual(nextProps, this.props)) {
      this.needsFlush = true;
      return true;
    }

    if (!shallowEqual(nextState, this.state)) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: Props) {
    if (this.needsFlush) {
      this.needsFlush = false;
      this.updatePosition(prevProps.placement !== this.props.placement);
    }
  }

  componentWillUnmount() {
    this.lastTarget = null;
    if (this.containerScrollListener) {
      this.containerScrollListener.off();
    }
  }

  getTargetSafe() {
    const { target } = this.props;
    if (!target) {
      return null;
    }

    const targetSafe = target(this.props);

    if (!targetSafe) {
      return null;
    }

    return targetSafe;
  }

  lastTarget = false;
  needsFlush = null;
  container = null;
  containerScrollListener = null;

  updatePosition = (placementChanged?: boolean = true) => {
    const target = this.getTargetSafe();
    const { shouldUpdatePosition, placement, containerPadding } = this.props;

    /**
     * 如果 target 没有变化，同时不允许更新位置，placement 位置也没有改变，则返回
     */
    if (target === this.lastTarget && !shouldUpdatePosition && !placementChanged) {
      return;
    }

    this.lastTarget = target;

    if (!target) {
      this.setState({
        positionLeft: 0,
        positionTop: 0,
        arrowOffsetLeft: null,
        arrowOffsetTop: null
      });
      return;
    }

    /* eslint-disable */
    const overlay = findDOMNode(this);
    const container = getContainer(this.props.container, ownerDocument(this).body);
    const nextPosition = overlayPositionUtils.calcOverlayPosition(
      placement,
      overlay,
      target,
      container,
      containerPadding
    );

    this.container = container;
    this.setState(nextPosition);
  };

  render() {
    const { children, className, ...rest } = this.props;
    const { positionLeft, positionTop, positionClassName, ...arrowPosition } = this.state;
    const child = React.Children.only(children);

    return React.cloneElement(child, {
      ..._.omit(rest, ['target', 'container', 'containerPadding', 'preventOverflow']),
      ...arrowPosition,
      positionLeft,
      positionTop,
      className: classNames(className, positionClassName, child.props.className),
      style: {
        ...child.props.style,
        left: positionLeft,
        top: positionTop
      }
    });
  }
}

export default Position;
