import { DripTableComponentAttrConfig } from '../typing';
import text from './text';
import image from './picture';
import renderHtml from './render-html';
import links from './links';
import tag from './tag';

const baseComponentList: DripTableComponentAttrConfig[] = [
  text,
  image,
  links,
  tag,
];

const customComponentList: DripTableComponentAttrConfig[] = [
  renderHtml,
];

export default [
  ...baseComponentList,
  ...customComponentList,
] as DripTableComponentAttrConfig[];
