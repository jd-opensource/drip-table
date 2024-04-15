/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : helloqian12138 (johnhello12138@163.com)
 * @modifier : helloqian12138 (johnhello12138@163.com)
 * @copyright: Copyright (c) 2020 JD Network Technology Co., Ltd.
 */

import './index.less';

import React from 'react';

import { DripTableColumnSchema, DripTableRecordTypeBase, SchemaObject } from '@/types';
import Image from '@/components/react-components/image';
import Tooltip from '@/components/react-components/tooltip';

import { DripTableComponentProps } from '../component';

const prefixCls = 'jfe-drip-table-cc-image';

export type DTCImageColumnSchema = DripTableColumnSchema<'image', {
  popover?: boolean;
  trigger?: 'click' | 'hover';
  preview?: boolean;
  previewWidth?: number | string;
  previewHeight?: number | string;
  imageWidth?: number | string;
  imageHeight?: number | string;
  imagePlaceholder?: string;
}>;

interface DTCImageProps<RecordType extends DripTableRecordTypeBase> extends DripTableComponentProps<RecordType, DTCImageColumnSchema> { }

interface DTCImageState { }

export default class DTCImage<RecordType extends DripTableRecordTypeBase> extends React.PureComponent<DTCImageProps<RecordType>, DTCImageState> {
  public static componentName: DTCImageColumnSchema['component'] = 'image';
  public static schema: SchemaObject = {
    type: 'object',
    properties: {
      popover: { type: 'boolean' },
      preview: { type: 'boolean' },
      previewWidth: { typeof: ['string', 'number'] },
      previewHeight: { typeof: ['string', 'number'] },
      trigger: { enum: ['click', 'hover'] },
      imageWidth: { typeof: ['string', 'number'] },
      imageHeight: { typeof: ['string', 'number'] },
      imagePlaceholder: { type: 'string' },
    },
  };

  private DEFAULT_IMAGE = 'data:image/png;base64,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';

  private get value() {
    const value = this.props.value;
    if (typeof value === 'string') {
      return value;
    }
    if (Array.isArray(value) && typeof value[0] === 'string') {
      return value[0];
    }
    return '';
  }

  private get groupItems() {
    const srcs = Array.isArray(this.props.value) ? this.props.value : [this.props.value];
    return srcs.map(src => ({ src }));
  }

  private renderImage() {
    const options = this.props.schema.options;
    if (this.props.preview) {
      return (
        <Image
          width={options.imageWidth}
          height={options.imageHeight}
          src={this.value}
          preview={false}
          fallback={options.imagePlaceholder || this.DEFAULT_IMAGE}
        />
      );
    }
    return (
      <div className={`${prefixCls}-wrapper`}>
        <Image.PreviewGroup items={this.groupItems} preview={this.props.preview ? false : options.preview}>
          <Image
            width={options.imageWidth}
            height={options.imageHeight}
            src={this.value}
            preview={this.props.preview ? false : options.preview}
            fallback={options.imagePlaceholder || this.DEFAULT_IMAGE}
          />
        </Image.PreviewGroup>
        {
          this.groupItems.length > 1
            ? (
              <div className={`${prefixCls}-corner-mark`}>
                <svg viewBox="0 0 11 23.9" width="11" height="23.9" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 3.305 8.046 C 3.305 3.628 6.886 0.046 11 0 L 11 23.9 L 0 23.876 C 2.075 22.38 3.305 19.977 3.305 17.419 L 3.305 8.046 Z" fill="black" fillOpacity="0.45" />
                </svg>
                <div className={`${prefixCls}-corner-mark-body`}>
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.58268 4.54159C2.58268 3.414 3.49677 2.49992 4.62435 2.49992C5.75193 2.49992 6.66602 3.414 6.66602 4.54159C6.66602 5.66917 5.75193 6.58325 4.62435 6.58325C3.49677 6.58325 2.58268 5.66917 2.58268 4.54159ZM4.62435 3.66659C4.1411 3.66659 3.74935 4.05834 3.74935 4.54159C3.74935 5.02483 4.1411 5.41659 4.62435 5.41659C5.1076 5.41659 5.49935 5.02483 5.49935 4.54159C5.49935 4.05834 5.1076 3.66659 4.62435 3.66659Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.541016 2.79159C0.541016 1.50292 1.58568 0.458252 2.87435 0.458252H10.4577C11.7463 0.458252 12.791 1.50292 12.791 2.79159V9.20825C12.791 10.4969 11.7463 11.5416 10.4577 11.5416H2.87435C1.58568 11.5416 0.541016 10.4969 0.541016 9.20825V2.79159ZM2.87435 1.62492C2.23002 1.62492 1.70768 2.14725 1.70768 2.79159V9.20825C1.70768 9.85258 2.23002 10.3749 2.87435 10.3749H6.08268C6.08268 7.25106 8.53819 4.70072 11.6243 4.54875V2.79159C11.6243 2.14725 11.102 1.62492 10.4577 1.62492H2.87435ZM11.6243 5.71722C9.18289 5.86778 7.24935 7.89555 7.24935 10.3749H10.4577C11.102 10.3749 11.6243 9.85258 11.6243 9.20825V5.71722Z" fill="white" />
                  </svg>
                  <span className={`${prefixCls}-corner-mark-text`}>
                    { this.groupItems.length }
                  </span>
                </div>
                <svg viewBox="0 0 7 28.013" width="7" height="28.013" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0 28.013 L 0 4 C 2.9779999999999998 4.17 5.71 2.577 7 0 L 7 24 C 7 26.2 5.378 28 3 28 L 0 28.013 Z" fill="black" fillOpacity="0.45" />
                </svg>
              </div>
            )
            : null
        }
      </div>
    );
  }

  public render() {
    const options = this.props.schema.options;
    return options.popover && !this.props.preview
      ? (
        <Tooltip
          trigger={options.trigger}
          overlay={(<img src={this.value} style={{ width: options.previewWidth, height: options.previewHeight }} />)}
          placement="top"
        >
          <div>
            { this.renderImage() }
          </div>
        </Tooltip>
      )
      : this.renderImage();
  }
}
