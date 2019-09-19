// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import { getContainer, ownerDocument } from 'dom-lib';
import { polyfill } from 'react-lifecycles-compat';

import shallowEqual from '../utils/shallowEqual';

export type Props = {
  /**
   * A Node, Component instance, or function that returns either.
   * The `container` will have the Portal children
   * appended to it.
   */
  container?: HTMLElement | (() => HTMLElement),
  onRendered?: Function,
  children?: React.Node
};

/**
 * The `<Portal/>` component renders its children into a new "subtree" outside of
 * current component hierarchy.
 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
 * The children of `<Portal/>` component will be appended to the `container` specified.
 */
class Portal extends React.Component<Props> {
  static displayName = 'Portal';

  componentDidMount() {
    this.setContainer();
    this.forceUpdate(this.props.onRendered);
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.container !== this.props.container) {
      this.setContainer();
    }

    if (!shallowEqual(nextProps, this.props)) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    this.portalContainerNode = null;
  }

  setContainer = (props: Props = this.props) => {
    this.portalContainerNode = getContainer(props.container, ownerDocument(this).body);
  };

  getMountNode = () => this.portalContainerNode;

  portalContainerNode = null;

  render() {
    const { children } = this.props;
    return children && this.portalContainerNode
      ? ReactDOM.createPortal(children, this.portalContainerNode)
      : null;
  }
}

polyfill(Portal);

export default Portal;
