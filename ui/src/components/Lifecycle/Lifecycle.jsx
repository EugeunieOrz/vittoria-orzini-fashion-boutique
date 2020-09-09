// @flow
import React from 'react';

import type { ComponentType } from 'react';

type Props = {
  componentDidMount?: () => void,
}

/**
 * A higher order component which allows to wrap a component and dispatch lifecycle methods on mounting/unmounting.
 *
 * @param Component The component to wrap.
 */
const lifecycle = (Component: ComponentType<*>) =>
  class extends React.Component<Props> {
    /**
     * The component props.
     */
    props: Props;

    /**
     * The component default props.
     */
    static defaultProps: Object = {
      componentDidMount: () => null,
    };

    /**
     * Handler which is invoked immediately after a component is mounted.
     */
    componentDidMount() {
      if (this.props.componentDidMount !== undefined) this.props.componentDidMount();
    }

    /**
     * Renders the component.
     *
     * @returns The component.
     */
    render() {
      const {
        componentDidMount, ...rest
      } = this.props;

      return <Component {...rest} />;
    }
  };

export default lifecycle;
