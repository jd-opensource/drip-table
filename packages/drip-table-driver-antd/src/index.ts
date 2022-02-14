/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import * as AntDesignIcons from '@ant-design/icons';
import * as AntDesign from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { DripTableDriver } from 'drip-table';

const DripTableDriverAntDesign: DripTableDriver = {
  components: AntDesign,
  icons: AntDesignIcons,
  locale: zhCN,
} as unknown as DripTableDriver;

export default DripTableDriverAntDesign;
