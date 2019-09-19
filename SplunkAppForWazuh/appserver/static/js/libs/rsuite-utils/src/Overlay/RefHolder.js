// @flow
import * as React from 'react';

type Props = {
  children?: React.Node
};

/**
 * Internal helper component to allow attaching a non-conflicting ref to a
 * child element that may not accept refs.
 */
class RefHolder extends React.Component<Props> {
  render() {
    return this.props.children || null;
  }
}

export default RefHolder;
