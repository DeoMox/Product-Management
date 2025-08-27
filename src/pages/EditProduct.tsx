import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchProduct, updateProduct } from '../services/products'
import type { Product } from '../types'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState<Partial<Product>>()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function run() {
      if (!id) return
      try {
        const p = await fetchProduct(Number(id))
        setForm(p)
      } catch (e: any) {
        setError(e?.response?.data?.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [id])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!id || !form) return
    setSaving(true); setError(null)
    try {
      await updateProduct(Number(id), form)
      navigate('/products')
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading || !form) return <div className="container py-6">Loading…</div>

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
        <button className="btn btn-primary w-full" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
      </form>
    </div>
  )
}
