import { createContext } from 'react';
import { DripTableRecordTypeBase } from 'drip-table';
import { DripTableGeneratorProps } from '@/typing';

export type IDripTableGeneratorContext<RecordType extends DripTableRecordTypeBase> = DripTableGeneratorProps<RecordType>;

export const Ctx = createContext<IDripTableGeneratorContext<Record<string, unknown>>>({});
