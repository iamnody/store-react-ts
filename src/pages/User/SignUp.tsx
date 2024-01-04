import { FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import UserForm from '../../components/UserForm/UserForm'
import { AppDispatch } from '../../store/_index'
import { signUp } from '../../store/userService'

export default function SignUp() {
  const dispatch: AppDispatch = useDispatch()

  async function submitHandler(
    e: FormEvent<HTMLFormElement>,
    user: {
      name: string
      email: string
      password: string
      confirmPassword: string
    }
  ) {
    e.preventDefault()
    try {
      const { name, email, password, confirmPassword } = user
      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
      }
      await dispatch(signUp({ name, email, password })).unwrap()
    } catch (err) {
      toast.error('Sign up failed')
    }
  }

  return (
    <UserForm
      submitHandler={submitHandler}
      title='Create account'
      nameField
      emailField
      passwordField
      confirmPasswordField
      isSignUp
    />
  )
}
