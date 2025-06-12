import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/contentful';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={`https:${post.featuredImage.fields.file.url}`}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">
          {new Date(post.publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  );
} 