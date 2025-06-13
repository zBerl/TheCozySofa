import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';

interface BlogPostCardProps {
  post: {
    sys: {
      id: string;
    };
    fields: {
      product: string;
      img: {
        sys: {
          type: 'Link';
          linkType: 'Asset';
          id: string;
        };
        fields?: {
          file: {
            url: string;
          };
        };
      }[];
      mainText: string;
      productLink?: Document;
    };
  };
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  console.log('BlogPostCard received post:', {
    id: post.sys.id,
    product: post.fields.product,
    hasImages: post.fields.img?.length > 0,
    mainText: post.fields.mainText,
    imageUrl: post.fields.img?.[0]?.fields?.file?.url,
  });

  // Get the first image URL if available
  const imageUrl = post.fields.img?.[0]?.fields?.file?.url
    ? `https:${post.fields.img[0].fields.file.url}`
    : '/images/placeholder.jpg';

  console.log('Processed image URL:', imageUrl);

  const richTextHtml = post.fields.productLink 
    ? documentToHtmlString(post.fields.productLink)
    : '';

  return (
    <article className="group bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/blog/${post.sys.id}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
          {post.fields.img?.[0]?.fields?.file?.url ? (
            <Image
              key={`image-${post.sys.id}`}
              src={imageUrl}
              alt={`Image for ${post.fields.product}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div key={`placeholder-${post.sys.id}`} className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
            {post.fields.product}
          </h2>
          <p className="text-gray-600 line-clamp-3">
            {post.fields.mainText}
          </p>
          {richTextHtml && (
            <div 
              key={`content-${post.sys.id}`}
              className="mt-4 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: richTextHtml }}
            />
          )}
        </div>
      </Link>
    </article>
  );
};

export default BlogPostCard; 