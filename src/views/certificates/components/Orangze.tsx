import React, {useEffect, useCallback, useState, useRef} from 'react';
import { Table, Input, Modal, Button, Form, Select } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { getOrangze } from '../../../api'

export enum CERTUSE {
  SIGNCERT = 0,
  SIGNKEY,
  TLSCERT,
  TLSKEY,
}

type ValueOf<T> = T[keyof T];
export const ChainAlgorithm = {
  CN: 0,
  NOT_CN: 1,
}


const CertUseMap: {[index: number]: string} = {
  0: '签名证书',
  1: '签名私钥', 
  2: 'tls证书',
  3: 'tls私钥'
}

interface DataType {
  Id: number;
  UserName: string;
  OrgName: string;
  NodeName: string;
  CertUse: ValueOf<typeof CERTUSE>; //
  // public 账户类型 1 用户 2 节点
  CertType: number; // 0: 根证书 1: ca证书 2: 用户admin证书 3: 用户client证书 4: 共识节点证书 5: 同步节点证书
  CreateTime: number;
  Algorithm: ValueOf<typeof ChainAlgorithm>;
  RemarkName: string; // 账户地址
  Addr: string; //	账户地址

}

interface TableParams {
  pagination: TablePaginationConfig;
}

export const Orangze: React.FC<{search?: string}> = (props) => {
  const columns: ColumnsType<DataType> = [
    {
      title: '组织名称',
      dataIndex: 'OrgName',
      key: 'OrgName'
    },
    {
      title: '证书用途',
      dataIndex: 'CertUse',
      key: 'CertUse',
      render: (text) => (CertUseMap[text]),
    },
    {
      title: '密码算法',
      dataIndex: 'Algorithm',
      key: 'Algorithm',
      render: (text) => ChainAlgorithm.CN === text ? '国密' : '非国密'
    },
    {
      title: '创建时间',
      key: 'CreateTime',
      dataIndex: 'CreateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
          <a>删除</a>
      ),
    },
  ];
  
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [OrgName, setOrgName] = useState<string>();
  const [total, setTotal] = useState<number>(0);
  const [isModalOpen, setModelOpen] = useState(false)

  const baseForm = useRef(null)

  const onSearch = (val: string) => {
    setOrgName(val)
  }

  const onFinish = async (values: any) => {
    console.log(values, 323)
  };

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleChange = (pagination: any) => {
    const {total, ...p} = pagination
    setTableParams({pagination: p})
  }

  const handleOK = async () => {
    const current: any = baseForm.current
    await current.validateFields()
    console.log(current.getFieldsValue())
    setModelOpen(false)
    getTableData()
  }

  const getTableData = useCallback(async () => {
    const params: any = {
      Type: 0,
      [props.search || 'orgName']: OrgName,
      PageNum: tableParams.pagination.current,
      PageSize: tableParams.pagination.pageSize,
      ChainMode: "permissionedWithCert"
    }
    setLoading(true)
    const res: any = await getOrangze(params)
    setTotal(res.TotalCount)
    setLoading(false)
    setData(res.GroupList.map((i: any, key: number)=> Object.assign(i, {Id: i.Id + key + '', OrgName: i.OrgName+= Math.random()})))
  }, [OrgName, tableParams])
  console.log(React)
  useEffect(() => {
    getTableData()
  },[getTableData])
  
  return (
    <>
      <Modal title="申请证书" open={isModalOpen} onOk={handleOK} onCancel={()=> setModelOpen(false)}>
        <Form
        ref={baseForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="组织Id"
          name="Id"
          rules={[{ required: true, message: '请输入!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="组织名称"
          name="OrgName"
          rules={[{ required: true, message: '请输入!' }]}
        >
          <Input />
          </Form.Item>

        <Form.Item
          label="密码算法"
          name="diff"
          rules={[{ required: true, message: '请选择!' }]}
        >
           <Select
              options={[{ value: 'cn', label: '国密' }, { value: 'not_cn', label: '非国密' }]}
            />
          </Form.Item>
        </Form>
      </Modal>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {
          !props.search && (
            <Button type="primary" onClick={()=> setModelOpen(true)}>
              申请证书
            </Button>
          )
        }
        &nbsp;
        <Input.Search placeholder="请输入名称" onSearch={onSearch} style={{ width: 200 }} />
      </div>
      <Table columns={columns}
        rowKey={(record) => record.Id}
        dataSource={data}
        pagination={{...tableParams.pagination, total: total}}
        loading={loading}
       onChange={handleChange}
      />
    </>
  )
}

