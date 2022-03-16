/**
 * This file is part of the drip-table project.
 * @link     : https://ace.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { DripTableColumnSchema } from '@/types';

import DTCButton, { DTCButtonEvent, DTCButtonSchema } from './button';
import DTCImage, { DTCImageSchema } from './image';
import DTCLink, { DTCLinkEvent, DTCLinkSchema } from './link';
import DTCRenderHTML, { DTCRenderHTMLSchema } from './render-html';
import DTCRenderHTMLRemote, { DTCRenderHTMLRemoteSchema } from './render-html-remote';
import DTCTag, { DTCTagSchema } from './tag';
import DTCText, { DTCTextSchema } from './text';

export type { DripTableComponentProps, DripTableComponentSchema } from './component';

export type DripTableBuiltInComponentEvent =
  | DTCLinkEvent
  | DTCButtonEvent;

export type DripTableBuiltInColumnSchema =
  | DripTableColumnSchema<typeof DTCImage['componentName'], DTCImageSchema>
  | DripTableColumnSchema<typeof DTCLink['componentName'], DTCLinkSchema>
  | DripTableColumnSchema<typeof DTCButton['componentName'], DTCButtonSchema>
  | DripTableColumnSchema<typeof DTCText['componentName'], DTCTextSchema>
  | DripTableColumnSchema<typeof DTCTag['componentName'], DTCTagSchema>
  | DripTableColumnSchema<typeof DTCRenderHTML['componentName'], DTCRenderHTMLSchema>
  | DripTableColumnSchema<typeof DTCRenderHTMLRemote['componentName'], DTCRenderHTMLRemoteSchema>;

const DripTableBuiltInComponents = {
  [DTCImage.componentName]: DTCImage,
  [DTCLink.componentName]: DTCLink,
  [DTCButton.componentName]: DTCButton,
  [DTCText.componentName]: DTCText,
  [DTCTag.componentName]: DTCTag,
  [DTCRenderHTML.componentName]: DTCRenderHTML,
  [DTCRenderHTMLRemote.componentName]: DTCRenderHTMLRemote,
};
export default DripTableBuiltInComponents;
