/*
 * This file is part of the drip-table project.
 * @link     : https://drip-table.jd.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2021 JD Network Technology Co., Ltd.
 */

import React from 'react';
import classNames from 'classnames';
import Typewriter from 'typewriter-effect';
import ReactCompareImage from 'react-compare-image';

import styles from './index.less';

const appendScript = (el: HTMLDivElement, src: string) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.addEventListener('load', resolve);
  script.addEventListener('error', reject);
  el.append(script);
});

interface IndexPageProps {}
interface IndexPageState {}

export default class IndexPage extends React.PureComponent<IndexPageProps, IndexPageState> {
  private get headerEl() {
    var header = document.querySelector('.dumi-default-header');
    return (header instanceof HTMLElement) ? header : void 0;
  }

  private updateScroll = () => {
    var header = this.headerEl;
    if (!header) {
      return;
    }

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const headerHeight = header.offsetHeight;
    const fixed = scrollTop > headerHeight;
    const currentFixed = header.classList.contains(styles['drip-table-header--fixed']);
    if (currentFixed === fixed) {
      return;
    }

    if (fixed) {
      header.classList.add(styles['drip-table-header--fixed']);
    } else {
      header.classList.remove(styles['drip-table-header--fixed']);
    }
  }

  public componentDidMount(): void {
    this.headerEl?.classList.add(styles['drip-table-header']);
    window.addEventListener('scroll', this.updateScroll);
    this.updateScroll();
    document.title = 'Drip Table';
  }

  public componentWillUnmount(): void {
    this.headerEl?.classList.remove(styles['drip-table-header']);
    this.headerEl?.classList.remove(styles['drip-table-header--fixed']);
    window.removeEventListener('scroll', this.updateScroll);
  }

