import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { apiClient } from '../../lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      fetchStats(token);
    };

    checkAuth();
  }, [router]);

  const fetchStats = async (token) => {
    try {
      setLoading(true);
      const response = await apiClient.getOrdersStats(token);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Layout><div className="text-center py-12">Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="border border-gray-300 p-6 text-center">
            <p className="text-gray-600 text-sm font-bold mb-2">Total Orders</p>
            <p className="text-3xl font-bold">{stats?.total || 0}</p>
          </div>
          <div className="border border-gray-300 p-6 text-center">
            <p className="text-gray-600 text-sm font-bold mb-2">Pending Orders</p>
            <p className="text-3xl font-bold text-orange-600">{stats?.pending || 0}</p>
          </div>
          <div className="border border-gray-300 p-6 text-center">
            <p className="text-gray-600 text-sm font-bold mb-2">Delivered Orders</p>
            <p className="text-3xl font-bold text-green-600">{stats?.delivered || 0}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/categories">
            <div className="border border-gray-300 p-6 cursor-pointer hover:border-black transition-colors">
              <h2 className="font-bold text-lg mb-2">Categories</h2>
              <p className="text-gray-600 text-sm">Manage product categories</p>
            </div>
          </Link>

          <Link href="/admin/products">
            <div className="border border-gray-300 p-6 cursor-pointer hover:border-black transition-colors">
              <h2 className="font-bold text-lg mb-2">Products</h2>
              <p className="text-gray-600 text-sm">Manage products</p>
            </div>
          </Link>

          <Link href="/admin/orders">
            <div className="border border-gray-300 p-6 cursor-pointer hover:border-black transition-colors">
              <h2 className="font-bold text-lg mb-2">Orders</h2>
              <p className="text-gray-600 text-sm">View and manage orders</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
