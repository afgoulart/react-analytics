import * as React from 'react';
import { AnalyticsContextProps } from './types';

const AnalyticsContext = React.createContext<AnalyticsContextProps>({} as AnalyticsContextProps);

export const { Provider, Consumer } = AnalyticsContext;
export default AnalyticsContext;
