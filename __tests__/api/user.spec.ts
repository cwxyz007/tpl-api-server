import { AxiosInstance } from 'axios'
import { ErrorCode } from '../../src/validator'
import { axios, createAuthAxios } from '../setup'

describe('test', () => {
  let authAxios: AxiosInstance

  beforeAll(async () => {
    authAxios = await createAuthAxios()
  })

  it('login', async () => {
    const { data } = await axios.post('/user/login', {
      username: 'testid123',
      password: '123456789'
    })

    expect(data.code).toEqual(ErrorCode.success)
  })

  it('info', async () => {
    const { data } = await authAxios.get('/user/info')

    expect(data.code).toEqual(ErrorCode.success)

    expect(data.username).toEqual('testid123')
    expect(data.nickName).toEqual('test')
  })
})
