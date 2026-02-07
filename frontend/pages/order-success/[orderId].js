import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function OrderSuccess() {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-md mx-auto border border-gray-300 p-8 text-center">
          <div className="text-4xl mb-4">✓</div>
          <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">Thank you for your order. Your item will be delivered soon.</p>

          {orderId && (
            <div className="bg-gray-100 p-4 mb-6 rounded">
              <p className="text-xs text-gray-600 mb-1">Order ID</p>
              <p className="font-bold text-lg break-all">{orderId}</p>
            </div>
          )}

          <p className="text-sm text-gray-600 mb-6">
            Payment method: <strong>Cash on Delivery</strong>
          </p>

          <Link href="/">
            <button className="w-full bg-black text-white py-3 font-bold mb-2">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
