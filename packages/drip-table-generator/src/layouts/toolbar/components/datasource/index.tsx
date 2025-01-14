/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Alert } from 'antd';
import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableRecordTypeWithSubtable, ExtractDripTableExtraOption } from 'drip-table';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';

import { GeneratorContext } from '@/context';
import { DripTableGeneratorProps } from '@/typing';

export type DataSourceHandler = {
  formatDataSource: () => void;
}

interface DataSourceEditorProps<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
> {
  width?: number;
  height?: number;
  onDataSourceChange: DripTableGeneratorProps<RecordType, ExtraOptions>['onDataSourceChange'];
  className?: string;
}

function DataSourceEditor<
  RecordType extends DripTableRecordTypeWithSubtable<DripTableRecordTypeBase, ExtractDripTableExtraOption<ExtraOptions, 'SubtableDataSourceKey'>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DataSourceEditorProps<RecordType, ExtraOptions>, ref: React.ForwardedRef<DataSourceHandler>) {
  const { previewDataSource } = React.useContext(GeneratorContext);
  const [codeErrorMessage, setCodeErrorMessage] = React.useState('');
  const [code, setCode] = React.useState(JSON.stringify(previewDataSource, null, 4));

  React.useImperativeHandle(ref, () => ({
    formatDataSource: () => {
      setCode(JSON.stringify(previewDataSource, null, 4));
    },
  }));

  const calcEditorHeight = () => {
    if (typeof props.height === 'number') {
      return props.height - (codeErrorMessage ? 56 : 0);
    }
    return props.height || '100%';
  };

  return (
    <GeneratorContext.Consumer>
      {({ setState }) => (
        <div style={{ position: 'relative' }}>
          <MonacoEditor
            className={props.className}
            width={props.width || '100%'}
            height={calcEditorHeight()}
            language="json"
            theme="vs-dark"
            value={code || ''}
            onChange={(value) => {
              setCodeErrorMessage('');
              setCode(value || '');
              try {
                const customDataSource = JSON.parse(value || '');
                if (Array.isArray(customDataSource)) {
                  setState({ previewDataSource: customDataSource }, () => {
                    props.onDataSourceChange?.(customDataSource);
                  });
                }
              } catch (error) {
                setCodeErrorMessage((error as Error).message);
              }
            }}
          />
          {codeErrorMessage && <Alert style={{ margin: '8px 0' }} message={codeErrorMessage} type="error" showIcon />}
        </div>
      )}
    </GeneratorContext.Consumer>

  );
}

export default React.forwardRef(DataSourceEditor);
