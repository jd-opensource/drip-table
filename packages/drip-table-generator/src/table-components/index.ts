import { DripTableComponentAttrConfig } from '../typing';
import button from './button';
import links from './links';
import image from './picture';
import renderHtml from './render-html';
import tag from './tag';
import text from './text';

const baseComponentList: DripTableComponentAttrConfig[] = [
  text,
  image,
  links,
  tag,
  button,
];

const customComponentList: DripTableComponentAttrConfig[] = [
  renderHtml,
];

export default [
  ...baseComponentList,
  ...customComponentList,
] as DripTableComponentAttrConfig[];
