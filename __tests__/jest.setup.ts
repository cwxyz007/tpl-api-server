import configs from '../src/config'
import { axios } from './setup'

const user = {
  username: 'testid123'
}

/**
 * 初始化函数，运行一次即可
 */
async function setup() {
  try {
    await axios.post('/user/register', {
      username: user.username,
      password: '123456789',
      nickName: 'test',
      registerCode: configs.registerCode[0]
    })
    console.log('register user', user.username)
  } catch (error) {
    console.log(error)
  }
}

export default setup
