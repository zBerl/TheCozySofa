import { getFeaturedProducts } from '@/lib/contentful';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products',
  description: 'Browse our curated collection of premium sofas and furniture. Find the perfect addition to your home with our expert recommendations.',
  openGraph: {
    title: 'Our Products | The Cozy Sofa',
    description: 'Browse our curated collection of premium sofas and furniture. Find the perfect addition to your home with our expert recommendations.',
  },
};

export default async function ProductsPage() {
  const products = await getFeaturedProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
} 