import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { handleAsyncError } from '../utils/handleAsyncError'
import { updateCart } from './cartSlice'

const API_URL = '/api/user/'

export const signUp = createAsyncThunk(
  'user/signUp',
  async (
    formData: {
      name: string
      email: string
      password: string
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(API_URL + 'signUp', formData)
      localStorage.setItem('user', JSON.stringify(res.data))
      localStorage.setItem('cart', JSON.stringify(res.data.cart))
      thunkAPI.dispatch(updateCart(res.data.cart))
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const signIn = createAsyncThunk(
  'user/signIn',
  async (
    formData: {
      email: string
      password: string
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(API_URL + 'signIn', formData)
      localStorage.setItem('user', JSON.stringify(res.data))
      localStorage.setItem('cart', JSON.stringify(res.data.cart))
      thunkAPI.dispatch(updateCart(res.data.cart))
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const saveAddress = createAsyncThunk(
  'user/saveAddress',
  async (
    formData: {
      name: string
      phoneNumber: string
      address: string
      city: string
      province: string
      postalCode: string
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(API_URL + 'saveAddress', formData)
      localStorage.setItem('user', JSON.stringify(res.data))
      localStorage.setItem('cart', JSON.stringify(res.data.cart))
      thunkAPI.dispatch(updateCart(res.data.cart))
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const getAddress = createAsyncThunk(
  'user/getAddress',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_URL + 'getAddress')
      localStorage.setItem('user', JSON.stringify(res.data))
      localStorage.setItem('cart', JSON.stringify(res.data.cart))
      thunkAPI.dispatch(updateCart(res.data.cart))
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const getUserAdmin = createAsyncThunk(
  'auth/getUser',
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.get(API_URL + '/admin/getUserAdmin/' + id)
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Authentication failed')
    }
  }
)

export const getUsersAdmin = createAsyncThunk(
  'auth/getUsers',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_URL + '/admin/getUsersAdmin')
      return res.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Authentication failed')
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    formData: {
      name: string
      email: string
      password: string
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.put(API_URL + 'updateUser', formData)
      localStorage.setItem('user', JSON.stringify(res.data))
      localStorage.setItem('cart', JSON.stringify(res.data.cart))
      thunkAPI.dispatch(updateCart(res.data.cart))
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const updateUserAdmin = createAsyncThunk(
  'user/updateUser',
  async (
    formData: {
      name: string
      email: string
      password: string
      isAdmin: boolean
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.put(API_URL + 'admin/updateUserAdmin', formData)
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const signOut = createAsyncThunk('user/signOut', async (_, thunkAPI) => {
  localStorage.removeItem('user')
  localStorage.removeItem('cart')
  thunkAPI.dispatch(updateCart([]))
  const res = await axios.post(API_URL + 'signOut')
  return res.data
})

export const deleteUserAdmin = createAsyncThunk(
  'auth/deleteUserAdmin',
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.delete(API_URL + '/admin/deleteUserAdmin/' + id)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue('Authentication failed')
    }
  }
)
