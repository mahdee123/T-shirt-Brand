import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useCart } from '../lib/cart-context';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="py-12 text-center">
          <p className="mb-4">Your cart is empty</p>
          <Link href="/">
            <button className="bg-black text-white px-6 py-2 font-bold">
              Continue Shopping
            </button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 border border-gray-300 p-4">
            {cart.map((item, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b border-gray-300 last:border-b-0 mb-4">
                <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                  {item.product.images && item.product.images[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Price: ${item.product.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.size, item.quantity - 1)}
                      className="px-2 py-1 border border-gray-300"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.product._id, item.size, parseInt(e.target.value) || 1)}
                      className="w-10 px-1 py-1 border border-gray-300 text-center text-sm"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.product._id, item.size, item.quantity + 1)}
                      className="px-2 py-1 border border-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.product._id, item.size)}
                    className="text-red-600 text-sm mt-2 underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="border border-gray-300 p-4 h-fit">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4 pb-4 border-b border-gray-300">
              <div className="flex justify-between text-sm">
                <span>Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-black text-white py-3 font-bold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
