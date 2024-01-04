import { FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppDispatch, RootState } from '../../store/_index'
import { getProduct, updateProductAdmin } from '../../store/productService'
import AdminProductForm from './AdminProductForm'

export default function AdminProductUpdate() {
  const dispatch: AppDispatch = useDispatch()
  const { _id } = useParams()
  const { product } = useSelector((state: RootState) => state.product)

  useEffect(() => {
    if (_id) {
      dispatch(getProduct(_id))
    }
  }, [_id, dispatch])

  async function submitHandler(
    e: FormEvent<HTMLFormElement>,
    product: {
      name: string
      price: number
      images: { name: string; url: string; file: File }[] | []
      brand: string
      category: string
      description: string
      qty: number
    }
  ) {
    e.preventDefault()
    const formData: FormData = new FormData()
    product.images.forEach((x) => {
      if (x.file) formData.append('files', x.file)
    })
    formData.append('name', product.name)
    formData.append('price', product.price.toString())
    formData.append('brand', product.brand)
    formData.append('category', product.category)
    formData.append('description', product.description)
    formData.append('qty', product.qty.toString())
    try {
      await dispatch(updateProductAdmin({ formData, _id })).unwrap()
      toast.success('Product updated')
    } catch (error) {
      toast.error('Updating failed')
    }
  }

  return (
    <div>
      <AdminProductForm
        submitHandler={submitHandler}
        title='Update Product'
        initialProduct={product}
      />
    </div>
  )
}
