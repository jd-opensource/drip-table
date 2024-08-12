/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';

import Corner from '../corner';

export interface DropDownButtonProps {
  dataIndex: string;
  label: string;
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  mode?: 'page' | 'modal';
  innerStyle?: React.CSSProperties;
  open?: boolean;
  disabled?: boolean;
  onOpen?: (open: boolean, key: string) => void;
}
function DropDownButton(props: DropDownButtonProps) {
  const rootButton = React.useRef<HTMLButtonElement>(null);
  const [openState, setOpenState] = React.useState(false);
  const isOpen = typeof props.open === 'boolean' ? !!props.open : openState;
  return (
    <div className="jfe-drip-table-generator-dropdown-wrapper" style={props.style} onClick={e => e.stopPropagation()}>
      <Button
        ref={rootButton}
        className={isOpen ? 'jfe-drip-table-generator-dropdown-button' : ''}
        type={isOpen ? 'primary' : 'default'}
        style={{ borderRadius: isOpen ? '6px 6px 0 0' : '6px' }}
        disabled={props.disabled}
        onClick={(e) => {
          e.stopPropagation();
          if (typeof props.open === 'boolean') {
            props.onOpen?.(!isOpen, props.dataIndex);
          } else {
            setOpenState(!isOpen);
          }
        }}
      >
        { props.label }
      </Button>
      { isOpen && (
      <React.Fragment>
        <div className="jfe-drip-table-generator-dropdown-arrow" style={{ width: rootButton.current?.offsetWidth }}>
          <div className="jfe-drip-table-generator-dropdown-connector" style={{ right: '-10px' }}>
            <Corner position="bottomLeft" />
          </div>
          <div className="jfe-drip-table-generator-dropdown-connector" style={{ left: '-10px' }}>
            <Corner position="bottomRight" />
          </div>
        </div>
        <div
          className={classNames('jfe-drip-table-generator-dropdown-body', {
            'page-mode': props.mode === 'page' || !props.mode,
          })}
          style={{
            width: props.width,
            height: props.height,
            ...props.innerStyle,
          }}
        >
          { props.children }
        </div>
      </React.Fragment>
      ) }
    </div>
  );
}

export default DropDownButton;
