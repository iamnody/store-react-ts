import style from './Price.module.scss'

export default function Price({
  product,
}: {
  product: {
    price: number
    discount: number
    description: string
  }
}) {
  return (
    <p className={style.Price}>
      {product.discount > 0 && (
        <span className={style.discount}>
          <small>$</small>
          {product.discount}
        </span>
      )}
      <span className={`${product.discount > 0 && style.disabled}`}>
        {product.discount > 0 ? '$' : <small>$</small>}
        {product.price}
      </span>
    </p>
  )
}
