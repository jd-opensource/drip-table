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
import DTCPopover, { DTCPopoverColumnSchema } from './popover';
import DTCRenderHTML, { DTCRenderHTMLColumnSchema } from './render-html';
import DTCRenderHTMLRemote, { DTCRenderHTMLRemoteColumnSchema } from './render-html-remote';
import DTCRichText, { DTCRichTextColumnSchema } from './rich-text';
import DTCSelect, { DTCSelectColumnSchema, DTCSelectEvent } from './select';
import DTCStatus, { DTCStatusColumnSchema } from './status';
import DTCSwitch, { DTCSwitchColumnSchema, DTCSwitchEvent } from './switch';
import DTCTag, { DTCTagColumnSchema } from './tag';
import DTCText, { DTCTextColumnSchema, DTCTextEvent } from './text';

export type { DripTableComponentProps } from './component';

export type DripTableBuiltInComponentEvent =
  | DTCButtonEvent
  | DTCIconEvent
  | DTCLinkEvent
  | DTCSelectEvent
  | DTCSwitchEvent
  | DTCTextEvent;

export type DripTableBuiltInColumnSchema<CustomColumnSchema extends DripTableDataColumnSchema = never> =
  | DTCButtonColumnSchema
  | DTCDatePickerColumnSchema
  | DTCIconColumnSchema
  | DTCImageColumnSchema
  | DTCInputNumberColumnSchema
  | DTCLinkColumnSchema
  | DTCPopUpPageColumnSchema
  | DTCRenderHTMLColumnSchema
  | DTCRenderHTMLRemoteColumnSchema
  | DTCRichTextColumnSchema
  | DTCRichTextColumnSchema
  | DTCSelectColumnSchema
  | DTCStatusColumnSchema
  | DTCSwitchColumnSchema
  | DTCTagColumnSchema
  | DTCTextColumnSchema
  | DTCGroupColumnSchema<CustomColumnSchema>
  | DTCPopoverColumnSchema<CustomColumnSchema>;

const DripTableBuiltInComponents = {
  [DTCButton.componentName]: DTCButton,
  [DTCDatePicker.componentName]: DTCDatePicker,
  [DTCIcon.componentName]: DTCIcon,
  [DTCImage.componentName]: DTCImage,
  [DTCInputNumber.componentName]: DTCInputNumber,
  [DTCLink.componentName]: DTCLink,
  [DTCPopUpPage.componentName]: DTCPopUpPage,
  [DTCRenderHTML.componentName]: DTCRenderHTML,
  [DTCRenderHTMLRemote.componentName]: DTCRenderHTMLRemote,
  [DTCRichText.componentName]: DTCRichText,
  [DTCSelect.componentName]: DTCSelect,
  [DTCStatus.componentName]: DTCStatus,
  [DTCSwitch.componentName]: DTCSwitch,
  [DTCTag.componentName]: DTCTag,
  [DTCText.componentName]: DTCText,
  [DTCGroup.componentName]: DTCGroup,
  [DTCPopover.componentName]: DTCPopover,
};
export default DripTableBuiltInComponents;
