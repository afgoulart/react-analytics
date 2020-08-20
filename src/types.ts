import {
  EventArgs,
  GaOptions,
  InitializeOptions,
  Tracker,
  TrackerNames,
  FieldsObject,
  TimingArgs,
  Plugin,
  TestModeAPI,
  OutboundLinkArgs,
  OutboundLinkProps,
} from 'react-ga';

export type ReactGAType = {
  EventArgs: EventArgs;
  GaOptions: GaOptions;
  InitializeOptions: InitializeOptions;
  Tracker: Tracker;
  TrackerNames: TrackerNames;
  FieldsObject: FieldsObject;
  TimingArgs: TimingArgs;
  Plugin: Plugin;
  TestModeAPI: TestModeAPI;
  OutboundLinkArgs: OutboundLinkArgs;
  OutboundLinkProps: OutboundLinkProps;
  initialize(trackingCode: string, options?: InitializeOptions): void;
  initialize(trackers: Tracker[], options?: InitializeOptions): void;
  addTrackers(trackingCode: string): void;
  addTrackers(trackers: Tracker[]): void;
  ga(): (...args: any[]) => void;
  ga(...args: any[]): void;
  resetCalls(): void;
  set(fieldsObject: FieldsObject, trackerNames?: TrackerNames): void;
  send(fieldsObject: FieldsObject, trackerNames?: TrackerNames): void;
  pageview(path: string, trackerNames?: TrackerNames, title?: string): void;
  modalview(name: string, trackerNames?: TrackerNames): void;
  timing(args: TimingArgs, trackerNames?: TrackerNames): void;
  event(args: EventArgs, trackerNames?: TrackerNames): void;
  exception(fieldsObject: FieldsObject, trackerNames?: TrackerNames): void;
  plugin: Plugin;
  testModeAPI: TestModeAPI;
  outboundLink(args: OutboundLinkArgs, hitCallback: () => void, trackerNames?: TrackerNames): void;
  OutboundLink: React.ComponentClass<OutboundLinkProps & React.HTMLProps<HTMLAnchorElement>>;
};

export interface AnalyticsTrackerInfoProps {
  trackerName: string;
  trackerId: string;
}

export interface AnalyticsContextProps {
  config: any;
  reactGA: ReactGAType;
  trackerInfo: AnalyticsTrackerInfo;
  options?: AnalyticsInitilizeOptions;
}

export interface AnalyticsProviderProps {
  config: any;
  trackerInfo: AnalyticsTrackerInfo;
  options?: AnalyticsInitilizeOptions;
}

export type AnalyticsTrackerInfo = string | Tracker[];

export type AnalyticsInitilizeOptions = InitializeOptions;

export interface AnalyticsProps {
  reactGA?: ReactGAType;
  children?: any;
  ref?: React.RefObject<{}>;
}
