import style from './Product.module.scss'
import ProductCard from './ProductCard'
import Review from './Review'

export default function Product() {
  return (
    <div className={style.Product}>
      <ProductCard />
      <Review />
    </div>
  )
}
