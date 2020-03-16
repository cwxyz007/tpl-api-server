import Axios from 'axios'
import configs from '@/config'

function createNewAxios() {
  const url = `http://127.0.0.1:${configs.app.port}/api`

  const axios = Axios.create({ baseURL: url })

  return axios
}

export const axios = createNewAxios()
