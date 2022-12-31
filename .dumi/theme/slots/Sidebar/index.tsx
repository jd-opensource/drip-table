import { NavLink, useLocation, useRouteMeta, useSidebarData } from 'dumi';
import Toc from 'dumi/theme/slots/Toc';
import React from 'react';

import './index.less';

interface SidebarItem {
  title: string;
  link: string;
  children?: SidebarItem[];
}

const isSidebarActive = (sidebarItem: SidebarItem, pathname: string) => {
  return sidebarItem.link === pathname || sidebarItem.children?.some(c => isSidebarActive(c, pathname)) || false;
};

const renderSidebarChildren = (children: SidebarItem[], pathname: string, level = 1) => (
  <React.Fragment>
    {
      children.map((c, i) => {
        const isActive = isSidebarActive(c, pathname);
        return (
          <React.Fragment key={i}>
            <li>
              <NavLink style={{ paddingInlineStart: `${8 * level + 2}px`, color: isActive ? '#2a64ff' : '' }} to={c.link} title={c.title} end>
                {c.title}
              </NavLink>
            </li>
            {
              isActive && c.children
              ? <React.Fragment>
                {renderSidebarChildren(c.children, pathname, level + 1) }
                <li style={{ lineHeight: '0', paddingBottom: '1px' }}/>
              </React.Fragment>
              : null
            }
          </React.Fragment>
        );
      })
    }
  </React.Fragment>
);

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const meta = useRouteMeta();
  const sidebar = useSidebarData();

  if (!sidebar) {
    return null
  };

  return (
    <div className="dumi-default-sidebar">
      {sidebar.map((item, i) => (
        <dl className="dumi-default-sidebar-group" key={String(i)}>
          {
            item.title
              ? <dt>{item.title}</dt>
              : null
          }
          {
            item.children.map((child) => {
              const isActive = isSidebarActive(child, pathname);
              return (
                <dd key={child.link}>
                  <NavLink style={{ color: isActive ? '#2a64ff' : '' }} to={child.link} title={child.title} end>
                    {child.title}
                  </NavLink>
                  {
                    isActive && child.children
                      ? (
                        <ul className="dumi-default-toc">
                          {renderSidebarChildren(child.children, pathname)}
                        </ul>
                      )
                      : null
                  }
                  {
                    isActive && meta.frontmatter.toc === 'menu'
                      ? (<Toc />)
                      : null
                  }
                </dd>
              );
            })
          }
        </dl>
      ))}
    </div>
  );
};

export default Sidebar;
