import CustomComponentSample, { CustomComponentSampleColumnSchema } from './sample';

export type CustomColumnSchema =
  | CustomComponentSampleColumnSchema;

export const CustomComponents = {
  CustomComponentSample,
};

export type { CustomComponentEvent } from './event';
