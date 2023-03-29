/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */
import './index.less';

import { Modal } from 'antd';
import { DripTableExtraOptions } from 'drip-table';
import React from 'react';

import { DataSourceTypeAbbr, DripTableGeneratorProps } from '../typing';
import AttributesLayout from './attributes-layout';
import TableWorkStation from './table-workstation';
import Toolbar from './toolbar';

const GeneratorLayout = <
  RecordType extends DataSourceTypeAbbr<NonNullable<ExtraOptions['SubtableDataSourceKey']>>,
  ExtraOptions extends Partial<DripTableExtraOptions> = never,
>(props: DripTableGeneratorProps<RecordType, ExtraOptions>) => (props.mode === 'page'
    ? (
      <div className="jfe-drip-table-generator-layouts-container">
        <Toolbar {...props} />
        <div className="jfe-drip-table-generator-layouts-wrapper">
          <TableWorkStation {...props} />
          <AttributesLayout />
        </div>
      </div>
    )
    : (
      <Modal
        width={1000}
        open
        modalRender={() => (
          <div className="jfe-drip-table-generator-layouts-model-container">
            <Toolbar {...props} />
            <div className="jfe-drip-table-generator-layouts-wrapper">
              <TableWorkStation {...props} />
              <AttributesLayout />
            </div>
          </div>
        )}
      />
    ));

export default GeneratorLayout;
