import { DripTableCustomEvent } from 'drip-table';

export interface CustomComponentSampleEvent extends DripTableCustomEvent<'sample-event'> { }

export type CustomComponentEvent =
  | CustomComponentSampleEvent
  | never;
