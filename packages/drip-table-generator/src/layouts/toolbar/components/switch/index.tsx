/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import '../../index.less';

import classNames from 'classnames';
import React from 'react';

import { GeneratorContext } from '@/context';

interface SwitchButtonProps {
  name: string;
  icon: React.ReactNode;
  label: string | React.ReactNode;
  onCheck?: (checked?: boolean) => void;
}

export const SwitchButton = (props: SwitchButtonProps) => (
  <GeneratorContext.Consumer>
    { ({ tableConfigs, currentTableID, setState }) => {
      const currentTableIndex = tableConfigs.findIndex(item => item.tableId === currentTableID);
      const tableConfig = currentTableIndex > -1 ? tableConfigs[currentTableIndex].configs : void 0;
      return (
        <div
          key={props.name}
          className={classNames(
            'jfe-drip-table-generator-toolbar-tool-cell',
            {
              checked: !!tableConfig?.[props.name],
              disabled: !tableConfig || !currentTableID,
            },
          )}
          onClick={props.onCheck
            ? () => {
              if (!tableConfig || !currentTableID) { return; }
              props.onCheck?.(!tableConfig[props.name]);
            }
            : () => {
              if (!tableConfig || !currentTableID) { return; }
              const newTableConfig = Object.assign({}, tableConfig, { [props.name]: !tableConfig[props.name] });
              const newTableConfigs = [...tableConfigs];
              newTableConfigs[currentTableIndex] = Object.assign({}, tableConfigs[currentTableIndex], { configs: newTableConfig });
              setState({ tableConfigs: newTableConfigs });
            }}
        >
          { props.icon }
          { props.label }
        </div>
      );
    } }
  </GeneratorContext.Consumer>
);
