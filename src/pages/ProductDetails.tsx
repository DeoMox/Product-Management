import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct } from '../services/products'
import type { Product } from '../types'
import { useCart } from '../context/CartContext'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { add } = useCart()

  useEffect(() => {
    async function run() {
      if (!id) return
      setLoading(true)
      try {
        const p = await fetchProduct(Number(id))
        setProduct(p)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [id])

  if (loading) return <div className="container py-6">Loading…</div>
  if (!product) return <div className="container py-6">Not found</div>

  return (
    <div className="container py-6">
      <Link to="/products" className="btn btn-outline mb-4">← Back</Link>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          {product.images?.[0] && <img src={product.images[0]} className="w-full rounded-xl" />}
        </div>
        <div className="card">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="text-2xl font-bold mb-4">${product.price}</div>
          <button className="btn btn-primary" onClick={() => add(product, 1)}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
