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

import { GeneratorContext } from '@/context';
import { generateTableConfigsBySchema, getSchemaValue } from '@/layouts/utils';

export interface ExportSchemaProps {
  height?: number | string;
}
const ExportSchema = (props: ExportSchemaProps) => {
  const context = React.useContext(GeneratorContext);
  const [code, setCode] = React.useState(JSON.stringify(getSchemaValue(context.tableConfigs), null, 4));
  return (
    <GeneratorContext.Consumer>
      { ({ updateTableConfigs }) => (
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
                  const newTableConfigs = generateTableConfigsBySchema(json);
                  updateTableConfigs(newTableConfigs);
                } catch {
                  hasError = true;
                  message.error('解析出错, 请传入正确的格式');
                } finally {
                  if (!hasError) {
                    message.success('数据编辑成功');
                  }
                }
              }}
            >
              确认编辑
            </Button>
          </div>
        </div>
      ) }
    </GeneratorContext.Consumer>
  );
};

export default ExportSchema;
