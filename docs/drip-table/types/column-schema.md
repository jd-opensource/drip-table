---
order: 3
title: DripTableColumnSchema
---

## DripTableColumnSchema

> 通用插槽组件渲染配置项

```typescript
export interface DripTableColumnSchema<T = string, P extends Record<string, unknown> = Record<string, unknown>> {
  /**
   * 组件类型标识符，自定义开发的业务组件以`命名空间::组件名称`格式填写；通过 components 属性传入组件库实现
   */
  component: T;
  /**
   * 对应组件类型的配置项
   */
  options: P;
  /**
   * 唯一标识，不做展示用，React 需要的 key。
   */
  key: string;
  /**
   * 表头，组件名
   */
  title: string;
  /**
   * 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
   */
  dataIndex: string | string[];
  /**
   * 默认数据
   */
  defaultValue?: unknown;
  /**
   * 表格列宽
   */
  width?: string | number;
  /**
   * 表格列对齐
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 表头说明
   */
  description?: string;
  /**
   * 是否固定列
   */
  fixed?: 'left' | 'right' | boolean;
  /**
   * 用户可控制该列显示隐藏
   */
  hidable?: boolean;
  /**
   * 数据过滤器设置
   */
  filters?: {
    text: React.ReactNode;
    value: string | number | boolean;
  }[];
  /**
   * 默认数据过滤器值
   */
  defaultFilteredValue?: React.Key[] | null;
}
```
