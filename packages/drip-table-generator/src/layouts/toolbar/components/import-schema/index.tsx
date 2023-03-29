/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import { Button, message } from 'antd';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';

import { filterAttributes, mockId } from '@/utils';
import { GeneratorTableConfigsContext } from '@/context/table-configs';

export interface ImportSchemaProps {
  height?: number | string;
}
const ImportSchema = (props: ImportSchemaProps) => {
  const [code, setCode] = React.useState('');
  return (
    <GeneratorTableConfigsContext.Consumer>
      { ({ currentTableID, tableConfigs, updateTableConfig }) => (
        <div>
          <MonacoEditor
            width="100%"
            height={props.height || '100%'}
            language="json"
            theme="vs-dark"
            value={code}
            onChange={(value) => {
              setCode(value);
            }}
          />
          <div style={{ marginTop: 8, padding: '0 12px', textAlign: 'right' }}>
            <Button
              style={{ marginRight: '12px' }}
              onClick={() => {
                try {
                  const inputCode = JSON.parse(code);
                  const formattedCode = JSON.stringify(inputCode, null, 4);
                  setCode(formattedCode);
                } catch {
                  message.error('解析出错, 请输入正确的JSON数据');
                }
              }}
            >
              格式化
            </Button>
            <Button
              type="primary"
              onClick={() => {
                const value = (code || '').trim();
                let hasError = false;
                try {
                  const json = JSON.parse(value);
                  const globalConfigsToImport = filterAttributes(json, ['columns']);
                  const columnsToImport = json.columns?.map((item, index) => ({ key: `${item.component}_${mockId()}`, ...item }));
                  const index = currentTableID ? tableConfigs.findIndex(item => item.tableId === currentTableID) : 0;
                  if (index > -1) {
                    updateTableConfig({
                      ...tableConfigs[index],
                      configs: { ...globalConfigsToImport },
                      columns: [...columnsToImport],
                    }, index);
                  }
                } catch {
                  hasError = true;
                  message.error('解析出错, 请传入正确的格式');
                } finally {
                  if (!hasError) {
                    message.success('数据导入成功');
                  }
                }
              }}
            >
              确认导入
            </Button>
          </div>
        </div>
      ) }
    </GeneratorTableConfigsContext.Consumer>
  );
};

export default ImportSchema;
