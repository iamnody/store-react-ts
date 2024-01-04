import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../store/_index'
import style from './UserForm.module.scss'

type Props = {
  submitHandler: (
    e: FormEvent<HTMLFormElement>,
    user: {
      name: string
      email: string
      password: string
      confirmPassword: string
      isAdmin: boolean
    }
  ) => void
  title: string
  nameField?: boolean
  emailField?: boolean
  passwordField?: boolean
  confirmPasswordField?: boolean
  isAdminField?: boolean
  isSignUp?: boolean
  isSignIn?: boolean
  initialUser?: {
    name: string
    email: string
    isAdmin?: boolean
  }
}

export default function UserForm({
  submitHandler,
  title,
  nameField,
  emailField,
  passwordField,
  confirmPasswordField,
  isAdminField,
  isSignUp,
  isSignIn,
  initialUser,
}: Props) {
  const [user, setUser] = useState({
    name: 'a',
    email: 'a@a.com',
    password: '123',
    confirmPassword: '123',
    isAdmin: false,
  })

  const { user: userCredential } = useSelector((state: RootState) => state.user)

  const navigate = useNavigate()
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const redirect = sp.get('redirect')

  useEffect(() => {
    if (userCredential && redirect) {
      navigate(redirect)
    } else if (userCredential && (isSignUp || isSignIn)) {
      navigate('/')
    }
  }, [navigate, redirect, userCredential])

  useEffect(() => {
    if (initialUser) {
      setUser({ ...user, ...initialUser })
    }
  }, [initialUser])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.checked })
  }

  return (
    <div className={style.UserForm}>
      <h1 className={style.title}>{title}</h1>
      <form onSubmit={(e) => submitHandler(e, user)}>
        {nameField && (
          <div className={style.formControl}>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
        )}
        {emailField && (
          <div className={style.formControl}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
        )}
        {passwordField && (
          <div className={style.formControl}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={user.password}
              onChange={handleInputChange}
            />
          </div>
        )}
        {confirmPasswordField && (
          <div className={style.formControl}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={user.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        )}

        {isAdminField && (
          <div className={style.formControl}>
            <label htmlFor='isAdmin'>Admin</label>
            <input
              className={style.isAdmin}
              type='checkbox'
              id='isAdmin'
              name='isAdmin'
              checked={user.isAdmin}
              onChange={handleCheckboxChange}
            />
          </div>
        )}
        <button className='' type='submit'>
          Submit
        </button>
        <small>
          {isSignUp && (
            <>
              Already a customer? <Link to='/signIn'>Sign in</Link>
            </>
          )}
          {isSignIn && (
            <>
              New customer? <Link to='/signUp'>Create account</Link>
            </>
          )}
        </small>
      </form>
    </div>
  )
}
