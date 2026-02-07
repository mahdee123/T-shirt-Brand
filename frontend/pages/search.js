import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { apiClient } from '../lib/api';

export default function Search() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { q } = router.query;

  useEffect(() => {
    const searchProducts = async () => {
      if (!q) return;

      try {
        setLoading(true);
        const response = await apiClient.getProducts({ search: q });
        setProducts(response.data);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      searchProducts();
    }
  }, [q, router.isReady]);

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Search Results for "{q}"</h1>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">No products found matching your search</div>
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
