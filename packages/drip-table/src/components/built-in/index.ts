/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import DTCButton, { DTCButtonColumnSchema, DTCButtonEvent } from './button';
import DTCDate, { DTCDateColumnSchema } from './date';
import DTCGroup, { DTCGroupColumnSchema } from './group';
import DTCImage, { DTCImageColumnSchema } from './image';
import DTCInputNumber, { DTCInputNumberColumnSchema } from './input-number';
import DTCLink, { DTCLinkColumnSchema, DTCLinkEvent } from './link';
import DTCPopUpPage, { DTCPopUpPageColumnSchema } from './pop-up-page';
import DTCRenderHTML, { DTCRenderHTMLColumnSchema } from './render-html';
import DTCRenderHTMLRemote, { DTCRenderHTMLRemoteColumnSchema } from './render-html-remote';
import DTCRichText, { DTCRichTextColumnSchema } from './rich-text';
import DTCSelect, { DTCSelectColumnSchema, DTCSelectEvent } from './select';
import DTCTag, { DTCTagColumnSchema } from './tag';
import DTCText, { DTCTextColumnSchema } from './text';

export type { DripTableComponentProps } from './component';

export type DripTableGroupColumnSchema<CustomComponentSchema = never> = DTCGroupColumnSchema<CustomComponentSchema>;

export type DripTableBuiltInComponentEvent =
  | DTCLinkEvent
  | DTCButtonEvent
  | DTCSelectEvent;

export type DripTableBuiltInColumnSchema<CustomComponentSchema = never> =
  | DTCImageColumnSchema
  | DTCLinkColumnSchema
  | DTCButtonColumnSchema
  | DTCTextColumnSchema
  | DTCTagColumnSchema
  | DTCRenderHTMLColumnSchema
  | DTCRenderHTMLRemoteColumnSchema
  | DTCGroupColumnSchema<CustomComponentSchema>
  | DTCRichTextColumnSchema
  | DTCSelectColumnSchema
  | DTCDateColumnSchema
  | DTCRichTextColumnSchema
  | DTCPopUpPageColumnSchema
  | DTCInputNumberColumnSchema;

const DripTableBuiltInComponents = {
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
  [DTCDate.componentName]: DTCDate,
  [DTCPopUpPage.componentName]: DTCPopUpPage,
  [DTCInputNumber.componentName]: DTCInputNumber,
};
export default DripTableBuiltInComponents;
