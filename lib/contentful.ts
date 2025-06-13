import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import type { Entry, EntrySkeletonType, EntrySys } from 'contentful';

// Check environment variables
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'Production';
const nodeEnv = process.env.NODE_ENV;

// Safety check for production
if (nodeEnv === 'production' && environment !== 'Production') {
  throw new Error('Cannot use non-Production environment in production build');
}

if (!spaceId || !accessToken || !previewToken) {
  throw new Error('Missing Contentful environment variables');
}

// Create Contentful clients
const client = createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: environment,
});

const previewClient = createClient({
  space: spaceId,
  accessToken: previewToken,
  environment: environment,
  host: 'preview.contentful.com',
});

export interface ProductFields extends EntrySkeletonType {
  contentTypeId: 'product';
  fields: {
    title: string;
    imgProduct: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    productText: string;
    affiliateLink: Document;
  };
}

export interface BlogPostFields extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: {
    title: string;
    slug: string;
    content: Document;
    excerpt: string;
    coverImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    date: string;
    author: string;
  };
}

export type BlogPost = Entry<BlogPostFields>;
export type Product = Entry<ProductFields>;

export async function getBlogPosts(): Promise<BlogPost[]> {
  console.log('📚 [Contentful] Fetching blog posts...');
  console.log('🔑 [Contentful] Environment check:', {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    hasAccessToken: !!process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  try {
    const response = await client.getEntries<BlogPostFields>({
      content_type: 'blogPost',
    });

    console.log('✅ [Contentful] Blog posts response:', {
      total: response.total,
      items: response.items.map(item => ({
        id: item.sys.id,
        product: item.fields.title,
        hasImages: !!item.fields.coverImage,
        imageUrl: item.fields.coverImage?.fields?.file?.url,
        mainText: item.fields.title,
        hasProductLink: !!item.fields.slug,
      })),
    });

    return response.items;
  } catch (error) {
    console.error('❌ [Contentful] Error fetching blog posts:', error);
    throw error;
  }
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  console.log('📚 [Contentful] Fetching blog post:', id);
  try {
    const response = await client.getEntry<BlogPostFields>(id);
    return response;
  } catch (error) {
    console.error('❌ [Contentful] Error fetching blog post:', error);
    throw error;
  }
}

export async function getProducts(): Promise<Product[]> {
  console.log('🛍️ [Contentful] Fetching products...');
  console.log('🔑 [Contentful] Environment check:', {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    hasAccessToken: !!process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  try {
    const response = await client.getEntries<ProductFields>({
      content_type: 'product',
      order: '-sys.createdAt',
    });

    console.log('✅ [Contentful] Products response:', {
      total: response.total,
      items: response.items.map(item => ({
        id: item.sys.id,
        title: item.fields.title,
        hasImage: !!item.fields.imgProduct,
        imageUrl: item.fields.imgProduct?.fields?.file?.url,
        hasProductText: !!item.fields.productText,
        productTextContent: item.fields.productText,
        hasAffiliateLink: !!item.fields.affiliateLink,
        affiliateLinkContent: item.fields.affiliateLink,
      })),
    });

    return response.items;
  } catch (error) {
    console.error('❌ [Contentful] Error fetching products:', error);
    return [];
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  console.log('🛍️ [Contentful] Fetching product:', id);
  console.log('🔑 [Contentful] Environment check:', {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    hasAccessToken: !!process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  if (!id || typeof id !== 'string') {
    console.error('Invalid product ID:', id);
    return null;
  }

  try {
    const response = await client.getEntry<ProductFields>(id);
    return response;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
} 