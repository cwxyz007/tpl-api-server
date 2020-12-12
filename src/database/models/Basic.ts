import { CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

export abstract class BasicModel extends BaseEntity {
  static readonly __isModel__ = true

  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({ select: false })
  createAt!: number

  @UpdateDateColumn({ select: false })
  updateAt!: number
}
