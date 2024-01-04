import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { InitialState } from '../@types/product'
import {
  createReview,
  deleteReview,
  getProduct,
  getProducts,
  updateProductAdmin,
} from './productService'

const initialState: InitialState = {
  product: {
    _id: '',
    name: '',
    images: [],
    description: '',
    brand: '',
    category: '',
    price: 0,
    discount: 0,
    qty: 0,
    rating: 0,
    numReviews: 0,
    reviews: [
      {
        user: '',
        name: '',
        rating: 0,
        comment: '',
        updatedAt: '',
      },
    ],
  },
  products: [],
  page: 0,
  pages: 0,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // products
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products
        state.page = action.payload.page
        state.pages = action.payload.pages
      })
      // reviews

      .addMatcher(
        isAnyOf(createReview.fulfilled, deleteReview.fulfilled),
        (state, action) => {
          state.product.reviews = action.payload
        }
      )
      .addMatcher(
        isAnyOf(getProduct.fulfilled, updateProductAdmin.fulfilled),
        (state, action) => {
          state.product = action.payload
        }
      )
  },
})

export default productSlice.reducer
