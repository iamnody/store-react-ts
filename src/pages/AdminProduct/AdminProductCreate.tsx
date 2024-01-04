import { FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppDispatch } from '../../store/_index'
import { createProductAdmin } from '../../store/productService'
import AdminProductForm from './AdminProductForm'

export default function AdminProductCreate() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  async function submitHandler(
    e: FormEvent<HTMLFormElement>,

    product: {
      name: string
      images: { name: string; url: string; file: File }[] | []
      price: number
      qty: number
      brand: string
      category: string
      description: string
    }
  ) {
    e.preventDefault()

    const formData: FormData = new FormData()
    product.images.forEach((x) => {
      if (x.file) formData.append('files', x.file)
    })
    formData.append('name', product.name)
    formData.append('price', product.price.toString())
    formData.append('qty', product.qty.toString())
    formData.append('brand', product.brand)
    formData.append('category', product.category)
    formData.append('description', product.description)

    try {
      await dispatch(createProductAdmin(formData)).unwrap()
      toast.success('Product created')
      navigate('/admin/products')
    } catch (err) {
      toast.error('Creating product failed')
    }
  }

  return (
    <div>
      <AdminProductForm submitHandler={submitHandler} title='Create Product' />
    </div>
  )
}
