import {useResponse, LoginParams} from './type'
export class LocalStore {

  static getToken(): string | null {
    return localStorage.getItem('LOGIN_TOKEN')
  }
  static getUser():  useResponse{
    return JSON.parse(localStorage.getItem('LOGIN_USER') as string);
  }

  static setUser(param: LoginParams): void{
    localStorage.setItem('LOGIN_USER', JSON.stringify(param))
  }

  static setToken(val: string): void {
    localStorage.setItem('LOGIN_TOKEN', val)
  }
}