import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!isAdmin && (
        <header className="border-b border-gray-300 sticky top-0 bg-white z-40">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-4">
              <Link href="/">
                <span className="text-xl font-bold">T-Shirt Brand</span>
              </Link>
              
              <Link href="/cart">
                <div className="relative">
                  <span className="text-2xl">🛒</span>
                </div>
              </Link>
            </div>

            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-gray-300 text-sm"
              onChange={(e) => {
                if (e.target.value) {
                  router.push(`/search?q=${e.target.value}`);
                }
              }}
            />
          </div>
        </header>
      )}

      {isAdmin && (
        <header className="border-b border-gray-300 bg-black text-white">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/admin">
              <span className="text-xl font-bold">Admin Dashboard</span>
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('adminToken');
                router.push('/admin/login');
              }}
              className="bg-white text-black px-4 py-2 text-sm font-bold"
            >
              Logout
            </button>
          </div>
        </header>
      )}

      <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-gray-300 mt-12 py-6 text-center text-sm">
        <p>&copy; 2024 T-Shirt Brand. All rights reserved.</p>
      </footer>
    </div>
  );
}
