export const validateRegistrationForm = (values: FormikErrorType): FormikErrorType => {
  const errors: FormikErrorType = {}

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 8) {
    errors.password = 'Password must be more than 7 characters'
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'passwords must match'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = 'Invalid email address'

  return errors
}
export type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}
