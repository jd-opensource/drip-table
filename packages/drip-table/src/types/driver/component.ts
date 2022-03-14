/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';

export type DripTableReactComponent<P> = React.JSXElementConstructor<React.PropsWithChildren<P>>;

export type { ComponentProps as DripTableReactComponentProps } from 'react';
