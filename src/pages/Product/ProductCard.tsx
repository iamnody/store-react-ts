import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Price from '../../components/Price/Price'
import Rating from '../../components/Rating/Rating'
import { AppDispatch, RootState } from '../../store/_index'
import { addCartItemQty, addCartItemQtyLocal } from '../../store/cartService'
import { getProduct } from '../../store/productService'
import style from './ProductCard.module.scss'

export default function ProductCard() {
  const [mainImage, setMainImage] = useState('')
  const [qty, setQty] = useState(1)

  const { user } = useSelector((state: RootState) => state.user)
  const { product } = useSelector((state: RootState) => state.product)

  const dispatch: AppDispatch = useDispatch()
  const { _id } = useParams()

  useEffect(() => {
    if (_id) {
      dispatch(getProduct(_id))
    }
  }, [_id])

  useEffect(() => {
    if (product.images.length > 0) {
      setMainImage(product.images[0].url)
    }
  }, [product.images])

  function addCartItemQtyHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = {
      product: product._id,
      name: product.name,
      url: product.images[0].url,
      price: product.price,
      qty,
    }
    if (user) {
      dispatch(addCartItemQty(formData))
    } else {
      dispatch(addCartItemQtyLocal(formData))
    }
  }

  return (
    <div className={style.ProductCard}>
      {/* img */}
      <div className={style.img}>
        <div className={style.largeImg}>
          <img src={mainImage} alt={product.name} />
        </div>
        <div className={style.smallImgList}>
          {product.images.map((img, i) => {
            if (i + 1 >= 5) return
            return (
              <div
                className={style.smallImg}
                key={i}
                onClick={() => setMainImage(img.url)}
              >
                <img src={img.url} alt={product.name} />
              </div>
            )
          })}
        </div>
      </div>
      {/* content */}
      <div className={style.content}>
        <p className={style.category}>{product.category}</p>
        <h1 className={style.name}>{product.name}</h1>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Price product={product} />
        <form className={style.qty} onSubmit={addCartItemQtyHandler}>
          <p className={`${style.stock} ${product.qty > 0 && style.inStock}`}>
            {product.qty > 0 ? 'In Stock' : 'Out Of Stock'}
          </p>
          <select
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            required
          >
            {Array.from(Array(product.qty).keys()).map((x, i) => (
              <option key={i} value={x + 1}>
                {x + 1} {i === 0 && <span> - Quantity</span>}
              </option>
            ))}
          </select>
          <button className='btn-block' disabled={product.qty === 0}>
            Add To Cart
          </button>
        </form>
        <p className={style.description}>{product.description}</p>
      </div>
    </div>
  )
}
