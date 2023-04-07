import React from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'; 

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/guide">首页</Link>, '1', <PieChartOutlined />),
  getItem('账户管理', '2', <MailOutlined />, [
    getItem(<Link to="/">证书账户</Link>, '2-5'),
    getItem('公钥账户', '2-6'),
  ]),
  getItem('区块链管理', '3', <ContainerOutlined />),
  getItem('平台账号管理', '4', <AppstoreOutlined />),
  getItem('监控管理', '5', <DesktopOutlined />),
];

const  Menut: React.FC = () => {

  return (
    <div >
      <Menu
        defaultSelectedKeys={['2-5']}
        defaultOpenKeys={['2']}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  );
};

export default Menut