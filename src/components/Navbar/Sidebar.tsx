import { Link } from 'react-router-dom'
import style from './Sidebar.module.scss'

export default function Sidebar({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <div className={`${style.Sidebar} ${showSidebar ? style.show : ''}`}>
      <div className={style.container}>
        <div
          className={style.toggleClose}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <span className='span-1'></span>
          <span className='span-2'></span>
        </div>
        <Link className={style.brand} to='/'>
          <h2>
            <span>O</span>liver's Store
          </h2>
        </Link>
        <ul>
          <li>
            <h4 className='title'>Trending</h4>
          </li>
          <li>
            <Link to='#/'>Best Sellers</Link>
          </li>
          <li>
            <Link to='#/'>New Releases</Link>
          </li>
          <li>
            <Link to='#/'>Computers & Tablets</Link>
          </li>
          <li>
            <Link to='#/'>Home</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
