import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import Carousel from '../../components/Carousel/Carousel'
import Pagination from '../../components/Pagination/Pagination'
import { AppDispatch, RootState } from '../../store/_index'
import { getProducts } from '../../store/productService'
import style from './Home.module.scss'
import LandingContent from './LandingContent'
import ProductList from './ProductList'

export default function Home() {
  const { products, page, pages } = useSelector(
    (state: RootState) => state.product
  )

  const dispatch: AppDispatch = useDispatch()

  const [searchParams /*, setSearchParams*/] = useSearchParams()
  const _page = searchParams.get('page') || ''
  const search = searchParams.get('search') || ''

  useEffect(() => {
    dispatch(getProducts({ page: _page, search: search }))
  }, [dispatch, _page, search])

  return (
    <div className={style.Home}>
      <div className={style.landing}>
        <LandingContent />
        <Carousel />
      </div>
      <ProductList products={products} />
      <Pagination page={Number(page)} pages={Number(pages)} search={search} />
    </div>
  )
}
