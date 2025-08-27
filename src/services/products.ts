import api from './api'
import type { Product } from '../types'

export async function fetchProducts(q?: string): Promise<Product[]> {
  const url = q ? `/products/search?q=${encodeURIComponent(q)}` : '/products'
  const { data } = await api.get(url)
  return (data.products ?? data) as Product[]
}

export async function fetchProduct(id: number): Promise<Product> {
  const { data } = await api.get(`/products/${id}`)
  return data as Product
}

export async function addProduct(input: Partial<Product>): Promise<Product> {
  const { data } = await api.post('/products/add', input)
  return data as Product
}

export async function updateProduct(id: number, input: Partial<Product>): Promise<Product> {
  const { data } = await api.put(`/products/${id}`, input)
  return data as Product
}

export async function deleteProduct(id: number): Promise<{ id: number, isDeleted: boolean }> {
  const { data } = await api.delete(`/products/${id}`)
  return data
}
