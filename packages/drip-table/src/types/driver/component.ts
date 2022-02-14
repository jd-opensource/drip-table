/**
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

export type DripTableReactComponent<P> = (props: React.PropsWithChildren<P>) => React.ReactElement | null;
export type DripTableReactComponentProps<T> = T extends DripTableReactComponent<infer P> ? P : never;
