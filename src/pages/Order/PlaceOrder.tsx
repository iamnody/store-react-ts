import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../store/_index'
import { placeOrder } from '../../store/orderService'
import style from './PlaceOrder.module.scss'

export default function PlaceOrder() {
  const { user } = useSelector((state: RootState) => state.user)
  const { cart } = useSelector((state: RootState) => state.cart)

  const dispatch: AppDispatch = useDispatch()

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  )
  const totalQty = cart.reduce((total, item) => total + item.qty, 0)

  async function onClickPayHandler() {
    const dataObject = {
      items: cart,
      shippingAddress: user.address,
      paymentMethod: 'visa',
      itemsPrice: subtotal,
      shippingPrice: 0,
      taxPrice: subtotal * 0.05,
      totalPrice: subtotal * 1.05,
    }
    try {
      const res = await dispatch(placeOrder(dataObject)).unwrap()
      window.location.href = res.url
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

  return (
    <div className={style.PlaceOrder}>
      <h1>Place your order</h1>
      <button className={style.orderBtn} onClick={() => onClickPayHandler()}>
        Place your order
      </button>

      <hr />

      <div className={style.summary}>
        <h3>Summary</h3>
        <p>
          Subtotal({totalQty} items): <span>${subtotal}</span>
        </p>
        <p>
          Shipping & Handling: <span>$0.00</span>
        </p>
        <p>
          Estimated Tax: <span>${(subtotal * 0.05).toFixed(2)}</span>
        </p>
        <p>
          Order Total: <span>${(subtotal * 1.05).toFixed(2)}</span>
        </p>
      </div>

      <hr />

      <div className={style.address}>
        <h3>Shipping address</h3>
        <p>{user.address.name}</p>
        <p>
          {user.address.address}, {user.address.city}, {user.address.province}
        </p>
        <p>{user.address.postalCode}</p>
        {/* <div >{user.address.phoneNumber}</div> */}
        <button>
          <Link to='/address'>Change delivery address</Link>
        </button>
      </div>

      <hr />

      <div className={style.payment}>
        <h3>Paying with Visa 1234</h3>
        <button>Change payment method</button>
      </div>

      <hr />

      <div className={style.itemList}>
        {cart?.map((item, i) => (
          <div className={style.card} key={i}>
            <div className={style.img}>
              <img src={item.url} />
            </div>
            <div className={style.content}>
              <p className={style.name}>{item.name}</p>
              <p className={style.price}>
                ${item.price} x {item.qty} = ${item.price * item.qty}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <button className={style.orderBtn} onClick={() => onClickPayHandler()}>
        Place your order
      </button>
    </div>
  )
}
