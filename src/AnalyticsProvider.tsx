import * as React from 'react';
import ReactGA from 'react-ga';
import { AnalyticsProviderProps, ReactGAType, AnalyticsInitilizeOptions } from './types';

import { Provider } from './AnalyticsContext';

export default class AnalyticsProvider extends React.Component<AnalyticsProviderProps, any> {
  config: any;
  reactGA: ReactGAType;
  trackerInfo: any;
  options?: AnalyticsInitilizeOptions;

  constructor(props: AnalyticsProviderProps) {
    super(props);

    this.config = props.config;
    this.reactGA = ReactGA as ReactGAType;
    this.trackerInfo = props.trackerInfo;
    this.options = props.options;

    this.reactGA.initialize(this.trackerInfo, props.options);
  }

  render() {
    return (
      <Provider
        value={{
          trackerInfo: this.trackerInfo,
          options: this.options,
          config: this.config,
          reactGA: this.reactGA,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
