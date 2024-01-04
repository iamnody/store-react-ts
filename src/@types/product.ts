export interface Product {
  _id: string
  name: string
  images: { name: string; url: string; file: File }[] | []
  price: number
  discount: number
  qty: number
  brand: string
  category: string
  description: string
  rating: number
  numReviews: number
  reviews: {
    user: string
    name: string
    rating: number
    comment: string
    updatedAt: string
  }[]
}

export interface InitialState {
  product: Product
  products: Product[]
  page: number
  pages: number
}
