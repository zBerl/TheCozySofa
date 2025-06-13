import React from 'react';
import { getBlogPosts, getProducts } from '@/lib/contentful';
import BlogPostCard from '@/components/BlogPostCard';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Cozy Sofa - Your Guide to Comfortable Living',
  description: 'Discover the perfect sofa for your home with our expert reviews and recommendations.',
};

export default async function HomePage() {
  const [blogPosts, products] = await Promise.all([
    getBlogPosts(),
    getProducts(),
  ]);

  console.log('Rendering homepage with:', {
    blogPosts: {
      count: blogPosts.length,
      posts: blogPosts.map(post => ({
        id: post.sys.id,
        product: post.fields.product,
        hasImage: post.fields.img?.length > 0,
      })),
    },
    products: {
      count: products.length,
      items: products.map(product => ({
        id: product.sys.id,
        title: product.fields.title,
        hasImage: !!product.fields.imgProduct,
      })),
    },
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.sys.id} post={post} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.sys.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
} 