import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { handleAsyncError } from '../utils/handleAsyncError'
import { getLocalStorage } from '../utils/localStorage'

const API_URL = '/api/cart/'

interface CartItem {
  product: string
  qty: number
}
type Cart = CartItem[]

export const addCartItemQtyLocal = createAsyncThunk(
  'cart/addCartItemQtyLocal',
  async (formData: CartItem, thunkAPI) => {
    try {
      const cart: Cart = getLocalStorage('cart', '[]', '[]')

      const item = cart.find((x) => x.product === formData.product)
      if (item) {
        item.qty += formData.qty
      } else {
        cart.push(formData)
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      return cart
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const subCartItemQtyLocal = createAsyncThunk(
  'cart/subCartItemQtyLocal',
  async (product: string, thunkAPI) => {
    try {
      let cart: Cart = getLocalStorage('cart', '[]', '[]')
      cart = cart.filter((x) => {
        if (x.product === product) {
          x.qty--
          return x.qty > 0
        }
        return true
      })
      localStorage.setItem('cart', JSON.stringify(cart))
      return cart
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const deleteCartItemLocal = createAsyncThunk(
  'cart/deleteCartItemLocal',
  async (product: string, thunkAPI) => {
    try {
      let cart: Cart = getLocalStorage('cart', '[]', '[]')
      cart = cart.filter((x) => x.product !== product)
      localStorage.setItem('cart', JSON.stringify(cart))
      return cart
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const addCartItemQty = createAsyncThunk(
  'cart/addCartItemQty',
  async (formData: CartItem, thunkAPI) => {
    try {
      const res = await axios.post(API_URL + 'addCartItemQty', formData)
      localStorage.setItem('cart', JSON.stringify(res.data))
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const subCartItemQty = createAsyncThunk(
  'cart/subCartItemQty',
  async (product: string, thunkAPI) => {
    try {
      const res = await axios.put(API_URL + 'subCartItemQty/' + product)
      localStorage.setItem('cart', JSON.stringify(res.data))
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (product: string, thunkAPI) => {
    try {
      const res = await axios.delete(API_URL + 'deleteCartItem/' + product)
      localStorage.setItem('cart', JSON.stringify(res.data))
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, thunkAPI) => {
    try {
      const res = await axios.delete(API_URL + 'clearCart')
      localStorage.setItem('cart', JSON.stringify(res.data))
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)
