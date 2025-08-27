import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../services/products'
import type { Product } from '../types'

export default function AddProduct() {
  const navigate = useNavigate()
  const [form, setForm] = useState<Partial<Product>>({ title: '', description: '', price: 0, category: '', brand: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      await addProduct(form)
      navigate('/products')
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-3">{error}</div>}
      <form onSubmit={submit} className="card space-y-3 max-w-xl">
        <div>
          <label className="label">Title</label>
          <input className="input" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} required />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea className="input" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Price</label>
            <input type="number" className="input" value={form.price ?? 0} onChange={e => setForm({ ...form, price: Number(e.target.value) })} required />
          </div>
          <div>
            <label className="label">Stock</label>
            <input type="number" className="input" value={form.stock ?? 0} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Category</label>
            <input className="input" value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })} />
          </div>
          <div>
            <label className="label">Brand</label>
            <input className="input" value={form.brand || ''} onChange={e => setForm({ ...form, brand: e.target.value })} />
          </div>
        </div>
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Saving…' : 'Save'}</button>
      </form>
    </div>
  )
}
