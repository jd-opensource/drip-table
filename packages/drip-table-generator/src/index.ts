import './styles/index.less';
import './styles/theme.less';

export * from './typing';

export type { GeneratorWrapperHandler as DripTableGeneratorHandler } from './wrapper';

export { default as DTGForm } from './components/CustomForm';

export { default as DTGBuiltInComponentProps } from './table-components';

export { default as DTGComponentConfigsForm } from './layouts/attributes-layout/component-configs';
export { default as DTGTableConfigsForm } from './layouts/attributes-layout/global-configs';
export { default as DTGComponentItemConfigForm } from './layouts/attributes-layout/component-item-config';

export { default } from './wrapper';
