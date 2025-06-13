import React from 'react';
import Image from 'next/image';
import { getBlogPost } from '@/lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Document } from '@contentful/rich-text-types';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.id);
  
  if (!post) {
    return {
      title: 'Post Not Found - The Cozy Sofa',
    };
  }

  return {
    title: `${post.fields.product} - The Cozy Sofa`,
    description: post.fields.mainText,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.id);

  if (!post) {
    notFound();
  }

  const imageUrl = post.fields.img?.[0]?.fields?.file?.url
    ? `https:${post.fields.img[0].fields.file.url}`
    : '/images/placeholder.jpg';

  const richTextHtml = post.fields.productLink 
    ? documentToHtmlString(post.fields.productLink)
    : '';

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{post.fields.product}</h1>
        
        <div className="relative aspect-[16/9] mb-8 rounded-lg overflow-hidden">
          {post.fields.img?.[0]?.fields?.file?.url ? (
            <Image
              src={imageUrl}
              alt={`Image for ${post.fields.product}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">{post.fields.mainText}</p>
          
          {richTextHtml && (
            <div dangerouslySetInnerHTML={{ __html: richTextHtml }} />
          )}
        </div>
      </div>
    </article>
  );
} 