// @flow

import * as React from 'react';
import classNames from 'classnames';
import Transition from './Transition';

type Props = {
  timeout?: number,
  className?: string,
  in?: boolean
};

class Fade extends React.Component<Props> {
  static displayName = 'Fade';
  static defaultProps = {
    timeout: 300
  };

  render() {
    const { timeout, className, ...props } = this.props;
    return (
      <Transition
        {...props}
        timeout={timeout}
        className={classNames(className, 'fade')}
        enteredClassName="in"
        enteringClassName="in"
      />
    );
  }
}

export default Fade;
