/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import './index.less';

import RcImage from 'rc-image';
import React from 'react';

export interface ImageProps extends React.ComponentProps<typeof RcImage> {
}

const prefixCls = 'jfe-drip-table-rc-image';

const Image = React.memo((props: ImageProps) => (
  <RcImage
    {...props}
    prefixCls={prefixCls}
    previewPrefixCls={`${prefixCls}-preview`}
    preview={
      props.preview
        ? Object.assign(
          {
            mask: (
              <div className={`${prefixCls}-mask`}>
                <div className={`${prefixCls}-mask-info`}>
                  <span className={`${prefixCls}-mask-info__icon`} role="img" aria-label="eye">
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                    </svg>
                  </span>
                  预览
                </div>
              </div>
            ),
          },
          typeof props.preview === 'object' ? props.preview : void 0,
          {
            transitionName: 'jfe-drip-table-motion-zoom',
            maskTransitionName: 'jfe-drip-table-motion-fade',
          },
        )
        : false
    }
  />
));

export interface ImagePreviewGroupProps extends React.ComponentProps<typeof RcImage.PreviewGroup> {
}

const ImagePreviewGroup = React.memo((props: ImagePreviewGroupProps) => (
  <RcImage.PreviewGroup
    {...props}
    previewPrefixCls={`${prefixCls}-preview`}
    preview={
      props.preview
        ? Object.assign(
          {
            mask: (
              <div className={`${prefixCls}-mask`}>
                <div className={`${prefixCls}-mask-info`}>
                  <span className={`${prefixCls}-mask-info__icon`} role="img" aria-label="eye">
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                      <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                    </svg>
                  </span>
                  预览
                </div>
              </div>
            ),
          },
          typeof props.preview === 'object' ? props.preview : void 0,
          {
            transitionName: 'jfe-drip-table-motion-zoom',
            maskTransitionName: 'jfe-drip-table-motion-fade',
          },
        )
        : false
    }
  />
));

export default Object.assign(Image, { PreviewGroup: ImagePreviewGroup });
