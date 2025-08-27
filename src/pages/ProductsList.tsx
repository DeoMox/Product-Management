import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts, deleteProduct } from '../services/products'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'

export default function ProductsList() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const { add } = useCart()

  async function load(query?: string) {
    setLoading(true)
    try {
      const data = await fetchProducts(query)
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleDelete(id: number) {
    if (!confirm('Delete this product?')) return
    await deleteProduct(id)
    load(q)
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link to="/products/add" className="btn btn-primary">Add Product</Link>
      </div>

      <div className="mb-4 flex gap-2">
        <input className="input" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn btn-outline" onClick={() => load(q)}>Search</button>
      </div>

      {loading ? <p>Loading…</p> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map(p => (
            <div key={p.id} className="card">
              {p.thumbnail && <img src={p.thumbnail} alt={p.title} className="w-full h-40 object-cover rounded-xl mb-3" />}
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="font-bold">${p.price}</span>
                <div className="flex gap-2">
                  <Link to={`/products/${p.id}`} className="btn btn-outline">View</Link>
                  <button className="btn btn-primary" onClick={() => add(p, 1)}>Add to Cart</button>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <Link to={`/products/${p.id}/edit`} className="btn btn-outline">Edit</Link>
                <button className="btn btn-outline" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
