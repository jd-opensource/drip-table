/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableProps, DripTableRecordTypeBase } from 'drip-table';

import { DTGComponentPropertySchema } from '@/typing';

import ArrayComponent from './array-list';
import AutoComplete from './auto-complete';
import BoxShadowComponent from './box-shadow';
import CascadeComponent from './cascade';
import Checkbox from './checkbox';
import CodeEditorComponent from './code-editor';
import ColorPicker from './color-picker';
import DataTranslationComponent from './data-translation';
import InputComponent from './input';
import InputNumberComponent from './number';
import RadioComponent from './radio';
import RichTextEditorComponent from './rich-text-editor';
import SelectComponent from './select';
import StyleNumbersComponent from './style-numbers';
import SwitchComponent from './switch';
import TextComponent from './text';

export default {
  [InputComponent.componentName]: InputComponent,
  [TextComponent.componentName]: TextComponent,
  [InputNumberComponent.componentName]: InputNumberComponent,
  [Checkbox.componentName]: Checkbox,
  [RadioComponent.componentName]: RadioComponent,
  [SwitchComponent.componentName]: SwitchComponent,
  [SelectComponent.componentName]: SelectComponent,
  [CascadeComponent.componentName]: CascadeComponent,
  [CodeEditorComponent.componentName]: CodeEditorComponent,
  [AutoComplete.componentName]: AutoComplete,
  [ArrayComponent.componentName]: ArrayComponent,
  [ColorPicker.componentName]: ColorPicker,
  [RichTextEditorComponent.componentName]: RichTextEditorComponent,
  [StyleNumbersComponent.componentName]: StyleNumbersComponent,
  [BoxShadowComponent.componentName]: BoxShadowComponent,
  [DataTranslationComponent.componentName]: DataTranslationComponent,
};

export interface CustomComponentProps {
  icons?: DripTableProps<DripTableRecordTypeBase>['icons'];
  schema: DTGComponentPropertySchema;
  extraParams?: Record<string, unknown>;
  value?: unknown;
  onChange?: (value: unknown) => void;
  onValidate?: (errorMessage: string) => void;
}
export interface DTGComponentBaseProperty<T> {
  extraComponents?: Record<string, new <P extends CustomComponentProps>(props: P) => React.PureComponent<P>>;
  schema: DTGComponentPropertySchema;
  extraParams?: Record<string, unknown>;
  icons?: DripTableProps<DripTableRecordTypeBase>['icons'];
  value?: T;
  onChange?: (value: T) => void;
  onValidate?: (errorMessage: string) => void;
}
