import { BasicModel } from './Basic'
import { Entity, Column } from 'typeorm'

@Entity('user')
export class UserModel extends BasicModel {
  @Column({ unique: true })
  username!: string

  @Column({ length: 16 })
  nickName!: string

  @Column({ select: false })
  password!: string

  @Column({ default: false })
  vip!: number
}
