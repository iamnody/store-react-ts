import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { InitialState } from '../@types/cart'
import { getLocalStorage } from '../utils/localStorage'
import {
  addCartItemQty,
  addCartItemQtyLocal,
  clearCart,
  deleteCartItem,
  deleteCartItemLocal,
  subCartItemQty,
  subCartItemQtyLocal,
} from './cartService'

let cart = getLocalStorage('cart', '[]', '[]')

const initialState: InitialState = {
  cart,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.cart = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        addCartItemQtyLocal.fulfilled,
        subCartItemQtyLocal.fulfilled,
        deleteCartItemLocal.fulfilled,
        addCartItemQty.fulfilled,
        subCartItemQty.fulfilled,
        deleteCartItem.fulfilled,
        clearCart.fulfilled
      ),
      (state, action) => {
        state.cart = action.payload
      }
    )
  },
})

export const { updateCart } = cartSlice.actions
export default cartSlice.reducer
