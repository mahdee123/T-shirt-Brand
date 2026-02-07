import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { apiClient } from '../../lib/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      fetchOrders(token);
    };

    checkAuth();
  }, [router]);

  const fetchOrders = async (token) => {
    try {
      setLoading(true);
      const response = await apiClient.getOrders(token);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const token = localStorage.getItem('adminToken');
    try {
      await apiClient.updateOrderStatus(orderId, newStatus, token);
      fetchOrders(token);
      setSelectedOrder(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update order status');
    }
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <Link href="/admin">
            <button className="text-sm underline">← Back to Dashboard</button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-2 border border-gray-300 overflow-x-auto">
            {loading ? (
              <div className="p-4 text-center">Loading...</div>
            ) : orders.length === 0 ? (
              <div className="p-4 text-center">No orders found</div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-300 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 font-bold">Order ID</th>
                    <th className="px-4 py-3 font-bold">Customer</th>
                    <th className="px-4 py-3 font-bold">Total</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-300 cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-4 py-3 text-xs font-bold">{order.orderId}</td>
                      <td className="px-4 py-3">{order.customerName}</td>
                      <td className="px-4 py-3">${order.totalAmount.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-bold ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <div className="border border-gray-300 p-4 h-fit">
              <h2 className="font-bold mb-4">Order Details</h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-gray-300 text-sm">
                <div>
                  <p className="text-gray-600 text-xs">Order ID</p>
                  <p className="font-bold break-all">{selectedOrder.orderId}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-xs">Customer Name</p>
                  <p className="font-bold">{selectedOrder.customerName}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-xs">Phone</p>
                  <p className="font-bold">{selectedOrder.phoneNumber}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-xs">Delivery Address</p>
                  <p className="font-bold">{selectedOrder.deliveryAddress}</p>
                </div>

                <div>
                  <p className="text-gray-600 text-xs">Total Amount</p>
                  <p className="font-bold">${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-300">
                <p className="text-gray-600 text-xs mb-2 font-bold">Items</p>
                <div className="space-y-2 text-xs">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="bg-gray-100 p-2">
                      <p className="font-bold">{item.product?.name || 'Product'}</p>
                      <p className="text-gray-600">Size: {item.size} × {item.quantity}</p>
                      <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold">Update Status</p>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
