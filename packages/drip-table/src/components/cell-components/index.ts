/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableDataColumnSchema } from '@/types';

import DTCButton, { DTCButtonColumnSchema, DTCButtonEvent } from './button';
import DTCDatePicker, { DTCDateColumnSchema as DTCDatePickerColumnSchema } from './date-picker';
import DTCGroup, { DTCGroupColumnSchema } from './group';
import DTCIcon, { DTCIconColumnSchema, DTCIconEvent } from './icon';
import DTCImage, { DTCImageColumnSchema } from './image';
import DTCInputNumber, { DTCInputNumberColumnSchema } from './input-number';
import DTCLink, { DTCLinkColumnSchema, DTCLinkEvent } from './link';
import DTCPopUpPage, { DTCPopUpPageColumnSchema } from './pop-up-page';
import DTCRenderHTML, { DTCRenderHTMLColumnSchema } from './render-html';
import DTCRenderHTMLRemote, { DTCRenderHTMLRemoteColumnSchema } from './render-html-remote';
import DTCRichText, { DTCRichTextColumnSchema } from './rich-text';
import DTCSelect, { DTCSelectColumnSchema, DTCSelectEvent } from './select';
import DTCSwitch, { DTCSwitchColumnSchema, DTCSwitchEvent } from './switch';
import DTCTag, { DTCTagColumnSchema } from './tag';
import DTCText, { DTCTextColumnSchema, DTCTextEvent } from './text';

export type { DripTableComponentProps } from './component';

export type DripTableBuiltInComponentEvent =
  | DTCIconEvent
  | DTCLinkEvent
  | DTCTextEvent
  | DTCButtonEvent
  | DTCSelectEvent
  | DTCSwitchEvent;

export type DripTableBuiltInColumnSchema<CustomColumnSchema extends DripTableDataColumnSchema = never> =
  | DTCIconColumnSchema
  | DTCImageColumnSchema
  | DTCLinkColumnSchema
  | DTCButtonColumnSchema
  | DTCTextColumnSchema
  | DTCTagColumnSchema
  | DTCRenderHTMLColumnSchema
  | DTCRenderHTMLRemoteColumnSchema
  | DTCRichTextColumnSchema
  | DTCSelectColumnSchema
  | DTCSwitchColumnSchema
  | DTCDatePickerColumnSchema
  | DTCRichTextColumnSchema
  | DTCPopUpPageColumnSchema
  | DTCInputNumberColumnSchema
  | DTCGroupColumnSchema<CustomColumnSchema>;

const DripTableBuiltInComponents = {
  [DTCIcon.componentName]: DTCIcon,
  [DTCImage.componentName]: DTCImage,
  [DTCLink.componentName]: DTCLink,
  [DTCButton.componentName]: DTCButton,
  [DTCText.componentName]: DTCText,
  [DTCTag.componentName]: DTCTag,
  [DTCRenderHTML.componentName]: DTCRenderHTML,
  [DTCRenderHTMLRemote.componentName]: DTCRenderHTMLRemote,
  [DTCGroup.componentName]: DTCGroup,
  [DTCRichText.componentName]: DTCRichText,
  [DTCSelect.componentName]: DTCSelect,
  [DTCSwitch.componentName]: DTCSwitch,
  [DTCDatePicker.componentName]: DTCDatePicker,
  [DTCPopUpPage.componentName]: DTCPopUpPage,
  [DTCInputNumber.componentName]: DTCInputNumber,
};
export default DripTableBuiltInComponents;
