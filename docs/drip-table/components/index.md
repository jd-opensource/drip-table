---
title: 组件 Components
toc: false
---

## 基础组件

<style type="text/css">
  .components-overview-card {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .components-overview-card > a {
    text-decoration: none;
    padding: 0 12px;
    margin: 12px 0;
    min-width: 320px;
  }
  .components-overview-card > a:hover, .components-overview-card > a:active {
    opacity: 1.0;
    color: #000000d9;
    text-decoration: none;
  }
  .components-overview-card .card-container {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #000000d9;
    font-size: 14px;
    line-height: 1.5715;
    list-style: none;
    position: relative;
    background: #fff;
    border-radius: 2px;
    border: 1px solid rgba(0,0,0,.06);
  }

  .components-overview-card .card-container:hover {
    color: #000000d9;
    cursor: pointer;
    transition: all .5s;
    box-shadow: 0 6px 16px -8px #00000014, 0 9px 28px #0000000d, 0 12px 48px 16px #00000008;
  }

  .components-overview-card .card-container > .card-head {
    min-height: 36px;
    padding: 0 12px;
    font-size: 14px;
    border-bottom: 1px solid rgba(0,0,0,.06);
  }
  .components-overview-card .card-container > .card-head > .card-head-title {
    padding: 8px 0;
    font-weight: 500;
    overflow: hidden;
    color: #000000d9;
    text-overflow: ellipsis;
  }
  .components-overview-card .card-container > .card-body {
    padding: 12px;
  }
  .components-overview-img {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 152px;
  }
  .components-overview-img > img {
    max-width: calc(100% - 32px);
    max-height: 100%;
    vertical-align: middle;
    border-style: none;
  }
</style>
<div class="components-overview-card">
  <a href="/drip-table/components/text">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">文本组件 text</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://gw.alipayobjects.com/zos/alicdn/KpcciCJgv/Skeleton.svg" alt="text">
        </div>
      </div>
    </div>
  </a>
  <a href="/drip-table/components/status">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">状态组件 status</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://gw.alipayobjects.com/zos/alicdn/8nbVbHEm_/CheckBox.svg" alt="status">
        </div>
      </div>
    </div>
  </a>
  <a href="/drip-table/components/image">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">图片组件 image</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://gw.alipayobjects.com/zos/antfincdn/D1dXz9PZqa/image.svg" alt="image">
        </div>
      </div>
    </div>
  </a>
  <a href="/drip-table/components/link">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">链接组件 link</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://gw.alipayobjects.com/zos/alicdn/f-SbcX2Lx/Table.svg" alt="link">
        </div>
      </div>
    </div>
  </a>
  <a href="/drip-table/components/tag">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">标签组件 tag</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://gw.alipayobjects.com/zos/alicdn/cH1BOLfxC/Tag.svg" alt="tags">
        </div>
      </div>
    </div>
  </a>
  <a href="/drip-table/components/button">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">按钮组件 button</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg" alt="button">
        </div>
      </div>
    </div>
  </a>
  <a href="/drip-table/components/select">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">下拉框组件 select</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://gw.alipayobjects.com/zos/alicdn/_0XzgOis7/Select.svg" alt="select">
        </div>
      </div>
    </div>
  </a>
  <a href="/drip-table/components/switch">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">开关组件 switch</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://gw.alipayobjects.com/zos/alicdn/zNdJQMhfm/Switch.svg" alt="switch">
        </div>
      </div>
    </div>
  </a>
  <a href="/drip-table/components/checkbox">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">多选框 checkbox</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://gw.alipayobjects.com/zos/alicdn/zNdJQMhfm/Checkbox.svg" alt="checkbox">
        </div>
      </div>
    </div>
  </a>
  <a href="/drip-table/components/icon">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">图标组件 icon</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*PdAYS7anRpoAAAAAAAAAAAAADrJ8AQ/original" alt="switch">
        </div>
      </div>
    </div>
  </a>
</div>

## 容器组件

<div class="components-overview-card">
  <a href="/drip-table/components/group">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">组合组件 group</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://gw.alipayobjects.com/zos/alicdn/5rWLU27so/Grid.svg" alt="switch">
        </div>
      </div>
    </div>
  </a>
  <a href="/drip-table/components/popover">
    <div class="card-container">
      <div class="card-head">
        <div class="card-head-title">
          <div class="components-overview-title">浮窗组件 popover</div>
        </div>
      </div>
      <div class="card-body" style="background-repeat: no-repeat; background-position: right bottom;">
        <div class="components-overview-img">
          <img src="https://gw.alipayobjects.com/zos/alicdn/1PNL1p_cO/Popover.svg" alt="switch">
        </div>
      </div>
    </div>
  </a>
</div>

<!-- | 组件名 | 描述 | 详情 |
| ----- | ---- | ---- |
| [text](/drip-table/components/text) | 文本组件 | [🔗 示例](/drip-table/components/text) |
| [image](/drip-table/components/image) | 图片组件 | [🔗 示例](/drip-table/components/image) | -->
