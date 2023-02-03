import { doLogin } from '../api'
import { LoginParams} from './type'
import { LocalStore} from './local'
import { useNavigate } from 'react-router-dom'

export const useLoin = () => {
  const navigate = useNavigate()

  const login = async (param: LoginParams) => {
    const res: any = await doLogin(param)
    if (res.Data.Token) {
      LocalStore.setToken(res.Data.Token)
      LocalStore.setUser(param)
      navigate('/')
      console.log('登录成功')
    } else {
      localStorage.clear()
    }
  }

  return {
    login
  }
}