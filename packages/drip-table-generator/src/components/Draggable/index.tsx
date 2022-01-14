import React, { Component } from 'react';

import styles from './index.module.less';

interface Data {
  index: number;
  sort: number;
  width?: string | number;
}

interface Props<T extends Data> {
  value: T[];
  codeKey: string;
  style: React.CSSProperties;
  isAcceptAdd?: boolean;
  render: (item: T) => JSX.Element;
  onChange: (data: T[]) => void;
}
interface States {
  uuid: string;
}
export default class Draggable<T extends Data> extends Component<Props<T>, States> {
  public constructor(props: Props<T>) {
    super(props);
    this.state = {
      uuid: this.guid(),
    };
  }

  public S4() {
    return Math.trunc((1 + Math.random()) * 0x10000).toString(16).slice(1);
  }

  public guid() {
    return `${this.S4() + this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}`;
  }

  public onDragStart(event: React.DragEvent<HTMLDivElement>, sort: number, code: string, uuid: string, item: T) {
    event.dataTransfer.setData('code', code);
    event.dataTransfer.setData('uuid', uuid);
    event.dataTransfer.setData('item', JSON.stringify(item));
    event.dataTransfer.setData('sort', String(sort));
  }

  public onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    const ele = event.target as Element;
    if (ele.className?.includes && ele.className.includes(styles['draggable-droppedcontent'])) {
      ele.className = styles['draggable-droppingcontent'];
    }
  }

  public onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    const ele = event.target as Element;
    if (ele.className?.includes && ele.className.includes(styles['draggable-droppingcontent'])) {
      ele.className = styles['draggable-droppedcontent'];
    }
  }

  public compare() {
    return (a: T, b: T) => {
      if (a.index < b.index) {
        return -1;
      } if (a.index > b.index) {
        return 1;
      }
      return 0;
    };
  }

  public onDrop(
    event: React.DragEvent<HTMLDivElement>,
    droppedSort: number,
    data: T[],
    droppedUuid: string,
    codeKey: string,
  ) {
    event.preventDefault();
    const code = event.dataTransfer.getData('code');
    const uuid = event.dataTransfer.getData('uuid');
    const sort = Number(event.dataTransfer.getData('sort'));
    if (uuid === droppedUuid) {
      if (sort < droppedSort) {
        data.map((item) => {
          if (item[codeKey] === Number(code)) {
            item.index = droppedSort;
          } else if (item.index > sort && item.index < droppedSort + 1) {
            item.index -= 1;
          }
          return item;
        });
      } else {
        data = data.map((item) => {
          if (item[codeKey] === Number(code)) {
            item.index = droppedSort;
          } else if (item.index > droppedSort - 1 && item.index < sort) {
            item.index += 1;
          }
          return item;
        });
      }
    } else if (this.props.isAcceptAdd) {
      const draggedItem = JSON.parse(event.dataTransfer.getData('item'));
      if (!data.some(item => item[codeKey] === draggedItem[codeKey])) {
        const maxSort = Math.max(...data.map(item => item.index));
        data.forEach((item) => {
          if (droppedSort === maxSort) {
            draggedItem.key = droppedSort + 1;
          } else if (item.sort > droppedSort) {
            draggedItem.key = droppedSort + 1;
            item.index += 1;
          }
        });
        data.push(draggedItem);
      }
    }
    this.props.onChange(data);
    const element = event.target as Element;
    if (element.className.includes(styles['draggable-droppingcontent'])) {
      element.className = styles['draggable-droppedcontent'];
    }
  }

  // 生成拖拽组件
  public createDraggleComponent(
    data: T[],
    style: React.CSSProperties,
    uuid: string,
    renderCell: (item: T) => JSX.Element,
    codeKey: string,
  ) {
    return data.sort(this.compare()).map(item => (
      <div
        key={item[codeKey]}
        className={styles['draggable-droppedcontent']}
        style={style}
        draggable
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragStart={e => this.onDragStart(e, item.index, String(item[codeKey]), uuid, item)}
        onDrop={e => this.onDrop(e, item.index, data, uuid, codeKey)}
        onDragOver={e => e.preventDefault()}
      >
        { renderCell(item) }
      </div>
    ));
  }

  public render() {
    const { value, codeKey, style, render } = this.props;
    const { uuid } = this.state;
    let containerWidth = 4;
    const minWidth = Number(style.width) || 0;
    for (const item of value) {
      const width = typeof item.width === 'number'
        ? item.width
        : Number(String(item.width).replace(/(px|%|r?em|pt|vw|cm|in|pc)$/gui, '')) || 0;
      containerWidth += Math.max(minWidth, width + 2, 120);
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: `${containerWidth}px`,
      }}
      >
        { this.createDraggleComponent(value, style, uuid, render, codeKey) }
      </div>
    );
  }
}
