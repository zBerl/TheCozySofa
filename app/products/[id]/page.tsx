import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct } from '@/lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // Validate and decode the ID
  if (!params.id || typeof params.id !== 'string') {
    return {
      title: 'Invalid Product ID | The Cozy Sofa',
      description: 'The requested product ID is invalid.',
    };
  }

  const productId = decodeURIComponent(params.id);
  
  try {
    const product = await getProduct(productId);
    if (!product) {
      return {
        title: 'Product Not Found | The Cozy Sofa',
        description: 'The requested product could not be found.',
      };
    }
    return {
      title: `${product.fields.title} | The Cozy Sofa`,
      description: product.fields.productText,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product Not Found | The Cozy Sofa',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Validate and decode the ID
  if (!params.id || typeof params.id !== 'string') {
    notFound();
  }

  const productId = decodeURIComponent(params.id);
  
  try {
    const product = await getProduct(productId);
    
    if (!product) {
      notFound();
    }

    const imageUrl = product.fields.imgProduct?.fields?.file?.url;
    
    // Extract URL from RichText content
    const affiliateLinkContent = product.fields.affiliateLink as Document;
    const affiliateLinkHtml = documentToHtmlString(affiliateLinkContent);
    
    // Extract the first URL from the HTML content
    const urlMatch = affiliateLinkHtml.match(/href="([^"]+)"/);
    const affiliateUrl = urlMatch ? urlMatch[1] : '';

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="w-full">
            {imageUrl ? (
              <div className="w-full">
                <Image
                  src={`https:${imageUrl}`}
                  alt={product.fields.title}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-lg"
                  priority
                  quality={90}
                />
              </div>
            ) : (
              <div className="w-full aspect-[2/1] bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.fields.title}</h1>
            
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.fields.productText }} />
            </div>

            {/* Affiliate Link Button */}
            <div className="mt-8">
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                View on Amazon
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering product page:', error);
    notFound();
  }
} 