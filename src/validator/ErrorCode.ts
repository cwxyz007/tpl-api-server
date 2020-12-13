export interface ErrorData {
  code: number
  message: string
}

export const ErrorCode = {
  unknown: {
    code: 0,
    message: 'Unknown'
  },
  success: {
    code: 1,
    message: 'Success'
  },
  invalidPassword: {
    code: 2,
    message: 'Invalid password'
  },
  invalidUsername: {
    code: 3,
    message: 'Invalid username'
  },
  loginFailed: {
    code: 4,
    message: 'Login failed'
  },
  duplicateUsername: {
    code: 5,
    message: 'Duplicate username'
  },
  invalidRegisterCode: {
    code: 6,
    message: 'Invalid register code'
  },
  invalidToken: {
    code: 7,
    message: 'Invalid Token'
  },
  exist: {
    code: 8,
    message: 'Exist'
  },
  notExist: {
    code: 9,
    message: 'Not exist'
  },
  permissionDenied: {
    code: 10,
    message: 'Permission denied'
  }
}
