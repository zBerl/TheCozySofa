import { getBlogPost } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      authors: ['The Cozy Sofa Team'],
      images: [
        {
          url: post.featuredImage.fields.file.url,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage.fields.file.url],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured Image */}
      <div className="relative h-96 rounded-lg overflow-hidden mb-8">
        <Image
          src={`https:${post.featuredImage.fields.file.url}`}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Title and Meta */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="text-gray-500">
          {new Date(post.publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Top Ad */}
      <div className="mb-8">
        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_BLOG_TOP_SLOT!} format="horizontal" />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-8">
        {post.content}
      </div>

      {/* Middle Ad */}
      <div className="my-12">
        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_BLOG_MIDDLE_SLOT!} format="horizontal" />
      </div>

      {/* Bottom Ad */}
      <div className="mt-8">
        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_BLOG_BOTTOM_SLOT!} format="horizontal" />
      </div>

      {/* Back to Blog Link */}
      <div className="mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>
      </div>
    </article>
  );
} 