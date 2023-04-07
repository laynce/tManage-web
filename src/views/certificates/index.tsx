import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Orangze } from "./components/Orangze";

const App: React.FC = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `组织证书`,
      children: <Orangze></Orangze>,
    },
    {
      key: '2',
      label: `节点证书`,
      children: <Orangze search="nodeType"></Orangze>,
    },
    {
      key: '3',
      label: `用户证书`,
      children: <Orangze search="nodeType2"></Orangze>,
    },
  ];

  const onChange = (key: String)=> {

  }

  return (
    <div>
      <h3 >证书账户</h3>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>

  )
};

export default App;

