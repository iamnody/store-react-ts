// import { Link } from 'react-router-dom'
import './Footer.scss'

export default function Footer() {
  return (
    <footer className='footer'>
      {/* <div className='footer-content'> */}
      <h3>Oliver's</h3>
      <div className='boxA'>
        <p>Providing quality services since 2023.</p>
        {/* <ul className='footer-links'>
          <li>
          <Link to='#about'>About Us</Link>
          </li>
          <li>
          <Link to='#services'>Services</Link>
          </li>
          <li>
          <Link to='#contact'>Contact</Link>
          </li>
        </ul> */}
        {/* </div> */}
        {/* <div className='footer-bottom'> */}
        <p>&copy; 2023 Oliver. All rights reserved.</p>
      </div>
      {/* </div> */}
    </footer>
  )
}
