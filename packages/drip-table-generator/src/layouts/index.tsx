/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { Modal } from 'antd';
import classNames from 'classnames';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { GeneratorContext } from '@/context';

import { DataSourceTypeAbbr, DripTableGeneratorProps } from '../typing';
import AttributesLayout from './attributes-layout';
import TableWorkStation from './table-workstation';
import Toolbar from './toolbar';

const GeneratorLayout = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => {
  const { drawerType } = React.useContext(GeneratorContext);
  return props.mode === 'page' || !props.mode
    ? (
      <div
        className="jfe-drip-table-generator-layouts-container"
        style={{ ...props.style, width: props.width ?? props.style?.width ?? '100%', height: props.height ?? props.style?.height ?? '100%' }}
      >
        { props.showToolbar !== false && <Toolbar {...props} /> }
        <div className={classNames('jfe-drip-table-generator-layouts-wrapper', { full: props.showToolbar === false })}>
          <div className={classNames('jfe-drip-table-generator-layouts-table-workstation', {
            fixed: drawerType && props.showAttributeLayout !== false,
          })}
          >
            <TableWorkStation {...props} />
          </div>
          { props.showAttributeLayout !== false && <AttributesLayout {...props} /> }
        </div>
      </div>
    )
    : (
      <Modal
        width={props.width ?? 1000}
        open
        modalRender={() => (
          <div
            className="jfe-drip-table-generator-layouts-model-container"
            style={{ ...props.style, width: props.width ?? props.style?.width ?? 1000, height: props.height ?? props.style?.height ?? 640 }}
          >
            { props.showToolbar !== false && <Toolbar {...props} /> }
            <div className={classNames('jfe-drip-table-generator-layouts-wrapper', { full: props.showToolbar === false })}>
              <div className={classNames('jfe-drip-table-generator-layouts-table-workstation', {
                fixed: (drawerType === 'column' || drawerType === 'column-item') && props.showAttributeLayout !== false,
              })}
              >
                <TableWorkStation {...props} />
              </div>
              { props.showAttributeLayout !== false && <AttributesLayout {...props} /> }
            </div>
          </div>
        )}
      />
    );
};

export default GeneratorLayout;
