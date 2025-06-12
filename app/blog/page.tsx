import { getBlogPosts } from '@/lib/contentful';
import BlogPostCard from '@/components/BlogPostCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our latest articles about furniture, interior design, and home decor. Get expert tips and insights to help you create your perfect living space.',
  openGraph: {
    title: 'Blog | The Cozy Sofa',
    description: 'Read our latest articles about furniture, interior design, and home decor. Get expert tips and insights to help you create your perfect living space.',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
} 