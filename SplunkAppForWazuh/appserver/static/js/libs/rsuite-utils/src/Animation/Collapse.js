// @flow

import * as React from 'react';
import classNames from 'classnames';
import { getStyle, addStyle } from 'dom-lib';
import _ from 'lodash';

import Transition from './Transition';
import createChainedFunction from '../utils/createChainedFunction';
import type { AnimationEventFunction, Dimension } from '../utils/TypeDefinition';

const triggerBrowserReflow = node => _.get(node, 'offsetHeight');

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function defaultGetDimensionValue(dimension: Dimension, elem: Element): number {
  let value = _.get(elem, `offset${_.capitalize(dimension)}`);
  let margins = MARGINS[dimension];

  return (
    value + parseInt(getStyle(elem, margins[0]), 10) + parseInt(getStyle(elem, margins[1]), 10)
  );
}

function getScrollDimensionValue(elem: Element, dimension: Dimension) {
  const value = _.get(elem, `scroll${_.capitalize(dimension)}`);
  return `${value}px`;
}

type Props = {
  in?: boolean,
  timeout?: number,
  className?: string,
  onEnter?: AnimationEventFunction,
  onEntering?: AnimationEventFunction,
  onEntered?: AnimationEventFunction,
  onExit?: AnimationEventFunction,
  onExiting?: AnimationEventFunction,
  onExited?: AnimationEventFunction,
  dimension?: Dimension | (() => Dimension),
  getDimensionValue?: (dimension: Dimension, elem: Element) => number,
  role?: string,
  exitedClassName?: string,
  exitingClassName?: string,
  enteredClassName?: string,
  enteringClassName?: string
};

class Collapse extends React.Component<Props> {
  static displayName = 'Collapse';
  static defaultProps = {
    timeout: 300,
    dimension: 'height',
    exitedClassName: 'collapse',
    exitingClassName: 'collapsing',
    enteredClassName: 'collapse in',
    enteringClassName: 'collapsing',
    getDimensionValue: defaultGetDimensionValue
  };

  // for testing
  getTransitionInstance() {
    return this.transition;
  }

  handleEnter = (elem: Element) => {
    const dimension = this.dimension();
    addStyle(elem, dimension, 0);
  };

  handleEntering = (elem: Element) => {
    const dimension = this.dimension();
    addStyle(elem, dimension, getScrollDimensionValue(elem, dimension));
  };

  handleEntered = (elem: Element) => {
    const dimension = this.dimension();
    addStyle(elem, dimension, 'auto');
  };

  /* -- Collapsing -- */
  handleExit = (elem: Element) => {
    const dimension = this.dimension();
    const { getDimensionValue } = this.props;
    const value = getDimensionValue ? getDimensionValue(dimension, elem) : 0;
    addStyle(elem, dimension, `${value}px`);
  };

  handleExiting = (elem: Element) => {
    const dimension = this.dimension();
    triggerBrowserReflow(elem);
    addStyle(elem, dimension, 0);
  };

  dimension(): Dimension {
    const { dimension } = this.props;

    return typeof dimension === 'function' ? dimension() : dimension;
  }

  transition = null;

  render() {
    const {
      dimension,
      getDimensionValue, //eslint-disable-line
      role,
      className,
      onExited,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      ...props
    } = this.props;

    const enter = createChainedFunction(this.handleEnter, onEnter);
    const entering = createChainedFunction(this.handleEntering, onEntering);
    const entered = createChainedFunction(this.handleEntered, onEntered);
    const exit = createChainedFunction(this.handleExit, onExit);
    const exiting = createChainedFunction(this.handleExiting, onExiting);

    return (
      <Transition
        {...props}
        ref={ref => {
          this.transition = ref;
        }}
        aria-expanded={role ? this.props.in : null}
        className={classNames(className, { width: this.dimension() === 'width' })}
        onEnter={enter}
        onEntering={entering}
        onEntered={entered}
        onExit={exit}
        onExiting={exiting}
        onExited={onExited}
      />
    );
  }
}

export default Collapse;
