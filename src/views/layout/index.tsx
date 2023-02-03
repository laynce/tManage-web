import { Outlet,  useNavigate} from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import {useResponse} from '../../common/type'
import { LocalStore } from '../../common/local'
import Menu from './menu'
import { Layout, Button, Avatar, Dropdown, MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';


const { Sider, Content, Header } = Layout;

const headerStyle: React.CSSProperties = {
  color: '#fff',
  height: 60,
  lineHeight: '64px',
  backgroundColor: '#262f3e',
};


// 触发菜单收起折叠
const Trigger: React.FC<{collapsed: boolean, toggleCollapsed: ()=> void}> = (props) => {
  return (
    <Button type="primary" onClick={props.toggleCollapsed} style={{ marginBottom: 16 }}>
      {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </Button>
  )
}

export default function Lay() {
  const [user, setUser] = useState<useResponse | null>(null)
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const navigate = useNavigate()

  const loginOut = () => {
    localStorage.clear()
    goLogin()
  }

  const dropTtems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span onClick={loginOut}>
          退出
        </span>
      ),
    }
  ]

  const goLogin = useCallback(() => {
    if (LocalStore.getToken()) {
      const user = LocalStore.getUser();
      setUser(user);
    } else {
      setUser(null);
      navigate('/login')
    }
  }, [navigate])
  
  useEffect(() => {
    goLogin()
    // return () => {
    //   console.log(5665) // 卸载时会执行
    // }
  }, [goLogin])

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {
        user && (
        
        <Layout style={{height: '100%'}}>
            <Header style={headerStyle}>
              Maker管理平台
              <div style={{float: 'right'}}>
                <Dropdown menu={{ items: dropTtems }} placement={'bottomRight'}>
                  <span onClick={(e) => e.preventDefault()} >
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  </span>
                </Dropdown>
              </div>
                
            </Header>
          <Layout>
              <Sider collapsible collapsed={collapsed} trigger={
                <Trigger collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
              }>
                <Menu />
              </Sider>
            <Content><Outlet></Outlet></Content>
          </Layout>
        </Layout>
        )
      }
    </>
  )
}

