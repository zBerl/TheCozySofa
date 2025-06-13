import React from 'react';
import { getProducts } from '@/lib/contentful';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products - The Cozy Sofa',
  description: 'Browse our selection of comfortable and stylish sofas.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  console.log('Rendering products page with products:', {
    count: products.length,
    products: products.map(product => ({
      id: product.sys.id,
      title: product.fields.title,
      hasImage: !!product.fields.imgProduct,
    })),
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.sys.id} product={product} />
        ))}
      </div>
    </main>
  );
} 