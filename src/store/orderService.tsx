import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Address } from '../@types/user'
import { handleAsyncError } from '../utils/handleAsyncError'

const API_URL = '/api/order/'

interface CartItem {
  product: string
  qty: number
}
type Cart = CartItem[]

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (
    dataObject: {
      items: Cart
      shippingAddress: Address
      paymentMethod: string
      itemsPrice: number
      shippingPrice: number
      taxPrice: number
      totalPrice: number
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(API_URL + 'placeOrder', dataObject)
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)
