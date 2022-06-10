import { DripTableComponentAttrConfig } from '../typing';
import button from './button';
import group from './group';
import links from './links';
import image from './picture';
import renderHtml from './render-html';
import renderHtmlRemote from './render-html-remote';
import richText from './rich-text';
import tag from './tag';
import text from './text';

const baseComponentList: DripTableComponentAttrConfig[] = [
  text,
  image,
  links,
  tag,
  button,
];

const containerComponentList: DripTableComponentAttrConfig[] = [
  group,
];

const customComponentList: DripTableComponentAttrConfig[] = [
  renderHtml,
  renderHtmlRemote,
  richText,
];

export default [
  ...baseComponentList,
  ...containerComponentList,
  ...customComponentList,
] as DripTableComponentAttrConfig[];
