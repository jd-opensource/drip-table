/**
 * This file is part of the drip-table project.
 * @link     : https://ace.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import DTCImage from './image';
import DTCLink, { DTCLinkEvent } from './link';
import DTCRenderHTML from './render-html';
import DTCTag from './tag';
import DTCText from './text';
import DTCButton, { DTCButtonEvent } from './button';

export type { DripTableComponentProps, DripTableComponentSchema } from './component';

export type DripTableBuiltInComponentEvent =
  | DTCLinkEvent
  | DTCButtonEvent;

const DripTableBuiltInComponents = {
  image: DTCImage,
  links: DTCLink,
  buttons: DTCButton,
  text: DTCText,
  tag: DTCTag,
  'render-html': DTCRenderHTML,
};
export default DripTableBuiltInComponents;
