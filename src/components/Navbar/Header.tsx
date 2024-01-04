import { useEffect, useRef, useState } from 'react'
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../store/_index'
import { signOut } from '../../store/userService'
import style from './Header.module.scss'

export default function Nav({
  showSidebar,
  setShowSidebar,
  user,
  cart,
}: {
  showSidebar: boolean
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
  user: any
  cart: any
}) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const dropdownToggleRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!dropdownToggleRef.current?.contains(e.target as HTMLDivElement)) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
      setShowDropdown(false)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownToggleRef, showDropdown])

  const signOutHandler = async () => {
    dispatch(signOut())
  }

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchTerm) return
    navigate(`/?search=${searchTerm}`)
  }

  return (
    <div className={style.Header}>
      {/* ---------------------------------------- left */}
      <div className={style.left}>
        <div
          className={style.toggleOpen}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Link className={style.brand} to='/'>
          <span>O</span>liver's
        </Link>
      </div>
      {/* ---------------------------------------- right */}
      <div className={style.right}>
        {user ? (
          <>
            <div
              className={style.user}
              onClick={() => setShowDropdown(!showDropdown)}
              ref={dropdownToggleRef}
            >
              <span>{user.name}</span>
              <small className='entity'>&#62;</small>
              <FiUser />
              <div
                className={`${style.dropdownMenu} ${
                  showDropdown ? style.show : ''
                }`}
              >
                <Link to='/profile'>Profile</Link>
                <Link to='/orders'>Orders</Link>
                {user.isAdmin && (
                  <>
                    <Link to='/admin/users'>Admin Users</Link>
                    <Link to='/admin/products'>Admin Products</Link>
                    {/* <Link to='/admin/orders'>Admin Orders</Link> */}
                  </>
                )}
                <button onClick={signOutHandler}>Sign out</button>
              </div>
            </div>
          </>
        ) : (
          <Link className={style.user} to='/signin'>
            <span>Sign in</span>
            <small className='entity'>&#62;</small>
            <FiUser />
          </Link>
        )}
        <Link className={style.cart} to='/cart'>
          <FiShoppingCart />
          <span>
            {cart?.reduce((acc: any, item: any) => acc + item.qty, 0)}
          </span>
        </Link>
      </div>
      {/* ---------------------------------------- searchBar */}
      <form className={style.searchbar} onSubmit={searchSubmitHandler}>
        <input
          type='text'
          placeholder={`Welcome to Oliver's store!`}
          value={searchTerm}
          required
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type='submit'>
          <FiSearch />
        </button>
      </form>
    </div>
  )
}
