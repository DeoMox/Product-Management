import { useCart } from '../context/CartContext'

export default function Cart() {
  const { items, total, updateQty, remove, clear } = useCart()

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Cart</h1>
        {items.length > 0 && <button className="btn btn-outline" onClick={clear}>Clear</button>}
      </div>
      {items.length === 0 ? <p>Your cart is empty.</p> : (
        <div className="space-y-3">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="card flex items-center gap-4">
              {product.thumbnail && <img src={product.thumbnail} className="w-20 h-20 object-cover rounded-lg" />}
              <div className="flex-1">
                <div className="font-medium">{product.title}</div>
                <div className="text-sm text-gray-600">${product.price} each</div>
              </div>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => updateQty(product.id, Number(e.target.value))}
                className="input w-24"
              />
              <div className="font-bold w-24 text-right">${((product.price || 0) * quantity).toFixed(2)}</div>
              <button className="btn btn-outline" onClick={() => remove(product.id)}>Remove</button>
            </div>
          ))}
          <div className="card flex items-center justify-between">
            <div className="text-xl font-bold">Total</div>
            <div className="text-xl font-bold">${total.toFixed(2)}</div>
          </div>
          <button className="btn btn-primary w-full">Checkout</button>
        </div>
      )}
    </div>
  )
}
