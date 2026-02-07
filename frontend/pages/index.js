import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import { apiClient } from '../lib/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {
          sortBy: sortBy === 'price_low' ? 'price_low' : sortBy === 'price_high' ? 'price_high' : 'newest'
        };
        if (category) params.category = category;

        const response = await apiClient.getProducts(params);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchProducts();
    }
  }, [category, sortBy, router.isReady]);

  return (
    <Layout>
      <CategoryFilter />

      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Products</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">No products found</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
