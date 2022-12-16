import { FormikErrorType } from '../registration/RegistrationTypes'

export const validateNewPasswordForm = (values: FormikErrorType): FormikErrorType => {
  const errors: FormikErrorType = {}

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be more than 7 characters'
  }

  return errors
}
