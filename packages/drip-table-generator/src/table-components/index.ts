import { DripTableComponentAttrConfig } from '../typing';
import button from './button';
import datePicker from './date-picker';
import group from './group';
import icon from './icon';
import inputNumber from './input-number';
import links from './links';
import image from './picture';
import popUpPage from './pop-up-page';
import renderHtml from './render-html';
import renderHtmlRemote from './render-html-remote';
import richText from './rich-text';
import select from './select';
import switchConfig from './switch';
import tag from './tag';
import text from './text';

const baseComponentList: DripTableComponentAttrConfig[] = [
  text,
  image,
  links,
  tag,
  button,
  select,
  datePicker,
  popUpPage,
  inputNumber,
  switchConfig,
  icon,
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
