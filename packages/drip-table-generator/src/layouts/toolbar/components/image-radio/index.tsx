/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { CheckCircleFilled } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';

interface ImageRadioProps<Type> {
  value: Type;
  options: { label: string | React.ReactNode; value: Type; image?: string }[];
  onChange?: (value?: Type) => void;
}

export const ImageRadio: <Type>(props: ImageRadioProps<Type>) => React.ReactElement = props => (
  <div className="jfe-drip-table-generator-toolbar-dropdown-image-radio-container">
    { props.options.map((option, index) => (
      <div
        className={classNames('jfe-drip-table-generator-toolbar-dropdown-image-radio-item', { 'jfe-drip-table-generator-toolbar-dropdown-checked': props.value === option.value })}
        key={index}
        onClick={() => {
          props.onChange?.(option.value);
        }}
      >
        { props.value === option.value && (<CheckCircleFilled className="jfe-drip-table-generator-toolbar-dropdown-checked-icon" />) }
        <div className="jfe-drip-table-generator-toolbar-dropdown-image-cover" style={{ backgroundImage: `url(${option.image || ''})` }} />
        <div className="jfe-drip-table-generator-toolbar-dropdown-title">{ option.label }</div>
      </div>
    )) }
  </div>
);
