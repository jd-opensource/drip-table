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
};
