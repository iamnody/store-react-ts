export interface CartItem {
  product: string
  name: string
  url: string
  price: number
  qty: number
}

export interface InitialState {
  cart: CartItem[]
}
