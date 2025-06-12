import { createClient, Entry, EntryCollection, EntrySkeletonType } from 'contentful';

export interface BlogPost {
  title: string;
  slug: string;
  content: any;
  featuredImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  excerpt: string;
  publishDate: string;
}

export interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  amazonLink: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  rating: number;
  reviewCount: number;
}

interface BlogPostFields extends EntrySkeletonType {
  fields: {
    title: string;
    slug: string;
    content: any;
    featuredImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    excerpt: string;
    publishDate: string;
  };
  contentTypeId: 'blogPost';
}

interface ProductFields extends EntrySkeletonType {
  fields: {
    name: string;
    slug: string;
    description: string;
    price: number;
    amazonLink: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    rating: number;
    reviewCount: number;
    featured?: boolean;
  };
  contentTypeId: 'product';
}

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID is not defined');
}

if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN is not defined');
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await client.getEntries<BlogPostFields>({
    content_type: 'blogPost',
  });

  return response.items
    .sort((a, b) => new Date(b.fields.publishDate).getTime() - new Date(a.fields.publishDate).getTime())
    .map((item) => ({
      title: item.fields.title,
      slug: item.fields.slug,
      content: item.fields.content,
      featuredImage: item.fields.featuredImage,
      excerpt: item.fields.excerpt,
      publishDate: item.fields.publishDate,
    }));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const response = await client.getEntries<BlogPostFields>({
    content_type: 'blogPost',
    query: slug,
  });

  if (response.items.length === 0) {
    return null;
  }

  const item = response.items[0];
  return {
    title: item.fields.title,
    slug: item.fields.slug,
    content: item.fields.content,
    featuredImage: item.fields.featuredImage,
    excerpt: item.fields.excerpt,
    publishDate: item.fields.publishDate,
  };
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const response = await client.getEntries<ProductFields>({
    content_type: 'product',
  });

  return response.items
    .filter(item => item.fields.featured)
    .map((item) => ({
      name: item.fields.name,
      slug: item.fields.slug,
      description: item.fields.description,
      price: item.fields.price,
      amazonLink: item.fields.amazonLink,
      image: item.fields.image,
      rating: item.fields.rating,
      reviewCount: item.fields.reviewCount,
    }));
}

export async function getProduct(slug: string): Promise<Product | null> {
  const response = await client.getEntries<ProductFields>({
    content_type: 'product',
    query: slug,
  });

  if (response.items.length === 0) {
    return null;
  }

  const item = response.items[0];
  return {
    name: item.fields.name,
    slug: item.fields.slug,
    description: item.fields.description,
    price: item.fields.price,
    amazonLink: item.fields.amazonLink,
    image: item.fields.image,
    rating: item.fields.rating,
    reviewCount: item.fields.reviewCount,
  };
} 