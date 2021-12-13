/**
 * transform: true
 * inline: true
 * sidemenu: false
 */
import React, { useEffect, useState } from 'react';
import DripTable, { DripTableSchema } from 'drip-table';
import DripTableDriverAntDesign from 'drip-table-driver-antd';
import 'antd/dist/antd.css';

import DripTableGeneratorDemo from './drip-table-generator/preview/sample';
import { mockData, SampleRecordType } from './global-configs';

import './dynamic.css';
import './index.css';

const schema: DripTableSchema = {
  "$schema": "http://json-schema.org/draft/2019-09/schema#",
  configs: {
    size: 'middle',
    pagination: {
      pageSize: 10,
      position: 'bottomRight',
    },
  },
  columns: [
    {
      "$id": "mock_1",
      title: '商品名称',
      'ui:type': 'text',
      'ui:props': {
        mode: 'single',
      },
      type: 'string',
      dataIndex: 'name',
    },
    {
      "$id": "mock_2",
      title: '商品描述',
      'ui:type': 'text',
      'ui:props': {
        mode: 'single',
        tooltip: true,
        ellipsis: true,
      },
      type: 'string',
      dataIndex: 'description',
    },
    {
      "$id": "mock_3",
      title: '商品状态',
      'ui:type': 'text',
      'ui:props': {
        mode: 'single',
      },
      type: 'string',
      enumValue: ['onSale', 'soldOut'],
      enumLabel: ['售卖中', '已售罄'],
      description: '这是一个tooltip',
      dataIndex: 'status',
      width: 92
    },
    {
      "$id": "mock_4",
      title: '商品价格',
      'ui:type': 'text',
      "ui:props": {
        mode: 'single',
        prefix: '￥',
      },
      type: 'number',
      dataIndex: 'price',
      width: 90
    },
    {
      "$id": "mock_5",
      title: '操作',
      'ui:type': 'links',
      "ui:props": {
        mode: 'multiple',
        operates: [
          { name: 'order', label: '预定', href: './#order', target: '_blank' },
          { name: 'view', label: '查看', href: './#view' },
          { name: 'remove', label: '删除', href: './#remove' },
        ]
      },
      type: 'string',
      dataIndex: 'operate',
      width: 118
    }
  ]
};

const Home = () => {
  const [checked, setChecked] = useState(false)
  const [bodyFlag, setBodyFlag] = useState(false)
  const [footerFlag, setFooterFlag] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', setAllFlag)
  }, [])

  function setAllFlag() {
    if (window.pageYOffset + window.innerHeight > 1200) {
      setBodyFlag(true)
    }
    if (window.pageYOffset + window.innerHeight > 2800) {
      setFooterFlag(true)
    }
  }

  function setAllChecked() {
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }
  return (
    <div className="__dumi-index-root">
      <div className='home-container'>
        <div className='home-container-banner'>
          <div className='home-container-banner-text'>
            <h1 className='dynamic bounce-in-left'>DripTable</h1>
            <div className='home-container-banner-markdown'>
              <p className='dynamic bounce-in-left'>JD - 中后台「表格」开箱即用解决方案</p>
              <p className='dynamic bounce-in-left'><b>高效开发: </b> 提高前端列表开发效率，实现 LowCode 方式快速开发列表页</p>
              <p className='dynamic bounce-in-left'><b>配置化渲染: </b> 以简单的 JSON Schema 配置字段，自动渲染处所需要的列表，降低用户使用成本</p>
              <p className='dynamic bounce-in-left'><b>动态可扩展: </b> 支持自定义组件开发，通过API快速生成自定义的或者实现业务功能的单元格组件</p>
              <p className='dynamic bounce-in-left'><b>UI框架自由: </b> 表格界面框架支持 antd 主题包，另外还支持自定义主题包</p>
            </div>
            <div className='dynamic bounce-in-left'>
              <a href="/drip-table/sample">
                <button type='button'>
                  使用示例
                </button>
              </a>
              <a href="/drip-table">
                <button type='button'>
                  起步
                </button>
              </a>
            </div>
          </div>
          <div className='home-container-banner-table'>
            <img src="https://storage.360buyimg.com/imgtools/eec125447e-e24fa9a0-41f4-11ec-bf12-d7e468206312.png" alt="" />
            <div className='table-image'>
              <div>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='home-container-feature'>
          <div className='home-container-feature-table'>
          </div>
          <div className='home-container-feature-text'>
            {
              bodyFlag && <div>
                <h1 className='dynamic bounce-in-right'>DripTableGenerator</h1>
                <div className='home-container-feature-markdown'>
                  <p className='dynamic bounce-in-right'>可视化的 DripTable JSON Schema 配置数据的生成工具</p>
                  <p className='dynamic bounce-in-right'><b>使用简单</b>：简单的拖拽即可添加列表配置。</p>
                  <p className='dynamic bounce-in-right'><b>Drip 生态</b>：使用 DripForm 和 DripDesign 快速生成业务组件和组件面板。</p>
                  <p className='dynamic bounce-in-right'><b>自定义组件</b>：通过在线代码编辑器，实现 LowCode 生成自定义组件。</p>
                  <p className='dynamic bounce-in-right'><b>配置可视化</b>：通过专用可视化配置工具，实现简单拖拽即可生成 JSON Schema 数据结构数据。</p>
                </div>
                <div className='dynamic bounce-in-right'>
                  <a href="/drip-table-generator/preview">
                    <button type='button'>
                      使用示例
                    </button>
                  </a>
                  <a href="/drip-table-generator">
                    <button type='button'>
                      起步
                    </button>
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <div className='home-carousel'>
        <div className='home-carousel-title'>
          <div><h1>预览</h1></div>
        </div>
        <div className='carousel-button'>
          <i className={checked ? 'carousel-checked' : ''}></i>
          <div onClick={setAllChecked}>DripTable</div>
          <div onClick={setAllChecked}>DripTableGenerator</div>
        </div>
        {!checked && <div className='carousel-content'> <div className='drip-table-generator'>
          <DripTable<SampleRecordType>
            driver={DripTableDriverAntDesign}
            schema={schema}
            dataSource={mockData}
          />
        </div>
        </div>}
        {checked && <div className='carousel-content'><div className='drip-table-generator' style={{ paddingTop: '16px', background: '#FFF' }}><DripTableGeneratorDemo showHeader={false} /></div>
        </div>}
      </div>
      <div className='home-container-features' style={{ marginTop: '16px' }}>
        <h1>何时使用</h1>
        <div className='home-container-features-content'>
          {
            footerFlag && <div className='home-container-features-drip-table'>
              <h1 className={'dynamic bounce-in-left'}>DripTable</h1>
              <p className={'dynamic bounce-in-left'}>用于中后台 CMS 列表页的快速搭建，通过简单 JSON Schema 数据即可生成列表，无需硬编码。</p>
              <p className={'dynamic bounce-in-left'}>用于 LowCode 列表搭建的前端 Table 预览以及实现，无需复杂前端代码，便可实现自定义的列表。</p>
            </div>
          }
          {
            footerFlag && <div className='home-container-features-drip-table'>
              <h1 className={'dynamic bounce-in-right'}>DripTableGenerator</h1>
              <p className={'dynamic bounce-in-right'}>用于产品人员通过简单拖拽方式快速搭建列表页。</p>
              <p className={'dynamic bounce-in-right'}>用于开发人员通过LowCode方式快速生成自定义组件。</p>
            </div>
          }
        </div>
      </div>
      <div className='home-footer'>
        Copyright © 2021 JDFED
      </div>
      <div>
      </div>
    </div>
  )
};

export default Home;
