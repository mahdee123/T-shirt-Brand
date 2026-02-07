import Link from 'next/link';
import { useCart } from '../lib/cart-context';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Header() {
  const { getTotalItems, mounted } = useCart();
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const isAdmin = router.pathname.startsWith('/admin');

  useEffect(() => {
    setCartCount(getTotalItems());
  }, [getTotalItems()]);

  return (
    <header className="border-b border-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={isAdmin ? '/admin' : '/'}>
          <span className="text-xl font-bold">T-Shirt Brand</span>
        </Link>
        
        {!isAdmin && (
          <Link href="/cart">
            <div className="relative cursor-pointer">
              <span className="text-2xl">🛒</span>
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
        )}
      </div>
    </header>
  );
}
