import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Product } from '../../@types/product'
import style from './AdminProductForm.module.scss'

// interface ProductFormProps {

type AdminProductFormProps = {
  submitHandler: (
    e: FormEvent<HTMLFormElement>,
    product: {
      images: { name: string; url: string; file: File }[] | []
      name: string
      price: number
      brand: string
      category: string
      qty: number
      description: string
    }
  ) => void
  initialProduct?: Product
  title: string
}

export default function AdminProductForm({
  submitHandler,
  initialProduct,
  title,
}: AdminProductFormProps) {
  const [product, setProduct] = useState<{
    name: string
    images: { name: string; url: string; file: File }[] | []
    price: number
    brand: string
    category: string
    qty: number
    description: string
  }>({
    name: 'a',
    images: [],
    price: 0,
    brand: 'a',
    category: 'a',
    qty: 0,
    description: 'a',
  })

  useEffect(() => {
    if (initialProduct) {
      setProduct({ ...initialProduct })
    }
  }, [initialProduct])

  useEffect(() => {
    return () => {
      product.images.forEach((image) => {
        if (image.url) URL.revokeObjectURL(image.url)
      })
    }
  }, [product.images])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (['price', 'qty'].includes(e.target.name)) {
      setProduct({ ...product, [e.target.name]: Number(e.target.value) })
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value })
    }
  }
  const handleImagesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if ((e.target.files?.length ?? 0) > 5) {
      alert('Max 5 images')
      return
    }
    setProduct((pre) => {
      const images = Array.from(e.target.files || []).map((x) => {
        return {
          name: x.name,
          url: URL.createObjectURL(x),
          file: x,
        }
      })
      return { ...pre, images: images }
    })
  }

  return (
    <div className={style.AdminProductForm}>
      <h1>{title}</h1>
      <form onSubmit={(e) => submitHandler(e, product)}>
        <div className={style.imgWapper}>
          <div className={style.dropBox}>
            <label>
              Drag & Drop your files here <small>* Max 5 images</small>
            </label>
            <input
              type='file'
              multiple
              name='images'
              onChange={handleImagesChange}
            />
            <img src='/cloud.png' />
          </div>
          <div className={style.preview}>
            {product.images.map((x, i) => {
              if (x.url.split('/')[0] === 'blob:http:') {
                return <img src={x.url} alt={x.name} key={i} />
              } else {
                return <img src={x.url} alt={x.name} key={i} />
              }
            })}
          </div>
        </div>
        <div className={style.formControl}>
          <label>Name</label>
          <input
            type='name'
            name='name'
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.formControl}>
          <label>Price</label>
          <input
            type='number'
            name='price'
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.formControl}>
          <label>Brand</label>
          <input
            type='text'
            name='brand'
            value={product.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.formControl}>
          <label>Quantity</label>
          <input
            type='number'
            name='qty'
            value={product.qty}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.formControl}>
          <label>Category</label>
          <input
            type='text'
            name='category'
            value={product.category}
            onChange={handleInputChange}
          />
        </div>
        <div className={style.formControl}>
          <label>Description</label>
          <input
            type='text'
            name='description'
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
