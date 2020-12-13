import { compare, crypto } from '../tools'

describe('tools', () => {
  it('crypto', async () => {
    expect(await compare('test', await crypto('test'))).toBe(true)
  })
})
