import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { handleAsyncError } from '../utils/handleAsyncError'

const API_URL = '/api/product/'

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.get(API_URL + 'getProduct/' + id)
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (
    { page = '', search = '' }: { page?: string; search?: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.get(
        API_URL + 'getProducts/' + `?page=${page}&search=${search}`
      )
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const createProductAdmin = createAsyncThunk(
  'products/createProductAdmin',
  async (formData: FormData, thunkAPI) => {
    try {
      await axios.post(API_URL + 'admin/createProductAdmin', formData)
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const updateProductAdmin = createAsyncThunk(
  'products/updateProductAdmin',
  async (
    formData: { formData: FormData; _id: string | undefined },
    thunkAPI
  ) => {
    try {
      const res = await axios.put(
        API_URL + 'admin/updateProductAdmin/' + formData._id,
        formData.formData
      )
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const deleteProductAdmin = createAsyncThunk(
  'products/deleteProductAdmin',
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.delete(API_URL + 'admin/deleteProductAdmin/' + id)
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const createReview = createAsyncThunk(
  'products/createReview',
  async (
    formData: { _id: string; rating: number; comment: string },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(API_URL + 'createReview', formData)
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)

export const deleteReview = createAsyncThunk(
  'products/deleteReview',
  async (_id: string, thunkAPI) => {
    try {
      const res = await axios.delete(API_URL + 'deleteReview/' + _id)
      return res.data
    } catch (error: any) {
      return handleAsyncError(error, thunkAPI)
    }
  }
)
