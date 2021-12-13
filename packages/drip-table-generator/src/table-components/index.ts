import { DripTableComponentConfig } from '../typing';
import text from './text';
import image from './picture';
import renderHtml from './render-html';
import links from './links';
import tag from './tag';

const baseComponentList: DripTableComponentConfig[] = [
  text,
  image,
  links,
  tag,
];

const customComponentList: DripTableComponentConfig[] = [
  renderHtml,
];

export default [
  ...baseComponentList,
  ...customComponentList,
] as DripTableComponentConfig[];
