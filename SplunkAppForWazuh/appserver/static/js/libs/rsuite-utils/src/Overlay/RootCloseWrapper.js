// @flow

import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { on, contains } from 'dom-lib';
import _ from 'lodash';

function isLeftClickEvent(event) {
  return _.get(event, 'button') === 0;
}

function isModifiedEvent(event: SyntheticKeyboardEvent<*>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || _.get(event, 'shiftKey'));
}

type Props = {
  children: React.Node,
  onRootClose?: () => void,
  target?: Function
};

class RootCloseWrapper extends React.Component<Props> {
  componentDidMount() {
    this.bindRootCloseHandlers();
  }

  componentWillUnmount() {
    this.unbindRootCloseHandlers();
  }
  onDocumentClickListener = null;
  onDocumentKeyupListener = null;

  bindRootCloseHandlers() {
    let doc = window.document;
    this.onDocumentClickListener = on(doc, 'click', this.handleDocumentClick);
    this.onDocumentKeyupListener = on(doc, 'keyup', this.handleDocumentKeyUp);
  }

  handleDocumentClick = (event: SyntheticKeyboardEvent<*>) => {
    /* eslint-disable */
    if (contains(findDOMNode(this), event.target)) {
      return;
    }
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    const { target } = this.props;
    if (target) {
      if (contains(target(), event.target)) {
        return;
      }
    }

    const { onRootClose } = this.props;
    onRootClose && onRootClose();
  };

  handleDocumentKeyUp = (event: SyntheticKeyboardEvent<*>) => {
    if (event.keyCode === 27) {
      const { onRootClose } = this.props;
      onRootClose && onRootClose();
    }
  };

  unbindRootCloseHandlers() {
    if (this.onDocumentClickListener) {
      this.onDocumentClickListener.off();
    }

    if (this.onDocumentKeyupListener) {
      this.onDocumentKeyupListener.off();
    }
  }

  render() {
    return this.props.children;
  }
}

export default RootCloseWrapper;
