// @flow

import * as React from 'react';
import Transition from './Transition';

type Props = {
  timeout?: number,
  in?: boolean
};

class Bounce extends React.Component<Props> {
  static displayName = 'Bounce';
  static defaultProps = {
    timeout: 300
  };

  render() {
    const { timeout, ...props } = this.props;
    return (
      <Transition
        {...props}
        animation
        timeout={timeout}
        enteringClassName="bounce-in animated"
        enteredClassName="bounce-in animated"
        exitingClassName="bounce-out animated"
        exitedClassName="bounce-out animated"
      />
    );
  }
}

export default Bounce;
