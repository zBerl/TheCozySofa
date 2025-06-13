import React from 'react';
import { getBlogPosts } from '@/lib/contentful';
import BlogPostCard from '@/components/BlogPostCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - The Cozy Sofa',
  description: 'Read our latest articles about comfortable living and sofa selection.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  console.log('Rendering blog page with posts:', {
    count: posts.length,
    posts: posts.map(post => ({
      id: post.sys.id,
      title: post.fields.title,
      hasImage: !!post.fields.featuredImage,
    })),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogPostCard
            key={post.sys.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
} 