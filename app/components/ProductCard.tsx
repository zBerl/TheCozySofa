import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/contentful';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={`https:${product.image.fields.file.url}`}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-gray-600">{product.rating}</span>
            <span className="ml-1 text-gray-400">({product.reviewCount})</span>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 bg-gray-800 text-white text-center py-2 px-4 rounded hover:bg-gray-700 transition-colors"
          >
            View Details
          </Link>
          <a
            href={product.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-yellow-400 text-gray-900 text-center py-2 px-4 rounded hover:bg-yellow-500 transition-colors"
          >
            Buy on Amazon
          </a>
        </div>
      </div>
    </div>
  );
} 