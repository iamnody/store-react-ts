import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/_index'
import Header from './Header'
import style from './Navbar.module.scss'
import Sidebar from './Sidebar'

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false)

  const { user } = useSelector((state: RootState) => state.user)
  const { cart } = useSelector((state: RootState) => state.cart)

  return (
    <nav className={`${style.Navbar} globalMaxWidth`}>
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        user={user}
        cart={cart}
      />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
    </nav>
  )
}
