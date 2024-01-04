import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { AppDispatch } from '../../store/_index'
import { clearCart } from '../../store/cartService'
import style from './StripeResults.module.scss'

function Result() {
  const location = useLocation()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    if (location.pathname === '/success') {
      dispatch(clearCart())
    }
  }, [location.pathname, dispatch])

  if (location.pathname === '/success') {
    return (
      <>
        <div className={style.img}>
          <img src='/success.svg' alt='' />
        </div>
        <div className={style.resultText}>Your payment was successful</div>
        <div className={style.thankText}>Thank you!</div>
      </>
    )
  }
  if (location.pathname === '/cancel') {
    return (
      <>
        <div className={style.img}>
          <img src='/cancel.svg' alt='' />
        </div>
        <div className={style.resultText}>Your payment failed</div>
      </>
    )
  }
}

export default function Success() {
  return (
    <div className={style.StripeResults}>
      <Result />
    </div>
  )
}
