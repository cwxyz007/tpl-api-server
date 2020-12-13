import Axios from 'axios'
import configs from '../src/config'

function createNewAxios() {
  const url = `http://127.0.0.1:${configs.app.port}/api`

  const axiosInstance = Axios.create({ baseURL: url })

  return axiosInstance
}

export async function createAuthAxios() {
  const axiosInstance = createNewAxios()

  const { data } = await axiosInstance.post('/user/login', {
    username: 'testid123',
    password: '123456789'
  })

  axiosInstance.defaults.headers = {
    Authorization: `Bearer ${data.accessToken}`
  }

  return axiosInstance
}

export const axios = createNewAxios()
