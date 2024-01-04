import { Link } from 'react-router-dom'
import { Product } from '../../@types/product'
import Price from '../../components/Price/Price'
import Rating from '../../components/Rating/Rating'
import style from './ProductList.module.scss'

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className={style.ProductList}>
      {products?.map((product) => (
        <Link
          className={style.productCard}
          to={`/product/${product._id}`}
          key={product._id}
        >
          <div className={style.cardImg}>
            <img src={product.images[0]?.url} alt={product.name} />
          </div>
          <div className={style.cardBody}>
            <p className={style.category}>{product.category}</p>
            <p className={style.name}>{product.name}</p>
            <Price product={product} />
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
        </Link>
      ))}
    </div>
  )
}
