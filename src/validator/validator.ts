import { ErrorCode } from './ErrorCode'
import configs from '../config'
import Joi from '@hapi/joi'

export class ResError extends Error {
  code: number

  constructor(msg?: string, code: number = ErrorCode.unknown) {
    super(msg)
    this.code = code
  }
}

interface ValidateSchema {
  schema: Joi.Schema
  code: ErrorCode
}

const schemas: Record<string, ValidateSchema> = {
  password: {
    schema: Joi.string().alphanum().min(8).max(16),
    code: ErrorCode.invalidPassword
  },
  username: {
    schema: Joi.string().alphanum().min(4).max(16),
    code: ErrorCode.invalidUsername
  },
  registerCode: {
    schema: Joi.custom((value, helper) => {
      if (!configs.registerCode.includes(value)) {
        return helper.error('Invalid register code')
      }

      return value
    }),
    code: ErrorCode.invalidRegisterCode
  }
}

type Schemas = typeof schemas

type Validators<T extends unknown> = {
  [K in keyof T]: (value: unknown) => void
}

export const validator: Validators<Schemas> = {}

for (const key in schemas) {
  const opt: ValidateSchema = schemas[key]
  validator[key] = (value: unknown) => {
    const result = opt.schema.validate(value)

    const err = result.error || result.errors

    if (err) {
      throw new ResError(err.message, opt.code)
    }
  }
}
