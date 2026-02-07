import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useCart } from '../lib/cart-context';
import { apiClient } from '../lib/api';

export default function Checkout() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { cart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="py-12 text-center">
          <p className="mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push('/')}
            className="bg-black text-white px-6 py-2 font-bold"
          >
            Back to Shopping
          </button>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderItems = cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        size: item.size,
        price: item.product.price
      }));

      const response = await apiClient.createOrder({
        customerName: name,
        phoneNumber: phone,
        deliveryAddress: address,
        items: orderItems
      });

      clearCart();
      router.push(`/order-success/${response.data.orderId}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2">
            <div className="border border-gray-300 p-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block font-bold mb-2 text-sm">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block font-bold mb-2 text-sm">Phone Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block font-bold mb-2 text-sm">Delivery Address *</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300"
                  required
                ></textarea>
              </div>

              <div className="mb-6 p-4 bg-gray-100">
                <h3 className="font-bold mb-2">Payment Method</h3>
                <p className="text-sm">Cash on Delivery (COD)</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 font-bold disabled:bg-gray-600"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="border border-gray-300 p-4 h-fit">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-300 max-h-64 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold">{item.product.name}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className="text-gray-600">
                    Size: {item.size} × {item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
