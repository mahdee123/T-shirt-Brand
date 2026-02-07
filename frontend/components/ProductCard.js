import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product._id}`}>
      <div className="border border-gray-300 p-3 h-full cursor-pointer hover:border-black transition-colors">
        <div className="bg-gray-100 aspect-square mb-3 flex items-center justify-center overflow-hidden">
          {product.images && product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400">No image</div>
          )}
        </div>
        <h3 className="font-bold text-sm mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-lg font-bold">${product.price}</p>
      </div>
    </Link>
  );
}
