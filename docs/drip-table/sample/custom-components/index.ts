import CustomComponentSample, { CustomComponentSampleColumnSchema } from './sample';

export type CustomColumnSchema =
  | CustomComponentSampleColumnSchema;

export const CustomComponents = {
  [CustomComponentSample.componentName]: CustomComponentSample,
};

export type { CustomComponentEvent } from './event';
