import React, {useState, useEffect, useCallback} from 'react';
import { Button, Form, Input } from 'antd';
import { getCaptcha } from '../../api'
import { useLoin } from '../../common/hooks'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
  const [captcha, setCaptcha] = useState<string>()
  const {login} = useLoin()
  const onFinish = async (values: any) => {
    login(values)
  };

  const handleCaptchaClick = useCallback(async () => {
    const res: any = await getCaptcha()
    setCaptcha(res.Data.Content)
  }, [])

  useEffect(() => {
    handleCaptchaClick()
  }, [handleCaptchaClick])
  
  return (
    <div className='login'>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="UserName"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="Password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="验证码"
        >
          <Form.Item
            name="Captcha"
            rules={[{ required: true, message: '请输入验证码!' }]}
            style={{ display: 'inline-block', width: 'calc(100% - 180px)'}}
          >
            <Input />
          </Form.Item>
          <img src={captcha} onClick={handleCaptchaClick} className='login-vercode' alt=''/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            立即登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;