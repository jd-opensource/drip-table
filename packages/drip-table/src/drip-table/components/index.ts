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
import DTCTag, { DTCTagSchema } from './tag';
import DTCText, { DTCTextSchema } from './text';

export type { DripTableComponentProps, DripTableComponentSchema } from './component';

export type DripTableBuiltInComponentEvent =
  | DTCLinkEvent
  | DTCButtonEvent;

export type DripTableBuiltInColumnSchema =
  | DripTableColumnSchema<'image', DTCImageSchema>
  | DripTableColumnSchema<'link', DTCLinkSchema>
  | DripTableColumnSchema<'button', DTCButtonSchema>
  | DripTableColumnSchema<'text', DTCTextSchema>
  | DripTableColumnSchema<'tag', DTCTagSchema>
  | DripTableColumnSchema<'render-html', DTCRenderHTMLSchema>;

const DripTableBuiltInComponents = {
  image: DTCImage,
  link: DTCLink,
  button: DTCButton,
  text: DTCText,
  tag: DTCTag,
  'render-html': DTCRenderHTML,
};
export default DripTableBuiltInComponents;
