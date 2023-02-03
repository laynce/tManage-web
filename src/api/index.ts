import { Api } from '../common/http'
import { LoginParams } from '../common/type'
import { AxiosResponse} from 'axios'
import md5 from 'md5';
// Login 相关
export const getCaptcha = (): Promise<AxiosResponse>=> {
  return Api('GetCaptcha')
}

export const doLogin = (params: LoginParams):  Promise<AxiosResponse>=> {
  return Api('Login', {...params, Password: md5(params.Password)})
}
