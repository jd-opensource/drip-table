import { DripTableColumnSchema } from 'drip-table';

import CustomComponentSample, { CustomComponentSampleSchema } from './sample';

export type CustomComponentSchema =
  | DripTableColumnSchema<'custom::CustomComponentSample', CustomComponentSampleSchema>;

export const CustomComponents = {
  CustomComponentSample,
};

export type { CustomComponentEvent } from './event';
