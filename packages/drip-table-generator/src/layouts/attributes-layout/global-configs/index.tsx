/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { DripTableExtraOptions, DripTableSlotElementSchema } from 'drip-table';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { filterAttributes, filterAttributesByRegExp } from '@/utils';
import CustomForm from '@/components/CustomForm';
import { GeneratorContext } from '@/context';
import { DTGTableConfig, TableConfigsContext } from '@/context/table-configs';
import { DataSourceTypeAbbr, DripTableGeneratorProps, DTGComponentPropertySchema } from '@/typing';

import { GlobalAttrFormConfigs } from './configs';

interface GlobalConfigFormProps<
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  customAttributeComponents: DripTableGeneratorProps<RecordType, ExtraOptions>['customAttributeComponents'];
  customGlobalConfigPanel: DripTableGeneratorProps<RecordType, ExtraOptions>['customGlobalConfigPanel'];
  slots: DripTableGeneratorProps<RecordType, ExtraOptions>['slots'];
  slotsSchema: DripTableGeneratorProps<RecordType, ExtraOptions>['slotsSchema'];
}

const GlobalConfigForm = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: GlobalConfigFormProps<RecordType, ExtraOptions>) => {
  const context = React.useContext(GeneratorContext);
  const configContext = React.useContext(TableConfigsContext);
  const form = React.useRef<CustomForm<DTGTableConfig['configs']>>(null);

  React.useEffect(() => {
    form.current?.formForceUpdate();
  }, [configContext.tableConfigs, context.currentTableID]);

  const decodeConfigsWithPrefix = (prefix: string, globalConfigs: DTGTableConfig['configs'], formData: Record<string, unknown>) => {
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
  const decodeGlobalConfigs = (globalConfigs?: DTGTableConfig['configs'], defaultData?: Record<string, unknown>) => {
    const globalConfigsPrefix = ['pagination', 'ext', 'innerStyle'];
    const formData: Record<string, unknown> = {
      ...defaultData,
      ...filterAttributes(globalConfigs, ['header', 'footer', 'rowHeader', ...globalConfigsPrefix]),
    };

    if (typeof globalConfigs?.header === 'object') {
      formData.header = true;
      const headerElements = [...globalConfigs?.header?.elements || []].map(item => ({ ...item }));
      const currentTable = configContext.tableConfigs.find(item => item.tableId === context.currentTableID);
      for (const headerItem of headerElements) {
        if (headerItem.type === 'display-column-selector') {
          (headerItem as Record<string, unknown>).selectorColumns = currentTable?.columns.filter(column => column.hidable).map(column => column.key);
        }
        if (headerItem.type === 'spacer') {
          headerItem['style.width'] = headerItem.style?.width;
        }
        if (headerItem.type === 'search') {
          headerItem['wrapperStyle.width'] = headerItem.wrapperStyle?.width;
        }
        if (headerItem.type === 'slot') {
          const slotProps = typeof headerItem.data === 'object' ? { ...headerItem.props, ...headerItem.data } : { ...headerItem.props };
          Object.keys(slotProps).forEach((key) => {
            headerItem[key] = slotProps[key];
          });
        }
      }
      formData['header.elements'] = headerElements;
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
      formData['footer.elements'] = footerElements;
    }
    if (typeof globalConfigs?.rowHeader === 'object') {
      formData.rowHeader = true;
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
      }
      formData['rowHeader.elements'] = rowHeaderElements;
    }
    if (typeof globalConfigs?.pagination === 'object') {
      formData.pagination = true;
    }
    if (typeof globalConfigs?.innerStyle === 'object') {
      formData.innerStyle = true;
    }
    if (typeof globalConfigs?.initialSorter === 'object') {
      formData.initialSorter = true;
      formData['initialSorter.key'] = globalConfigs.initialSorter.key;
      formData['initialSorter.direction'] = globalConfigs.initialSorter.direction;
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

  const encodeGlobalConfigs = (formData: { [key: string]: unknown }): DTGTableConfig['configs'] => {
    const currentTableIndex = configContext.tableConfigs.findIndex(item => item.tableId === context.currentTableID);
    const formatElement = (element) => {
      if (element.type === 'display-column-selector') {
        const columns = [...configContext.tableConfigs[currentTableIndex]?.columns || []];
        columns.forEach((column) => { column.hidable = (element.selectorColumns || []).includes(column.key); });
        configContext.setTableColumns(columns, currentTableIndex);
        return {
          type: 'display-column-selector',
          selectorButtonType: element.selectorButtonType,
          selectorButtonText: element.selectorButtonText,
          span: Number(element.span) || element.span,
          align: element.align,
          visible: element.visible,
        };
      }
      if (element.type === 'spacer') {
        const width = element['style.width'];
        return {
          type: 'spacer',
          style: { width },
          span: Number(element.span) || element.span,
          align: element.align,
          visible: element.visible,
        };
      }
      if (element.type === 'text') {
        return {
          type: 'text',
          span: Number(element.span) || element.span,
          align: element.align,
          text: element.text,
          visible: element.visible,
        };
      }
      if (element.type === 'search') {
        const width = element['wrapperStyle.width'];
        return {
          type: 'search',
          wrapperStyle: { width },
          align: element.align,
          span: Number(element.span) || element.span,
          visible: element.visible,
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
          span: Number(element.span) || element.span,
          visible: element.visible,
          insertButtonText: element.insertButtonText,
          showIcon: element.showIcon,
        };
      }
      if (element.type === 'slot') {
        return {
          type: 'slot',
          slot: element.slot,
          data: { ...filterAttributes(element, ['type', 'slot', 'props', 'span', 'align', 'visible']) },
          span: Number(element.span) || element.span,
          align: element.align,
          visible: element.visible,
        };
      }
      return { ...element };
    };
    const tableStyle = encodeStyles('style', formData);
    const innerStyle = encodeStyles('innerStyle', formData);
    const rowHeaderStyle = encodeStyles('rowHeaderStyle', formData);
    const ext: Record<string, unknown> = {};
    Object.keys(formData).forEach((key) => {
      if (key.startsWith('ext.')) {
        ext[key.replace('ext.', '')] = formData[key];
      }
    });
    return {
      ...filterAttributesByRegExp(formData, /^((footer|header|pagination|ext|(innerS|s)tyle|rowHeader(Style)?)\.|scroll|initialSorter)/u),
      id: formData.id as string,
      className: formData.className as string,
      innerClassName: formData.innerClassName as string,
      bordered: formData.bordered as boolean,
      showHeader: formData.showHeader as boolean,
      size: formData.size as 'small' | 'middle' | 'large' | undefined,
      tableLayout: formData.tableLayout as 'auto' | 'fixed',
      sticky: formData.sticky as boolean,
      rowSelection: formData.rowSelection as boolean,
      rowDraggable: formData.rowDraggable as boolean,
      editable: formData.editable as boolean,
      virtual: formData.virtual as boolean,
      initialSorter: formData.initialSorter
        ? {
          key: formData['initialSorter.key'] as string,
          direction: formData['initialSorter.direction'] as 'ascend' | 'descend',
        }
        : void 0,
      scroll: {
        x: formData.scrollX as number,
        y: formData.scrollY as number,
      },
      style: formData.style ? tableStyle : void 0,
      innerStyle: formData.innerStyle ? innerStyle : void 0,
      rowHeader: formData.rowHeader
        ? {
          style: { ...rowHeaderStyle },
          elements: (formData['rowHeader.elements'] as DripTableSlotElementSchema[] || []).map(item => ({ ...formatElement(item) })),
        }
        : void 0,
      header: formData.header
        ? {
          style: { margin: '0', padding: '12px 0' },
          elements: (formData['header.elements'] as DripTableSlotElementSchema[] || []).map(item => ({ ...formatElement(item) })),
        }
        : false,
      footer: formData.footer
        ? {
          style: { margin: '0', padding: '12px 0' },
          elements: (formData['footer.elements'] as DripTableSlotElementSchema[] || []).map(item => ({ ...formatElement(item) })),
        }
        : void 0,
      pagination: formData.pagination
        ? {
          size: formData['pagination.size'] as 'small' | 'default' || 'default',
          pageSize: formData['pagination.pageSize'] as number,
          position: formData['pagination.position'] as 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight',
          showQuickJumper: formData['pagination.showQuickJumper'] as boolean,
          showSizeChanger: formData['pagination.showSizeChanger'] as boolean,
          showTotal: formData['pagination.showTotal'] as string,
          pageSizeOptions: formData['pagination.pageSizeOptions'] as number[],
        }
        : false,
      ext: Object.keys(ext).length > 0 ? { ...ext } : void 0,
      layout: formData.layout as DTGTableConfig['configs']['layout'],
    };
  };

  const getColumnTitle = (column) => {
    let title = '';
    if (typeof column.title === 'string') {
      title = column.title;
    } else if (typeof column.title.body === 'string') {
      title = column.title.body;
    } else {
      title = column.title.body.content;
    }
    return title;
  };

  const getGlobalFormConfigs = () => {
    let globalFormConfigs = GlobalAttrFormConfigs;
    const currentTableIndex = configContext.tableConfigs.findIndex(item => item.tableId === context.currentTableID);
    if (props.slotsSchema) {
      const headerConfigItems = globalFormConfigs.find(item => item.name === 'header.elements')?.['ui:props']?.items as DTGComponentPropertySchema[] || [];
      const footerConfigItems = globalFormConfigs.find(item => item.name === 'footer.elements')?.['ui:props']?.items as DTGComponentPropertySchema[] || [];
      Object.keys(props.slotsSchema).forEach((key) => {
        const configs = props.slotsSchema?.[key] || [];
        headerConfigItems.push(...configs
          .map(config => (config.visible === void 0 ? { ...config, visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.type === 'slot' && formData?.slot === key } : config))
          .filter(config => !headerConfigItems.some(item => item.name === config.name)));
        footerConfigItems.push(...configs
          .map(config => (config.visible === void 0 ? { ...config, visible: (_1: unknown, formData?: Record<string, unknown>) => formData?.type === 'slot' && formData?.slot === key } : config))
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
      if (uiProps?.optionsParam === '$$TABLE_COLUMNS_OPTIONS$$') {
        config = {
          ...config,
          'ui:props': {
            ...uiProps,
            options: configContext.tableConfigs[currentTableIndex]?.columns.map(column => ({ label: getColumnTitle(column), value: column.key })),
          },
        };
      }
      if (uiProps?.items) {
        const uiPropsItems = (uiProps.items as DTGComponentPropertySchema[])?.map((item, index) => {
          const itemUiProps = item['ui:props'];
          if (itemUiProps?.optionsParam === '$$SLOT_NAME_OPTIONS$$') {
            itemUiProps.options = Object.keys(props.slots || {}).map(key => ({ label: key, value: key }));
          }
          if (itemUiProps?.optionsParam === '$$TABLE_COLUMNS_OPTIONS$$') {
            itemUiProps.options = configContext.tableConfigs[currentTableIndex]?.columns.map(column => ({ label: getColumnTitle(column), value: column.key }));
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
    if (currentTableIndex > 0) {
      globalFormConfigs = globalFormConfigs.filter(item => !(/^(footer|header|innerStyle)/u).test(item.name));
    }
    return globalFormConfigs;
  };

  return (
    <TableConfigsContext.Consumer>
      { ({ tableConfigs, setTableConfigs }) => {
        const currentTableIndex = tableConfigs.findIndex(item => item.tableId === context.currentTableID);
        return (
          <CustomForm
            ref={form}
            configs={getGlobalFormConfigs()}
            data={cloneDeep(tableConfigs[currentTableIndex]?.configs)}
            decodeData={decodeGlobalConfigs}
            encodeData={encodeGlobalConfigs}
            mode="old"
            groupType="collapse"
            extraComponents={props.customAttributeComponents}
            onChange={(data) => {
              if (data) {
                setTableConfigs(cloneDeep(data), currentTableIndex);
              }
            }}
          />
        );
      } }
    </TableConfigsContext.Consumer>
  );
};

export default GlobalConfigForm;
