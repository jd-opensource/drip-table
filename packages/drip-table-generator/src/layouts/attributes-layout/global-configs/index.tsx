/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { DripTableExtraOptions, DripTableGenericRenderElement } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { filterAttributes, filterAttributesByRegExp } from '@/utils';
import CustomForm from '@/components/CustomForm';
import { DripTableGeneratorContext, GeneratorContext } from '@/context';
import { DataSourceTypeAbbr, DripTableGeneratorProps, DTGComponentPropertySchema } from '@/typing';

import { GlobalAttrFormConfigs } from './configs';

interface GlobalConfigFormProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  customAttributeComponents: DripTableGeneratorProps<RecordType, ExtraOptions>['customAttributeComponents'];
  customGlobalConfigPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customGlobalConfigPanel'];
  driver: DripTableGeneratorProps<RecordType, ExtraOptions>['driver'];
  slots: DripTableGeneratorProps<RecordType, ExtraOptions>['slots'];
  slotsSchema: DripTableGeneratorProps<RecordType, ExtraOptions>['slotsSchema'];
}

const GlobalConfigForm = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: GlobalConfigFormProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const form = React.useRef<CustomForm<DripTableGeneratorContext['globalConfigs']>>(null);

  React.useEffect(() => {
    form.current?.formForceUpdate();
  }, [context.globalConfigs]);

  const decodeConfigsWithPrefix = (prefix: string, globalConfigs: DripTableGeneratorContext['globalConfigs'], formData: Record<string, unknown>) => {
    if (typeof globalConfigs?.[prefix] === 'object') {
      Object.keys(globalConfigs?.[prefix] || {}).forEach((key) => {
        formData[`${prefix}.${key}`] = globalConfigs?.[prefix]?.[key];
      });
    }
  };
  const encodeStyles = (prefix: string, formData: Record<string, unknown>) => {
    const styles: React.CSSProperties = {};
    Object.keys(formData).forEach((key) => {
      if (key.startsWith(`${prefix}.`)) {
        styles[key.replace(`${prefix}.`, '')] = formData[key];
      }
    });
    return styles;
  };
  /**
   * 将全局配置转换成FormData
   * @param {GlobalSchema} globalConfigs 全局配置
   * @param {Record<string, unknown>} defaultData 默认值
   * @returns {Record<string, unknown>} 表单数据
   */
  const decodeGlobalConfigs = (
    globalConfigs?: DripTableGeneratorContext['globalConfigs'],
    defaultData?: Record<string, unknown>,
  ) => {
    const globalConfigsPrefix = ['pagination', 'ext', 'innerStyle'];
    const formData: Record<string, unknown> = {
      ...defaultData,
      ...filterAttributes(globalConfigs, ['header', 'footer', 'rowHeader', ...globalConfigsPrefix]),
    };

    if (typeof globalConfigs?.header === 'object') {
      formData.header = true;
      const headerElements = globalConfigs?.header?.elements || [];
      for (const headerItem of headerElements) {
        if (headerItem.type === 'spacer') {
          headerItem['style.width'] = headerItem.style?.width;
        }
        if (headerItem.type === 'search') {
          headerItem['wrapperStyle.width'] = headerItem.wrapperStyle?.width;
        }
        if (headerItem.type === 'slot') {
          Object.keys(headerItem.props || {}).forEach((key) => {
            headerItem[key] = headerItem.props?.[key];
          });
        }
      }
      formData['header.items'] = headerElements;
    }
    if (typeof globalConfigs?.footer === 'object') {
      formData.footer = true;
      const footerElements = globalConfigs?.footer?.elements || [];
      for (const footerItem of footerElements) {
        if (footerItem.type === 'text') {
          footerItem['style.width'] = footerItem.style?.width;
        }
        if (footerItem.type === 'search') {
          footerItem['wrapperStyle.width'] = footerItem.wrapperStyle?.width;
        }
      }
      formData['footer.items'] = footerElements;
    }
    if (typeof globalConfigs?.rowHeader === 'object') {
      Object.keys(globalConfigs?.rowHeader.style || {}).forEach((key) => {
        formData[`rowHeaderStyle.${key}`] = globalConfigs?.rowHeader?.style?.[key];
      });
      const rowHeaderElements = globalConfigs?.rowHeader?.elements || [];
      for (const headerItem of rowHeaderElements) {
        if (headerItem.type === 'spacer') {
          headerItem['style.width'] = headerItem.style?.width;
        }
        if (headerItem.type === 'search') {
          headerItem['wrapperStyle.width'] = headerItem.wrapperStyle?.width;
        }
        if (headerItem.type === 'slot') {
          Object.keys(headerItem.props || {}).forEach((key) => {
            headerItem[key] = headerItem.props?.[key];
          });
        }
      }
      formData['rowHeader.items'] = rowHeaderElements;
    }
    if (typeof globalConfigs?.pagination === 'object') {
      formData.pagination = true;
    }
    if (globalConfigs) {
      globalConfigsPrefix.forEach((prefix) => {
        decodeConfigsWithPrefix(prefix, globalConfigs, formData);
      });
    }
    formData.scrollX = globalConfigs?.scroll?.x;
    formData.scrollY = globalConfigs?.scroll?.y;
    return formData;
  };

  const encodeGlobalConfigs = (formData: { [key: string]: unknown }): DripTableGeneratorContext['globalConfigs'] => {
    const formatElement = (element) => {
      if (element.type === 'display-column-selector') {
        return {
          type: 'display-column-selector',
          selectorButtonType: element.selectorButtonType,
          selectorButtonText: element.selectorButtonText,
        };
      }
      if (element.type === 'spacer') {
        const width = element['style.width'];
        return {
          type: 'spacer',
          style: { width },
        };
      }
      if (element.type === 'text') {
        return {
          type: 'text',
          span: Number(element.span) || element.span,
          align: element.align,
          text: element.text,
        };
      }
      if (element.type === 'search') {
        const width = element['wrapperStyle.width'];
        return {
          type: 'search',
          wrapperStyle: { width },
          align: element.align,
          placeholder: element.placeholder,
          allowClear: element.allowClear,
          searchButtonText: element.searchButtonText,
          searchKeys: element.searchKeys,
          searchKeyDefaultValue: element.searchKeyDefaultValue,
        };
      }
      if (element.type === 'insert-button') {
        return {
          type: 'insert-button',
          align: element.align,
          insertButtonText: element.insertButtonText,
          showIcon: element.showIcon,
        };
      }
      if (element.type === 'slot') {
        return {
          type: 'slot',
          slot: element.slot,
          props: { ...filterAttributes(element, ['type', 'slot', 'props']) },
        };
      }
      return { ...element };
    };
    const innerStyle = encodeStyles('innerStyle', formData);
    const rowHeaderStyle = encodeStyles('rowHeaderStyle', formData);
    const ext: Record<string, unknown> = {};
    Object.keys(formData).forEach((key) => {
      if (key.startsWith('ext.')) {
        ext[key.replace('ext.', '')] = formData[key];
      }
    });
    return {
      ...filterAttributesByRegExp(formData, /^((footer|header|pagination|ext|innerStyle|rowHeader)\.|scroll)/u),
      bordered: formData.bordered as boolean,
      size: formData.size as 'small' | 'middle' | 'large' | undefined,
      tableLayout: formData.tableLayout as 'auto' | 'fixed',
      sticky: formData.sticky as boolean,
      rowSelection: formData.rowSelection as boolean,
      virtual: formData.virtual as boolean,
      scroll: {
        x: formData.scrollX as number,
        y: formData.scrollY as number,
      },
      innerStyle,
      rowHeader: {
        style: { ...rowHeaderStyle },
        elements: (formData['rowHeader.items'] as DripTableGenericRenderElement[] || []).map(item => ({ ...formatElement(item) })),
      },
      header: formData.header
        ? {
          style: { margin: '0', padding: '12px 0' },
          elements: (formData['header.items'] as DripTableGenericRenderElement[] || []).map(item => ({ ...formatElement(item) })),
        }
        : false,
      footer: formData.footer
        ? {
          style: { margin: '0', padding: '12px 0' },
          elements: (formData['footer.items'] as DripTableGenericRenderElement[] || []).map(item => ({ ...formatElement(item) })),
        }
        : void 0,
      pagination: formData.pagination
        ? {
          size: formData['pagination.size'] as 'small' | 'default',
          pageSize: formData['pagination.pageSize'] as number,
          position: formData['pagination.position'] as 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight',
          showQuickJumper: formData['pagination.showQuickJumper'] as boolean,
          showSizeChanger: formData['pagination.showSizeChanger'] as boolean,
          showTotal: formData['pagination.showTotal'] as string,
        }
        : false,
      ext: Object.keys(ext).length > 0 ? { ...ext } : void 0,
    };
  };

  const getGlobalFormConfigs = () => {
    let globalFormConfigs = GlobalAttrFormConfigs;
    if (props.slotsSchema) {
      const headerConfigItems = globalFormConfigs.find(item => item.name === 'header.items')?.['ui:props']?.items as DTGComponentPropertySchema[] || [];
      const footerConfigItems = globalFormConfigs.find(item => item.name === 'footer.items')?.['ui:props']?.items as DTGComponentPropertySchema[] || [];
      Object.keys(props.slotsSchema).forEach((key) => {
        const configs = props.slotsSchema?.[key] || [];
        headerConfigItems.push(...configs
          .map(config => (typeof config.visible === 'undefined' ? { ...config, visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.type === 'slot' && formData?.slot === key } : config))
          .filter(config => !headerConfigItems.some(item => item.name === config.name)));
        footerConfigItems.push(...configs
          .map(config => (typeof config.visible === 'undefined' ? { ...config, visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.type === 'slot' && formData?.slot === key } : config))
          .filter(config => !headerConfigItems.some(item => item.name === config.name)));
      });
    }
    if (props.customGlobalConfigPanel) {
      globalFormConfigs = props.customGlobalConfigPanel?.mode === 'add'
        ? [
          ...GlobalAttrFormConfigs,
          ...props.customGlobalConfigPanel?.configs || [],
        ]
        : [...props.customGlobalConfigPanel?.configs || []];
    }
    globalFormConfigs = globalFormConfigs.map((config) => {
      const uiProps = config['ui:props'];
      if (uiProps?.optionsParam === '$$SLOT_NAME_OPTIONS$$') {
        config = {
          ...config,
          'ui:props': {
            ...uiProps,
            options: Object.keys(props.slots || {}).map(key => ({ label: key, value: key })),
          },
        };
      }
      if (uiProps?.items) {
        const uiPropsItems = (uiProps.items as DTGComponentPropertySchema[])?.map((item, index) => {
          const itemUiProps = item['ui:props'];
          if (itemUiProps?.optionsParam === '$$SLOT_NAME_OPTIONS$$') {
            itemUiProps.options = Object.keys(props.slots || {}).map(key => ({ label: key, value: key }));
          }
          return {
            ...item,
            'ui:props': itemUiProps,
          };
        });
        config = {
          ...config,
          'ui:props': {
            ...uiProps,
            items: [...uiPropsItems],
          },
        };
      }
      return config;
    });
    return globalFormConfigs;
  };

  return (
    <GeneratorContext.Consumer>
      { ({ globalConfigs, setState }) => (
        <CustomForm
          ref={form}
          configs={getGlobalFormConfigs()}
          data={cloneDeep(globalConfigs)}
          decodeData={decodeGlobalConfigs}
          encodeData={encodeGlobalConfigs}
          groupType="collapse"
          theme={props.driver}
          extraComponents={props.customAttributeComponents}
          onChange={(data) => {
            if (data) {
              setState({ globalConfigs: cloneDeep(data) });
            }
          }}
        />
      ) }
    </GeneratorContext.Consumer>
  );
};

export default GlobalConfigForm;
