import { useContext } from 'react';
import { ReactGAType } from './types';
import AnalyticsContext from './AnalyticsContext';

export default function useCookies(): [ReactGAType, any] {
  const ctx = useContext(AnalyticsContext);
  if (!ctx.config || !ctx.reactGA) {
    throw new Error('Missing <AnalyticsContext>');
  }

  const props: [ReactGAType, any] = [ctx.reactGA, ctx.config] as any;
  return props;
}
