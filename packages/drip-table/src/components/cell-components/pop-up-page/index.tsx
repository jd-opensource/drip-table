/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Estherjing(qichudegensui@163.com)
 * @modifier : Estherjing(qichudegensui@163.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */
import './index.less';

import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import Button from '@/components/react-components/button';
import Modal from '@/components/react-components/modal';

import { DripTableComponentProps } from '../component';

const prefixCls = 'jfe-drip-table-cc-pop-up-page';

export type DTCPopUpPageColumnSchema = DripTableColumnSchema<'pop-up-page', {
  label?: string;
  buttonType?: 'primary' | 'dashed' | 'text' | 'link';
  shape?: 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  title?: string;
  auxiliaryDesc?: string;
  embeddedSafetyPadding?: string | number;
  link: string;
  width?: string | number;
  maxHeight?: string | number;
  maxWidth?: string | number;
  height?: string | number;
}>;

interface DTCPopUpPageState {
  visible: boolean;
}

interface DTCPopUpPageProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCPopUpPageColumnSchema> { }

export default class DTCPopUpPage<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCPopUpPageProps<RecordType>, DTCPopUpPageState> {
  public static componentName: DTCPopUpPageColumnSchema['component'] = 'pop-up-page';
  public static schema: SchemaObject = {
    type: 'object',
    properties: {
      label: { type: 'string' },
      buttonType: { type: 'string' },
      shape: { type: 'string' },
      size: { type: 'string' },
      title: { type: 'string' },
      auxiliaryDesc: { type: 'string' },
      link: { type: 'string' },
      width: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      embeddedSafetyPadding: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      maxHeight: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      maxWidth: { anyOf: [{ type: 'string' }, { type: 'number' }] },
      height: { anyOf: [{ type: 'string' }, { type: 'number' }] },
    },
  };

  public state: DTCPopUpPageState = {
    visible: false,
  };

  private get label() {
    const options = this.props.schema.options;
    return this.props.finalizeString('pattern', options.label || '', this.props.record, this.props.recordIndex, this.props.ext);
  }

  private handlePopUpVisible = () => {
    if (this.props.preview) { return; }
    this.setState({
      visible: true,
    });
  };

  private onClose = () => {
    this.setState({
      visible: false,
    });
  };

  private get padding() {
    return this.props.schema.options.embeddedSafetyPadding || 0;
  }

  private get auxiliaryDesc() {
    return this.props.schema.options.auxiliaryDesc || '';
  }

  public render() {
    const { visible } = this.state;
    const options = this.props.schema.options;

    return (
      <div>
        <Button type={options.buttonType} size={options.size} shape={options.shape} onClick={this.handlePopUpVisible}>{ this.label }</Button>
        <Modal
          visible={visible}
          title={(
            <div className={`${prefixCls}-modal-title`}>
              <span>{ options.title }</span>
              <span className={`${prefixCls}-auxiliary-desc`}>{ this.auxiliaryDesc }</span>
            </div>
          )}
          onClose={this.onClose}
          width={options.width || 520}
          style={{ maxHeight: options.maxHeight || 730, maxWidth: options.maxWidth || 1152, height: options.height || 'unset' }}
        >
          <iframe src={options.link} width="100%" height="100%" frameBorder="0" style={{ width: '100%', padding: this.padding }} />
        </Modal>
      </div>
    );
  }
}
