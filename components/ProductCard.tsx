import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/contentful';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log('ProductCard received product:', {
    id: product.sys.id,
    title: product.fields.title,
    hasImage: !!product.fields.imgProduct,
    imageUrl: product.fields.imgProduct?.fields?.file?.url,
    productText: product.fields.productText,
  });

  const imageUrl = product.fields.imgProduct?.fields?.file?.url;
  const processedImageUrl = imageUrl ? `https:${imageUrl}` : null;
  console.log('Processed image URL:', processedImageUrl);

  return (
    <Link href={`/products/${product.sys.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
        <div className="relative h-48">
          {processedImageUrl ? (
            <Image
              src={processedImageUrl}
              alt={product.fields.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{product.fields.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.fields.productText}</p>
          <div className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            View Product →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 