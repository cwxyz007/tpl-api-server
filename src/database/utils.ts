import { getConnection, Connection, EntityManager } from 'typeorm'
import { logger } from '../utils'

export function isDatabaseModel(target: any) {
  return target && target.__isModel__
}

export async function transaction<T>(
  cb: (manager: EntityManager) => Promise<T>,
  conn?: Connection
): Promise<T | undefined> {
  const connection = conn || getConnection()
  const queryRunner = connection.createQueryRunner()
  let err = null
  try {
    await queryRunner.startTransaction()
    const result = await cb(queryRunner.manager)
    await queryRunner.commitTransaction()

    return result
  } catch (error) {
    await queryRunner.rollbackTransaction()
    logger.error('transaction', error)
    err = error
  } finally {
    await queryRunner.release()
  }

  if (err) {
    throw err
  }
}
