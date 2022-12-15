/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import classNames from 'classnames';
import React from 'react';

import { GeneratorContext } from '@/context';

import styles from '../../index.module.less';

interface SwitchButtonProps {
  name: string;
  icon: React.ReactNode;
  label: string | React.ReactNode;
  onCheck?: (checked?: boolean) => void;
}

export const SwitchButton = (props: SwitchButtonProps) => (
  <GeneratorContext.Consumer>
    { ({ globalConfigs, setState }) => (
      <div
        key={props.name}
        className={classNames(styles['tool-cell'], { [styles.checked]: !!globalConfigs[props.name] })}
        onClick={props.onCheck
          ? () => {
            props.onCheck?.(!globalConfigs[props.name]);
          }
          : () => {
            const newTableGlobalConfig = Object.assign({}, globalConfigs, { [props.name]: !globalConfigs[props.name] });
            setState({ globalConfigs: newTableGlobalConfig });
          }}
      >
        { props.icon }
        { props.label }
      </div>
    ) }
  </GeneratorContext.Consumer>
);
