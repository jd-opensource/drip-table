/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import ArrayComponent from './array-list';
import ColorPicker from './color-picker';
import InputComponent from './input';
import AutoComplete from './auto-complete';
import TextComponent from './text';
import Checkbox from './checkbox';
import RadioComponent from './radio';
import SwitchComponent from './switch';
import SelectComponent from './select';
import InputNumberComponent from './number';
import CascadeComponent from './cascade';
import CodeEditorComponent from './code-editor';

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
