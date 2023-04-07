import { Api } from '../common/http'
import type { LoginParams, OrangzeParam } from '../common/type'
import { AxiosResponse} from 'axios'
import md5 from 'md5';
// Login 相关
export const getCaptcha = (): Promise<AxiosResponse>=> {
  return Api('GetCaptcha')
}

export const doLogin = (params: LoginParams):  Promise<AxiosResponse>=> {
  return Api('Login', {...params, Password: md5(params.Password)})
}


export const getOrangze = (params: OrangzeParam): Promise<AxiosResponse> => {
  return Api('GetCertList', params)
}
