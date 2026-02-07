import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useCart } from '../../lib/cart-context';
import { apiClient } from '../../lib/api';

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await apiClient.getProductById(id);
        setProduct(response.data);
        if (response.data.sizes && response.data.sizes.length > 0) {
          setSelectedSize(response.data.sizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchProduct();
    }
  }, [id, router.isReady]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    alert('Added to cart!');
    setQuantity(1);
  };

  if (loading) {
    return <Layout><div className="text-center py-12">Loading...</div></Layout>;
  }

  if (!product) {
    return <Layout><div className="text-center py-12">Product not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="py-6">
        <button
          onClick={() => router.back()}
          className="mb-6 text-sm underline"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images */}
          <div>
            <div className="bg-gray-100 aspect-square mb-3 flex items-center justify-center">
              {product.images && product.images[currentImageIndex] ? (
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400">No image</div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-16 w-16 border-2 ${
                      index === currentImageIndex ? 'border-black' : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={product.images[index]}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold mb-4">${product.price}</p>

            {product.description && (
              <p className="text-gray-600 mb-6 text-sm">{product.description}</p>
            )}

            {/* Size Selector */}
            <div className="mb-6">
              <label className="block font-bold mb-3 text-sm">Size</label>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 font-bold ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-bold mb-3 text-sm">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border border-gray-300"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 px-2 py-1 border border-gray-300 text-center"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border border-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 font-bold text-lg mb-4"
            >
              Add to Cart
            </button>

            {product.stock <= 0 && (
              <p className="text-red-600 text-sm">Out of stock</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
