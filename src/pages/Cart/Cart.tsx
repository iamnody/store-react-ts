import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../store/_index'
import {
  addCartItemQty,
  addCartItemQtyLocal,
  deleteCartItem,
  deleteCartItemLocal,
  subCartItemQty,
  subCartItemQtyLocal,
} from '../../store/cartService'
import style from './Cart.module.scss'

export default function CartPage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { cart } = useSelector((state: RootState) => state.cart)
  const dispatch: AppDispatch = useDispatch()

  const addHandler = (product: string) => {
    user
      ? dispatch(addCartItemQty({ product, qty: 1 }))
      : dispatch(addCartItemQtyLocal({ product, qty: 1 }))
  }
  const subHandler = (product: string) => {
    user
      ? dispatch(subCartItemQty(product))
      : dispatch(subCartItemQtyLocal(product))
  }
  const deleteHandler = (product: string) => {
    user
      ? dispatch(deleteCartItem(product))
      : dispatch(deleteCartItemLocal(product))
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  )
  return (
    <div className={style.Cart}>
      <h1>Cart</h1>
      <div className={style.itemList}>
        {cart?.map((item, i) => (
          <div className={style.card} key={i}>
            <div className={style.img}>
              <img src={item.url} />
            </div>
            <div className={style.content}>
              <p className={style.name}>{item.name}</p>
              <div className={style.qtyControlWapper}>
                <div className={style.qtyControl}>
                  <FiMinus
                    className={style.minus}
                    onClick={() => subHandler(item.product)}
                  />
                  <div className={style.qty}>{item.qty}</div>
                  <FiPlus
                    className={style.plus}
                    onClick={() => addHandler(item.product)}
                  />
                </div>
                <FiTrash2
                  className={style.delete}
                  onClick={() => deleteHandler(item.product)}
                />
              </div>
              <p className={style.price}>
                ${item.price} x {item.qty} = ${item.price * item.qty}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={style.subtotal}>
        <h2>
          <span>Subtotal: $</span>
          {subtotal}
        </h2>
        <Link to='/Address'>
          <button>Proceed to checkout</button>
        </Link>
      </div>
    </div>
  )
}
