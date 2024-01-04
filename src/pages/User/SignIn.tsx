import { FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import UserForm from '../../components/UserForm/UserForm'
import { AppDispatch } from '../../store/_index'
import { signIn } from '../../store/userService'

export default function SignIn() {
  const dispatch: AppDispatch = useDispatch()

  async function submitHandler(
    e: FormEvent<HTMLFormElement>,
    user: {
      email: string
      password: string
    }
  ) {
    e.preventDefault()
    try {
      const { email, password } = user
      await dispatch(signIn({ email, password })).unwrap()
    } catch (err) {
      toast.error('Sign in failed')
    }
  }

  return (
    <UserForm
      submitHandler={submitHandler}
      title='Sign in'
      emailField
      passwordField
      isSignIn
    />
  )
}
