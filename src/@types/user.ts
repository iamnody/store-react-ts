import { CartItem } from './cart'

export interface Address {
  name: string
  phoneNumber: string
  address: string
  city: string
  province: string
  postalCode: string
  [key: string]: string
}

export interface User {
  _id: string
  name: string
  email: string
  cart: CartItem[]
  address: Address
  isAdmin: boolean
}

export interface UserDetail {
  name: string
  email: string
  isAdmin: boolean
}

export interface InitialState {
  user: User
  userDetail: UserDetail
  users: User[]
}
