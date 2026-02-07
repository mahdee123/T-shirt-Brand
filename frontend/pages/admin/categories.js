import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { apiClient } from '../../lib/api';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editing, setEditing] = useState(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      fetchCategories();
    };

    checkAuth();
  }, [router]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setError('Category name is required');
      return;
    }

    const token = localStorage.getItem('adminToken');
    try {
      await apiClient.createCategory(newCategoryName, token);
      setNewCategoryName('');
      setError('');
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add category');
    }
  };

  const handleUpdateCategory = async (id) => {
    if (!editName.trim()) {
      setError('Category name is required');
      return;
    }

    const token = localStorage.getItem('adminToken');
    try {
      await apiClient.updateCategory(id, editName, token);
      setEditing(null);
      setEditName('');
      setError('');
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      await apiClient.deleteCategory(id, token);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete category');
    }
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Link href="/admin">
            <button className="text-sm underline">← Back to Dashboard</button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Add New Category */}
        <form onSubmit={handleAddCategory} className="border border-gray-300 p-4 mb-6">
          <h2 className="font-bold mb-4">Add New Category</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="flex-grow px-3 py-2 border border-gray-300"
            />
            <button type="submit" className="bg-black text-white px-6 py-2 font-bold">
              Add
            </button>
          </div>
        </form>

        {/* Categories List */}
        <div className="border border-gray-300 overflow-x-auto">
          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="p-4 text-center">No categories found</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-300 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-bold">Name</th>
                  <th className="px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category._id} className="border-b border-gray-300">
                    <td className="px-4 py-3">
                      {editing === category._id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2 py-1 border border-gray-300"
                        />
                      ) : (
                        category.name
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editing === category._id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateCategory(category._id)}
                            className="text-sm bg-green-100 text-green-700 px-3 py-1 font-bold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditing(null)}
                            className="text-sm bg-gray-100 px-3 py-1"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditing(category._id);
                              setEditName(category.name);
                            }}
                            className="text-sm underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category._id)}
                            className="text-sm text-red-600 underline"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}
