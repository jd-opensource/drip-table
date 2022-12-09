/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import { CheckCircleFilled } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';

import styles from './index.module.less';

interface ImageRadioProps<Type> {
  value: Type;
  options: { label: string; value: Type; image?: string }[];
  onChange?: (value?: Type) => void;
}

export const ImageRadio: <Type>(props: ImageRadioProps<Type>) => React.ReactElement = props => (
  <div className={styles['image-radio-container']}>
    { props.options.map((option, index) => (
      <div
        className={classNames(styles['image-radio-item'], { [styles.checked]: props.value === option.value })}
        key={index}
        onClick={() => {
          props.onChange?.(option.value);
        }}
      >
        { props.value === option.value && (<CheckCircleFilled className={styles['checked-icon']} />) }
        <div className={styles['image-cover']} style={{ backgroundImage: `url(${option.image || ''})` }} />
        <div className={styles.title}>{ option.label }</div>
      </div>
    )) }
  </div>
);
