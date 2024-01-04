import { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import UserForm from '../../components/UserForm/UserForm'
import { AppDispatch, RootState } from '../../store/_index'
import { updateUser } from '../../store/userService'

export default function Profile() {
  const dispatch: AppDispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.user)

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
      await dispatch(updateUser({ name, email, password })).unwrap()
    } catch (err) {
      toast.error('Update failed')
    }
  }

  return (
    <UserForm
      submitHandler={submitHandler}
      title='Update Profile'
      nameField
      emailField
      passwordField
      confirmPasswordField
      initialUser={user}
    />
  )
}
