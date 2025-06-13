import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import type { Entry } from 'contentful';

// Check environment variables
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error('Missing Contentful environment variables');
}

// Create Contentful client
const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

export interface ProductFields {
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
}

export interface BlogPostFields {
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
}

export type BlogPost = Entry<BlogPostFields>;
export type Product = Entry<ProductFields>;

export async function getBlogPosts() {
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

export async function getBlogPost(id: string) {
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

    return response.items.map(item => ({
      sys: {
        id: item.sys.id,
      },
      fields: item.fields,
    }));
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
    // First try to get the entry directly
    const response = await client.getEntry<ProductFields>(id);
    
    if (!response || !response.fields) {
      console.error('No product found with ID:', id);
      return null;
    }

    // Return the product directly
    return {
      sys: {
        id: response.sys.id,
      },
      fields: response.fields,
    };
  } catch (error) {
    // If direct entry fetch fails, try to find it in the entries list
    try {
      const entries = await client.getEntries<ProductFields>({
        content_type: 'product',
        'sys.id': id,
      });

      if (entries.items.length === 0) {
        console.error('No product found with ID:', id);
        return null;
      }

      const product = entries.items[0];
      return {
        sys: {
          id: product.sys.id,
        },
        fields: product.fields,
      };
    } catch (fallbackError) {
      console.error('Error fetching product:', error);
      return null;
    }
  }
} 