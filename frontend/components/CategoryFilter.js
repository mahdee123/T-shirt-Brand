import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';

export default function CategoryFilter() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="border-b border-gray-300 py-4 overflow-x-auto">
      <div className="flex gap-4 min-w-max">
        <button
          onClick={() => router.push('/')}
          className={`px-4 py-2 text-sm font-bold ${!category ? 'bg-black text-white' : 'border border-gray-300'}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat._id}
            onClick={() => router.push(`/?category=${cat._id}`)}
            className={`px-4 py-2 text-sm font-bold ${category === cat._id ? 'bg-black text-white' : 'border border-gray-300'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
