/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import ArrayComponent from './array-list';
import AutoComplete from './auto-complete';
import CascadeComponent from './cascade';
import Checkbox from './checkbox';
import CodeEditorComponent from './code-editor';
import ColorPicker from './color-picker';
import InputComponent from './input';
import InputNumberComponent from './number';
import RadioComponent from './radio';
import SelectComponent from './select';
import SwitchComponent from './switch';
import TextComponent from './text';

export default {
  input: InputComponent,
  text: TextComponent,
  number: InputNumberComponent,
  checkbox: Checkbox,
  radio: RadioComponent,
  switch: SwitchComponent,
  select: SelectComponent,
  cascade: CascadeComponent,
  'code-editor': CodeEditorComponent,
  'auto-complete': AutoComplete,
  'array-list': ArrayComponent,
  'color-picker': ColorPicker,
};
