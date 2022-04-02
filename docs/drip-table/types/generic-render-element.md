# GenericRenderElement

> 通用插槽组件渲染配置项

```typescript
interface GenericRenderElementBasic {
  /**
   * 包裹 <Col> 样式名
   */
  className?: string;
  /**
   * 包裹 <Col> 样式
   */
  style?: React.CSSProperties;
  /**
   * 宽度：
   * {number}      跨度，取值 0-24。
   * {'flex-auto'} 自动伸缩。
   * {string}      透传给元素的 width 样式值。
   */
  span?: number | 'flex-auto' | string;
  /**
   * 对齐方式
   * {'flex-start'}    左对齐。
   * {'center'}        居中。
   * {'flex-end'}      右对齐。
   * {'space-between'} 两端对齐。
   * {'space-around'}  等间对齐。
   */
  align?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  /**
   * 是否可见
   */
  visible?: boolean;
}

interface GenericRenderSpacerElement extends GenericRenderElementBasic {
  /**
   * 占位区域
   */
  type: 'spacer';
}

interface GenericRenderTextElement extends GenericRenderElementBasic {
  /**
   * 文本展示
   */
  type: 'text';
  /**
   * 文本内容
   */
  text: string;
}

interface GenericRenderHTMLElement extends GenericRenderElementBasic {
  /**
   * 富文本展示
   */
  type: 'html';
  /**
   * 富文本内容
   */
  html: string;
}

interface GenericRenderSearchElement extends GenericRenderElementBasic {
  /**
   * 基本搜索
   */
  type: 'search';
  /**
   * 搜索区域类名
   */
  wrapperClassName?: string;
  /**
   * 搜索区域样式
   */
  wrapperStyle?: React.CSSProperties;
  /**
   * 暗纹提示
   */
  placeholder?: string;
  /**
   * 显示清空按钮
   */
  allowClear?: boolean;
  /**
   * 搜索按钮文字
   */
  searchButtonText?: string;
  /**
   * 搜索按钮大小
   */
  searchButtonSize?: 'large' | 'middle' | 'small';
  /**
   * 多维度搜索维度指定
   */
  searchKeys?: { label: string; value: number | string }[];
  /**
   * 多维度搜索默认维度值
   */
  searchKeyDefaultValue?: number | string;
}

interface GenericRenderSlotElement extends GenericRenderElementBasic {
  /**
   * 用户自定义组件插槽
   */
  type: 'slot';
  /**
   * 插槽渲染函数标识符
   */
  slot: string;
  /**
   * 透传给自定组件的属性值
   */
  props?: Record<string, unknown>;
}

interface GenericRenderInsertButtonElement extends GenericRenderElementBasic {
  type: 'insert-button';
  insertButtonClassName?: string;
  insertButtonStyle?: React.CSSProperties;
  insertButtonText?: string;
  showIcon?: boolean;
}

interface GenericRenderDisplayColumnSelectorElement extends GenericRenderElementBasic {
  /**
   * 展示列选择器
   */
  type: 'display-column-selector';
  /**
   * 展示列选择器提示文案
   */
  selectorButtonText?: string;
  /**
   * 选择器按钮样式
   */
  selectorButtonType?: React.ComponentProps<DripTableDriver['components']['Button']>['type'];
}

export type DripTableGenericRenderElement =
  | GenericRenderSpacerElement
  | GenericRenderTextElement
  | GenericRenderHTMLElement
  | GenericRenderSearchElement
  | GenericRenderSlotElement
  | GenericRenderInsertButtonElement
  | GenericRenderDisplayColumnSelectorElement;
```
