import * as React from 'react';

import { Consumer } from './AnalyticsContext';
import { AnalyticsProps, AnalyticsContextProps } from './types';
import { config } from 'process';

// Only way to make function modules work with both TypeScript and Rollup
const hoistStatics = require('hoist-non-react-statics');

type Diff<T, U> = T extends U ? never : T;
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export default function withAnalytics<T extends AnalyticsProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<Omit<T, keyof AnalyticsProps>> {
  // @ts-ignore
  const name = WrappedComponent.displayName || WrappedComponent.name;

  class AnaliticWrapper extends React.Component<any, any> {
    static displayName = `withAnalytics(${name})`;
    static WrappedComponent = WrappedComponent;

    render() {
      const { forwardedRef, config, trackerInfo, options, ...restProps } = this.props;
      return <WrappedComponent {...(restProps as T)} ref={forwardedRef} />;
    }
  }

  const ForwardedComponent: any = React.forwardRef((props: any, ref: any) => {
    return (
      <Consumer>
        {({ reactGA, config }: AnalyticsContextProps) => <AnaliticWrapper reactGA={reactGA} config={config} {...props} forwardedRef={ref} />}
      </Consumer>
    );
  });

  ForwardedComponent.displayName = AnaliticWrapper.displayName;
  ForwardedComponent.WrappedComponent = AnaliticWrapper.WrappedComponent;

  return hoistStatics(ForwardedComponent, WrappedComponent);
}
