import { FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import UserForm from '../../components/UserForm/UserForm'
import { AppDispatch, RootState } from '../../store/_index'
import { getUserAdmin, updateUserAdmin } from '../../store/userService'

export default function AdminUser() {
  const { userDetail } = useSelector((state: RootState) => state.user)

  const dispatch: AppDispatch = useDispatch()
  const { _id } = useParams()

  useEffect(() => {
    if (_id) dispatch(getUserAdmin(_id))
  }, [_id])

  async function submitHandler(
    e: FormEvent<HTMLFormElement>,
    user: {
      name: string
      email: string
      password: string
      confirmPassword: string
      isAdmin: boolean
    }
  ) {
    e.preventDefault()
    try {
      const { name, email, password, confirmPassword, isAdmin } = user
      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
      }
      await dispatch(
        updateUserAdmin({ name, email, password, isAdmin })
      ).unwrap()
      toast.success('Update success')
    } catch (err) {
      toast.error('Update failed')
    }
  }

  return (
    <UserForm
      submitHandler={submitHandler}
      title='Update user'
      nameField
      emailField
      passwordField
      confirmPasswordField
      isAdminField
      initialUser={{
        name: userDetail.name,
        email: userDetail.email,
        isAdmin: userDetail.isAdmin,
      }}
    />
  )
}
