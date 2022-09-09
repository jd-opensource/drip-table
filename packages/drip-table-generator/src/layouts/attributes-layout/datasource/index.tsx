/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { Alert } from 'antd';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';

import { GeneratorContext } from '@/context';

interface DataSourceEditorProps {
  width?: number;
  height?: number;
}

const DataSourceEditor = (props: DataSourceEditorProps) => {
  const { previewDataSource } = React.useContext(GeneratorContext);
  const [codeErrorMessage, setCodeErrorMessage] = React.useState('');
  const [code, setCode] = React.useState(JSON.stringify(previewDataSource, null, 4));

  return (
    <GeneratorContext.Consumer>
      { ({ setState }) => (
        <div>
          { codeErrorMessage && <Alert style={{ margin: '8px 0' }} message={codeErrorMessage} type="error" showIcon /> }
          <MonacoEditor
            width={props.width || '100%'}
            height={props.height || '100%'}
            language="json"
            theme="vs-dark"
            value={code || ''}
            onChange={(value) => {
              setCodeErrorMessage('');
              setCode(value || '');
              try {
                const customDataSource = JSON.parse(value || '');
                setState({ previewDataSource: customDataSource });
              } catch (error) {
                setCodeErrorMessage((error as Error).message);
              }
            }}
          />
        </div>
      ) }
    </GeneratorContext.Consumer>

  );
};

export default DataSourceEditor;
