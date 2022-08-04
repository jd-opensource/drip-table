import React from 'react';

import { DripTableExtraOptions, DripTableRecordTypeBase, DripTableSchema } from '@/types';
import { indexValue } from '@/utils/operator';

import styles from './index.module.less';

function CardItem<RecordType extends DripTableRecordTypeBase>(props: { data: RecordType; schema: DripTableSchema<NonNullable<DripTableExtraOptions['CustomColumnSchema']>, NonNullable<DripTableExtraOptions['SubtableDataSourceKey']>>;
}) {
  const { schema, data } = props;

  return (
    <div
      className={styles['card-item']}
    >
      {
        schema.columns.map((col, index) => (
          <div key={col.title}>
            <h4>{ col.title }</h4>
            { indexValue(data, index, col.defaultFilteredValue) }
          </div>
        ))
      }
    </div>
  );
}

export default CardItem;
