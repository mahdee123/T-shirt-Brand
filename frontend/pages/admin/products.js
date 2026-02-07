import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { apiClient } from '../../lib/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    sizes: [],
    stock: '',
    description: '',
    images: []
  });

  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      fetchData();
    };

    checkAuth();
  }, [router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        apiClient.getProducts({}),
        apiClient.getCategories()
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleImageUrlAdd = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input[type="text"]');
    if (input.value && formData.images.length < 3) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, input.value]
      }));
      input.value = '';
    }
  };

  const handleImageFileUpload = async (e) => {
    const files = e.target.files;
    if (!files) return;

    const token = localStorage.getItem('adminToken');
    
    for (let i = 0; i < files.length && formData.images.length < 3; i++) {
      const file = files[i];
      
      // Check file type
      if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(file.type)) {
        setError('Only image files are allowed (jpeg, jpg, png, gif)');
        continue;
      }

      // Check file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        continue;
      }

      try {
        setUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append('image', file);

        const response = await fetch('http://localhost:5000/api/products/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataUpload
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, `http://localhost:5000${data.imageUrl}`]
        }));
        setError('');
      } catch (err) {
        setError('Failed to upload image: ' + err.message);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.category || !formData.price || formData.sizes.length === 0) {
      setError('Please fill in all required fields');
      return;
    }

    const token = localStorage.getItem('adminToken');
    const submitData = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      sizes: formData.sizes,
      stock: parseInt(formData.stock) || 0,
      description: formData.description,
      images: formData.images
    };

    try {
      if (editingId) {
        await apiClient.updateProduct(editingId, submitData, token);
      } else {
        await apiClient.createProduct(submitData, token);
      }

      setFormData({ name: '', category: '', price: '', sizes: [], stock: '', description: '', images: [] });
      setEditingId(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category._id,
      price: product.price.toString(),
      sizes: product.sizes,
      stock: product.stock.toString(),
      description: product.description || '',
      images: product.images || []
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      await apiClient.deleteProduct(id, token);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete product');
    }
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex gap-2">
            {showForm && (
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({ name: '', category: '', price: '', sizes: [], stock: '', description: '', images: [] });
                }}
                className="text-sm underline"
              >
                Cancel
              </button>
            )}
            <button
              onClick={() => setShowForm(!showForm)}
              className={`px-4 py-2 font-bold ${showForm ? 'bg-gray-300' : 'bg-black text-white'}`}
            >
              {showForm ? 'Close' : 'Add Product'}
            </button>
            <Link href="/admin">
              <button className="text-sm underline">← Back</button>
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="border border-gray-300 p-6 mb-6">
            <h2 className="font-bold text-lg mb-4">{editingId ? 'Edit' : 'Add New'} Product</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-bold mb-2 text-sm">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2 text-sm">Available Sizes *</label>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <label key={size} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.sizes.includes(size)}
                      onChange={() => handleSizeToggle(size)}
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2 text-sm">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                maxLength="200"
                rows="2"
                className="w-full px-3 py-2 border border-gray-300"
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-2 text-sm">Product Images (max 3)</label>
              
              {/* File Upload */}
              <div className="mb-3">
                <label className="block text-sm mb-2 font-semibold">Upload Image File</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  disabled={uploading || formData.images.length >= 3}
                  className="w-full px-3 py-2 border border-gray-300"
                />
                {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
              </div>

              {/* URL Input */}
              <form onSubmit={handleImageUrlAdd} className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Or paste Image URL"
                  className="flex-grow px-3 py-2 border border-gray-300"
                  disabled={formData.images.length >= 3}
                />
                <button type="submit" className="bg-black text-white px-4 py-2 font-bold" disabled={formData.images.length >= 3}>
                  Add
                </button>
              </form>

              {formData.images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img}
                        alt={`Product ${index + 1}`}
                        className="w-20 h-20 object-cover border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 font-bold"
            >
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        )}

        {/* Products List */}
        <div className="border border-gray-300 overflow-x-auto">
          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : products.length === 0 ? (
            <div className="p-4 text-center">No products found</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-300 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-bold">Name</th>
                  <th className="px-4 py-3 font-bold">Category</th>
                  <th className="px-4 py-3 font-bold">Price</th>
                  <th className="px-4 py-3 font-bold">Stock</th>
                  <th className="px-4 py-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} className="border-b border-gray-300">
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.category?.name || 'N/A'}</td>
                    <td className="px-4 py-3">${product.price}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-sm underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-sm text-red-600 underline"
                        >
                          Delete
                        </button>
                      </div>
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
