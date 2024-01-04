import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { InitialState } from '../@types/user'
import { getLocalStorage } from '../utils/localStorage'
import {
  getUserAdmin,
  getUsersAdmin,
  saveAddress,
  signIn,
  signOut,
  signUp,
  updateUserAdmin,
} from './userService'

let user = getLocalStorage('user', '{}', 'null')

const initialState: InitialState = {
  user: user,
  userDetail: {
    name: '',
    email: '',
    isAdmin: false,
  },
  users: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAdmin.fulfilled, (state, action) => {
        state.users = action.payload
      })

      .addMatcher(
        isAnyOf(getUserAdmin.fulfilled, updateUserAdmin.fulfilled),
        (state, action) => {
          state.userDetail = action.payload
        }
      )

      .addMatcher(
        isAnyOf(
          signUp.fulfilled,
          signIn.fulfilled,
          signOut.fulfilled,
          saveAddress.fulfilled
        ),
        (state, action) => {
          state.user = action.payload
        }
      )
  },
})

export default userSlice.reducer
