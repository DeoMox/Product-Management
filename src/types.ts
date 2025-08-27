export interface User {
  id: number
  username: string
  email?: string
  token: string
  firstName?: string
  lastName?: string
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  category?: string
  brand?: string
  thumbnail?: string
  images?: string[]
  stock?: number
}

export interface CartItem {
  product: Product
  quantity: number
}
