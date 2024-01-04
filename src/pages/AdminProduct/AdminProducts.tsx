import { MouseEvent, useEffect } from 'react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../store/_index'
import { deleteProductAdmin, getProducts } from '../../store/productService'

export default function AdminProducts() {
  const { products } = useSelector((state: RootState) => state.product)
  const dispatch: AppDispatch = useDispatch()

  function deleteProductHandler(e: MouseEvent, id: string) {
    e.preventDefault()
    // if (window.confirm('Delete this product?')) {
    dispatch(deleteProductAdmin(id))
      .unwrap()
      .then(() => dispatch(getProducts({})))
    // }
  }

  useEffect(() => {
    dispatch(getProducts({}))
  }, [dispatch])

  return (
    <div>
      <div className='align-items-center my-2'>
        <div>
          <h1>Products</h1>
        </div>
        <div className='text-end'>
          <Link to='/admin/product/create'>
            <button className=''>
              <FaPlus /> Create Product
            </button>
          </Link>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={'/admin/product/update/' + product._id}>
                    <button className='btn-sm'>
                      <FaEdit />
                    </button>
                  </Link>
                  <button
                    className='btn-sm'
                    onClick={(e) => deleteProductHandler(e, product._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
