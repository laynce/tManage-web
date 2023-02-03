import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {LocalStore} from './local'

const http: AxiosInstance = axios.create({
  baseURL: '/chainmaker',
  timeout: 1000
})

http.interceptors.request.use((config) => {
  const token: string | null = LocalStore.getToken()
  if (token) {
    Object.assign(config.headers, { token })
  }
  return config
})

http.interceptors.response.use((response: AxiosResponse) => {
  const { data: { Response } } = response
      
  if (Response.Error) {
    return Promise.reject(Response.Error)
  }
  return Promise.resolve(Response)
})

export const  httpPromise = ({params, data, headers, ...rest}: AxiosRequestConfig): Promise<AxiosResponse>=> {
  const config: AxiosRequestConfig = {
    params,
    data,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...headers
    },
    ...rest
  }

  return new Promise((resolve, reject) => {
    http(config).then((res: AxiosResponse) => {
     resolve(res)
    }, () => {
      reject({Message: '系统错误'})
    })
  })
}


export const Api = (cmb: string, data?: any, otherConfig?: any): Promise<AxiosResponse> => {
  return httpPromise({
    params: { cmb },
    data,
    ...(otherConfig || {})
  })
}