  public render() {
    return (
      <React.Fragment>
        <link rel="stylesheet" type="text/css" href="/assets/bulma/index.min.css" />
        <link rel="stylesheet" type="text/css" href="/assets/prismjs/index.min.css" />
        <style>{`main { padding: 0 !important; }`}</style>

        <div className={styles['drip-table-root']} ref={async (el) => {
          if (!el) {
            return;
          }
          await appendScript(el,'/assets/prismjs/index.min.js');
        }}>

          <section className={classNames('section', styles['drip-table-section'], styles['drip-table-section1'])}>
            <div className={styles['drip-table-section1-background']}></div>
            <div className="container has-text-centered">
              <h1 className={classNames('title is-1 mb-2 has-text-primary', styles['drip-table-slogan'])}>Drip Table</h1>
              <h1 className={classNames('title is-1 has-text-primary', styles['drip-table-typewriter'])}>
                <Typewriter
                  options={{
                    strings: ['快速构建中后台表格', '可视化搭建', '逻辑变更，无需开发', '一次编写，永久使用'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              <p className={classNames('subtitle mt-5 mb-5 has-text-primary', styles['drip-table-description'])}>轻量、强大的企业级列表可视化搭建解决方案。</p>
              <p className={classNames('mt-6', styles['drip-table-font-circular-std'])}>适用于 React 16+ 环境</p>
              <figure className="highlight is-flex is-justify-content-center mt-3 mb-3">
                <pre className={styles['drip-table-install-cmd']}><code className="language-shell">npm install --save drip-table drip-table-generator</code></pre>
              </figure>
              <div className={classNames('mt-6 mb-6', styles['drip-table-screen-container'])}>
                <div className="columns is-variable is-6">
                  <div className="column">
                    <figure className={styles['drip-table-screen-image']}>
                      <img src="https://img12.360buyimg.com/imagetools/jfs/t1/34757/7/19055/345386/639b48b8E404d1fb0/bcef76009c59d0b6.png" />
                    </figure>
                  </div>
                  <div className="column">
                    <figure className={styles['drip-table-screen-image']}>
                      <img src="https://img12.360buyimg.com/imagetools/jfs/t1/214042/35/8655/360611/61c3164fEdce1daf7/a1b3cb267bf1ecaf.png" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={classNames('section pb-6', styles['drip-table-section'], styles['drip-table-section2'])}>
            <div className={classNames('container has-text-centered mt-6', styles['drip-table-section2__container'])}>
              <div>
                <h2 className="title is-2 has-text-white has-text-left">
                  中后台「表格」开箱即用解决方案。
                </h2>
              </div>
              <div className="columns mt-6">
                <div className="column is-one-third">
                  <p className={classNames('has-text-white has-text-left is-size-6', styles['drip-table-section2__desc'], styles['drip-table-font-circular-std'])}>
                    DripTable 兼容所有 React 16+ 项目环境，通过可视化搭建，获得表格结构 Schema 对象，结合表格数据接口，即可快速完成中后台表格渲染开发。
                    <br />
                    DripTable 专注于可视化搭建、组件渲染分发，底层渲染逻辑由组件库处理，因此不依赖指定界面框架，可支持多种主流界面组件库。
                  </p>
                </div>
                <div className="column">
                  <video className={styles['drip-table-demo-video']} src="https://storage.360buyimg.com/drip-design/drip-table/drip-table-demo.mp4?v=2" autoPlay muted loop></video>
                </div>
              </div>
            </div>
            <div className={classNames(styles['drip-table-shape'], styles['drip-table-shape-bottom'])}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <path className={styles['drip-table-shape-fill']} d="M738,99l262-93V0H0v5.6L738,99z"></path>
              </svg>
            </div>
          </section>

          <section className={classNames('section mt-6', styles['drip-table-section'], styles['drip-table-section3'])}>
            <div className={styles['drip-table-section3__overlay']}></div>
            <div className="container has-text-centered mt-6">
              <div className="ani-icon"></div>
              <h1 className="title is-2 has-text-white">可视化搭建</h1>
            </div>
          </section>

          <section className={classNames('section', styles['drip-table-section'], styles['drip-table-section4'])}>
            <div className="container">
              <h2 className="title is-5 has-text-white mt-4">优势</h2>
              <h2 className="title is-2 has-text-white has-text-left mb-6">
                积木化搭建，大幅降低研发周期。
              </h2>
            </div>
            <div className={classNames('pb-6', styles['drip-table-shape'], styles['drip-table-shape-bottom2'])}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <path className={styles['drip-table-shape-fill']} d="M761.9,44.1L643.1,27.2L333.8,98L0,3.8V0l1000,0v3.9"></path>
              </svg>
            </div>
          </section>

          <section className={classNames('section', styles['drip-table-section'], styles['drip-table-section5'], styles['drip-table-font-circular-std'])}>
            <div className="container">
              <div className="columns mb-6">
                <div className="column is-one-third">
                  <div className="card">
                    <div className="card-content">
                      <h2 className="title is-3 mr-4 mt-6 mb-6">高效开发</h2>
                      <div className="content pb-6">
                        用于中后台 CMS 列表页的快速搭建，通过简单 JSON Schema 数据即可生成列表，无需复杂前端代码，无需硬编码，提高前端列表开发效率，通过 Low-code 方式快速搭建的前端表格，即可完成自定义的列表预览以及实现。
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="columns mt-3">
                    <div className="column">
                      <div className="card">
                        <div className="card-content">
                          <div className="is-flex is-justify-content-center">
                            <figure className={classNames('image is-128x128 r-8', styles['drip-table-feature-icon'])}>
                              <span role="img" aria-label="box-plot" className="anticon anticon-box-plot"><svg viewBox="64 64 896 896" focusable="false" data-icon="box-plot" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M296 368h88v288h-88zm152 0h280v288H448z" fill="#e6f7ff"></path><path d="M952 224h-52c-4.4 0-8 3.6-8 8v248h-92V304c0-4.4-3.6-8-8-8H232c-4.4 0-8 3.6-8 8v176h-92V232c0-4.4-3.6-8-8-8H72c-4.4 0-8 3.6-8 8v560c0 4.4 3.6 8 8 8h52c4.4 0 8-3.6 8-8V548h92v172c0 4.4 3.6 8 8 8h560c4.4 0 8-3.6 8-8V548h92v244c0 4.4 3.6 8 8 8h52c4.4 0 8-3.6 8-8V232c0-4.4-3.6-8-8-8zM384 656h-88V368h88v288zm344 0H448V368h280v288z" fill="#1890ff"></path></svg></span>
                            </figure>
                          </div>
                          <h2 className="title is-4 has-text-centered mt-3">配置化渲染</h2>
                          <p>
                            以简单的 JSON Schema 配置字段，自动渲染处所需要的列表，降低用户使用成本。
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="card">
                        <div className="card-content">
                          <div className="is-flex is-justify-content-center">
                            <figure className={classNames('image is-128x128 r-8', styles['drip-table-feature-icon'])}>
                              <span role="img" aria-label="appstore" className="anticon anticon-appstore"><svg viewBox="64 64 896 896" focusable="false" data-icon="appstore" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M864 144H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zM464 544H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H212V612h200v200zm52-668H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452 132H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200z" fill="#1890ff"></path><path d="M212 212h200v200H212zm400 0h200v200H612zM212 612h200v200H212zm400 0h200v200H612z" fill="#e6f7ff"></path></svg></span>
                            </figure>
                          </div>
                          <h2 className="title is-4 has-text-centered mt-3">动态可扩展</h2>
                          <p>
                            支持自定义组件开发，通过 API 快速生成自定义的或者实现业务功能的单元格组件。
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div className="card">
                        <div className="card-content">
                          <div className="is-flex is-justify-content-center">
                            <figure className={classNames('image is-128x128 r-8', styles['drip-table-feature-icon'])}>
                              <span role="img" aria-label="usb" className="anticon anticon-usb"><svg viewBox="64 64 896 896" focusable="false" data-icon="usb" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M759.9 504H264.1c-26.5 0-48.1 19.7-48.1 44v292h592V548c0-24.3-21.6-44-48.1-44z" fill="#e6f7ff"></path><path d="M456 248h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm160 0h-48c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" fill="#1890ff"></path><path d="M760 432V144c0-17.7-14.3-32-32-32H296c-17.7 0-32 14.3-32 32v288c-66.2 0-120 52.1-120 116v356c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8V548c0-63.9-53.8-116-120-116zM336 184h352v248H336V184zm472 656H216V548c0-24.3 21.6-44 48.1-44h495.8c26.5 0 48.1 19.7 48.1 44v292z" fill="#1890ff"></path></svg></span>
                            </figure>
                          </div>
                          <h2 className="title is-4 has-text-centered mt-3">
                            界面框架自由
                          </h2>
                          <p>
                            表格界面支持多种主题，同时支持自定义主题包，符合接口约定的组件库均可接入。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container has-text-centered mt-6">
              <div className={styles['drip-table-compare-slider']}>
                <ReactCompareImage
                  sliderLineColor="#2276f3"
                  handle={(
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        boxSizing: 'border-box',
                        flexShrink: '0',
                        border: '2px solid #2276f3',
                        boxShadow: '#00000054 0px 0px 15px',
                        borderRadius: '999px',
                        backdropFilter: 'blur(5px)',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          transform: 'translateX(5px)',
                          transition: 'all 0.1s ease-out 0s',
                        }}
                      >
                        <svg
                          height="15"
                          width="15"
                          style={{
                            transform: 'scale(0.7) rotateZ(180deg)',
                            height: '20px',
                            width: '20px',
                            filter: 'drop-shadow( 0px -3px 5px #00000054)',
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          data-name="Layer 1"
                          viewBox="0 0 15 15"
                        >
                          <path fill="transparent" stroke="#2276f3" strokeLinecap="round" strokeWidth="3" d="M4.5 1.9L10 7.65l-5.5 5.4"></path>
                        </svg>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          transform: 'translateX(-5px)',
                          transition: 'all 0.1s ease-out 0s',
                        }}
                      >
                        <svg
                          height="15"
                          width="15"
                          style={{
                            transform: 'scale(0.7) rotateZ(0deg)',
                            height: '20px',
                            width: '20px',
                            filter: 'drop-shadow( 0px 3px 5px #00000054)',
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          data-name="Layer 1"
                          viewBox="0 0 15 15"
                        >
                          <path fill="transparent" stroke="#2276f3" strokeLinecap="round" strokeWidth="3" d="M4.5 1.9L10 7.65l-5.5 5.4"></path>
                        </svg>
                      </div>
                    </div>
                  )}
                  handleSize={50}
                  leftImage="https://img10.360buyimg.com/imagetools/jfs/t1/143439/6/24521/306196/61c3102aEedfc091a/4dc6eac365946bd2.png"
                  rightImage="https://img14.360buyimg.com/imagetools/jfs/t1/223762/31/962/294271/61c29d96E2e06dd4d/60f210f1193d2ac0.png"
                />
              </div>
              <p className={classNames('pt-5 ml-6 mr-6', styles['drip-table-section5__desc'])}>
                抛弃繁重难以维护的 JSX 堆砌表格列，采用无需开发的低代码拖拽搭建模式。
              </p>
            </div>
          </section>

          <section className={classNames('section', styles['drip-table-section'], styles['drip-table-section6'])}>
            <div className={classNames('container pt-3 mt-4', styles['drip-table-section6__container'])}>
              <h1 className={classNames('title is-2 has-text-centered', styles['drip-table-font-circular-std'], styles['drip-table-user-list-title'])}>谁在使用</h1>
              <div className={classNames('ui-image mt-6 mb-6', styles['drip-table-user-list'])}>
                <a href="https://ace.jd.com/" target="_blank" rel="noopener noreferrer" className={styles['drip-table-users-item']}>
                  <img className={styles['drip-table-normal']} src="https://img30.360buyimg.com/pop/jfs/t1/195440/17/16088/13457/61056817Ec99890eb/10c25959825537c0.png" alt="营销投放平台" />
                  <img className={styles['drip-table-hover']} src="https://img30.360buyimg.com/pop/jfs/t1/184131/20/16729/16548/61056658E5c1dd724/b72c92ce8026a441.png" alt="营销投放平台" />
                </a>
              </div>
            </div>
          </section>

          <section className={classNames('section is-flex is-align-items-center', styles['drip-table-section'], styles['drip-table-section7'])}>
            <div className="container pt-6 mt-4">
              <div className="is-flex  is-justify-content-center mb-5">
                <figure className="image is-128x128">
                  <img src="https://storage.360buyimg.com/imgtools/7e0e546a96-d962c880-f9a2-11eb-bf08-d585041b7c80.svg" />
                </figure>
              </div>
              <h1 className="title is-2 has-text-centered has-text-white">Drip Table</h1>
              <p className="subtitle mt-2 mb-6 has-text-white has-text-centered">
                欢迎分享您的想法、提交问题与建议。
              </p>
              <div className="buttons are-medium is-flex is-justify-content-center pt-2 ">
                <a
                  href="https://gitter.im/drip-table/community"
                  target="_blank"
                  className="button is-rounded is-primary has-text-weight-bold "
                  rel="noreferrer"
                >
                  <span className={classNames('icon is-medium', styles['drip-table-gitter'])}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 18 25" fill="#ffffff">
                      <rect x="15" y="5" width="2" height="10"></rect>
                      <rect x="10" y="5" width="2" height="20"></rect>
                      <rect x="5" y="5" width="2" height="20"></rect>
                      <rect width="2" height="15"></rect>
                    </svg>
                  </span>
                  <span>参与讨论</span>
                </a>
              </div>
            </div>
          </section>

          <footer className={styles['drip-table-site-footer']}>
            <div className={styles['drip-table-footer-top']}>
              <div className="container">
                <div className="columns">
                  <div className="column">
                    <div className={classNames('pr-5', styles['drip-table-footer-column'])}>
                      <img className={styles['drip-table-footer-drip-icon']} src="http://img30.360buyimg.com/pop/jfs/t1/178931/39/16493/8079/61024235E81cb6a8e/25b1664bdb27aa13.png" alt="" />
                    </div>
                  </div>
                  <div className="column">
                    <div className={classNames('pr-5', styles['drip-table-footer-column'])}>
                      <h3 className="title is-4 has-text-white">相关资源</h3>
                      <ul>
                        <li><a href="https://jdfed.github.io/drip-form" target="_blank" rel="noreferrer">Drip Form</a></li>
                        <li><a href="https://cangdu.org/micro-app/docs.html" target="_blank" rel="noreferrer">Micro App</a></li>
                        <li><a href="https://github.com/JDFED/leo" target="_blank" rel="noreferrer">Leo</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="column">
                    <div className="widget widget_services footer-column">
                      <h3 className="title is-4 has-text-white">帮助</h3>
                      <ul>
                        <li>
                          <a href="https://github.com/JDFED/drip-table" target="_blank" rel="noopener noreferrer">
                            <span className="pr-2"><span role="img" aria-label="github"><svg viewBox="64 64 896 896" focusable="false" data-icon="github" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg></span></span>
                            GitHub
                          </a>
                        </li>
                        <li>
                          <a href="https://gitter.im/drip-table/community" target="_blank" rel="noreferrer">
                            <span className="pr-2"><span role="img" aria-label="profile"><svg viewBox="64 64 896 896" focusable="false" data-icon="profile" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg></span></span>
                            Gitter
                          </a>
                        </li>
                        <li>
                          <a href="https://github.com/JDFED/drip-table/issues/new?assignees=&labels=&template=bug_report.md&title=" target="_blank" rel="noopener noreferrer">
                            <span className="pr-2">
                              <span role="img" aria-label="bug">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="bug" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                  <path d="M304 280h56c4.4 0 8-3.6 8-8 0-28.3 5.9-53.2 17.1-73.5 10.6-19.4 26-34.8 45.4-45.4C450.9 142 475.7 136 504 136h16c28.3 0 53.2 5.9 73.5 17.1 19.4 10.6 34.8 26 45.4 45.4C650 218.9 656 243.7 656 272c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-40-8.8-76.7-25.9-108.1a184.31 184.31 0 00-74-74C596.7 72.8 560 64 520 64h-16c-40 0-76.7 8.8-108.1 25.9a184.31 184.31 0 00-74 74C304.8 195.3 296 232 296 272c0 4.4 3.6 8 8 8z"></path>
                                  <path d="M940 512H792V412c76.8 0 139-62.2 139-139 0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8a63 63 0 01-63 63H232a63 63 0 01-63-63c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8 0 76.8 62.2 139 139 139v100H84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h148v96c0 6.5.2 13 .7 19.3C164.1 728.6 116 796.7 116 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-44.2 23.9-82.9 59.6-103.7a273 273 0 0022.7 49c24.3 41.5 59 76.2 100.5 100.5S460.5 960 512 960s99.8-13.9 141.3-38.2a281.38 281.38 0 00123.2-149.5A120 120 0 01836 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8 0-79.3-48.1-147.4-116.7-176.7.4-6.4.7-12.8.7-19.3v-96h148c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM716 680c0 36.8-9.7 72-27.8 102.9-17.7 30.3-43 55.6-73.3 73.3C584 874.3 548.8 884 512 884s-72-9.7-102.9-27.8c-30.3-17.7-55.6-43-73.3-73.3A202.75 202.75 0 01308 680V412h408v268z"></path>
                                </svg>
                              </span>
                            </span>
                            报告 Bug
                          </a>
                        </li>
                        <li>
                          <a href="https://github.com/JDFED/drip-table/issues" target="_blank" rel="noopener noreferrer">
                            <span className="pr-2"><span role="img" aria-label="issues-close"><svg viewBox="64 64 896 896" focusable="false" data-icon="issues-close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm72-112c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48zm400-188h-59.3c-2.6 0-5 1.2-6.5 3.3L763.7 538.1l-49.9-68.8a7.92 7.92 0 00-6.5-3.3H648c-6.5 0-10.3 7.4-6.5 12.7l109.2 150.7a16.1 16.1 0 0026 0l165.8-228.7c3.8-5.3 0-12.7-6.5-12.7zm-44 306h-64.2c-5.5 0-10.6 2.9-13.6 7.5a352.2 352.2 0 01-49.8 62.2A355.92 355.92 0 01651.1 840a355 355 0 01-138.7 27.9c-48.1 0-94.8-9.4-138.7-27.9a355.92 355.92 0 01-113.3-76.3A353.06 353.06 0 01184 650.5c-18.6-43.8-28-90.5-28-138.5s9.4-94.7 28-138.5c17.9-42.4 43.6-80.5 76.4-113.2 32.8-32.7 70.9-58.4 113.3-76.3a355 355 0 01138.7-27.9c48.1 0 94.8 9.4 138.7 27.9 42.4 17.9 80.5 43.6 113.3 76.3 19 19 35.6 39.8 49.8 62.2 2.9 4.7 8.1 7.5 13.6 7.5H892c6 0 9.8-6.3 7.2-11.6C828.8 178.5 684.7 82 517.7 80 278.9 77.2 80.5 272.5 80 511.2 79.5 750.1 273.3 944 512.4 944c169.2 0 315.6-97 386.7-238.4A8 8 0 00892 694z"></path></svg></span></span>
                            讨论列表
                          </a>
                        </li>
                        <li>
                          <a href="https://github.com/JDFED/drip-table/discussions" target="_blank" rel="noopener noreferrer">
                            <span className="pr-2">
                              <span role="img" aria-label="question-circle">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                                  <path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path>
                                </svg>
                              </span>
                            </span>
                            讨论区
                          </a>
                        </li>
                        <li>
                          <a href="/drip-table/changelog" target="_blank">
                            <span className="pr-2"><span role="img" aria-label="history"><svg viewBox="64 64 896 896" focusable="false" data-icon="history" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M536.1 273H488c-4.4 0-8 3.6-8 8v275.3c0 2.6 1.2 5 3.3 6.5l165.3 120.7c3.6 2.6 8.6 1.9 11.2-1.7l28.6-39c2.7-3.7 1.9-8.7-1.7-11.2L544.1 528.5V281c0-4.4-3.6-8-8-8zm219.8 75.2l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3L752.9 334.1a8 8 0 003 14.1zm167.7 301.1l-56.7-19.5a8 8 0 00-10.1 4.8c-1.9 5.1-3.9 10.1-6 15.1-17.8 42.1-43.3 80-75.9 112.5a353 353 0 01-112.5 75.9 352.18 352.18 0 01-137.7 27.8c-47.8 0-94.1-9.3-137.7-27.8a353 353 0 01-112.5-75.9c-32.5-32.5-58-70.4-75.9-112.5A353.44 353.44 0 01171 512c0-47.8 9.3-94.2 27.8-137.8 17.8-42.1 43.3-80 75.9-112.5a353 353 0 01112.5-75.9C430.6 167.3 477 158 524.8 158s94.1 9.3 137.7 27.8A353 353 0 01775 261.7c10.2 10.3 19.8 21 28.6 32.3l59.8-46.8C784.7 146.6 662.2 81.9 524.6 82 285 82.1 92.6 276.7 95 516.4 97.4 751.9 288.9 942 524.8 942c185.5 0 343.5-117.6 403.7-282.3 1.5-4.2-.7-8.9-4.9-10.4z"></path></svg></span></span>
                            更新日志
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['drip-table-footer-bottom']}>
              <div className="container">
                <div className="is-flex is-justify-content-center">
                  <span className="is-size-7">© 2021 JDFED</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <script type="text/javascript" src="/static/lib/typewriter-effect/index.min.js"></script>
        <script type="text/javascript" src="/static/lib/prismjs/index.min.js"></script>
        <script type="text/javascript" src="/static/lib/image-compare-viewer/index.min.js"></script>
        <script type="text/javascript" src="/static/pages/index.js"></script>
      </React.Fragment>
    )
  }
};
