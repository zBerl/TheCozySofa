const { createClient } = require('contentful-management');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

async function createSampleContent() {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT || 'master');

    // Create sample blog posts
    const blogPosts = [
      {
        title: 'The Ultimate Guide to Choosing the Perfect Sofa',
        slug: 'ultimate-guide-choosing-perfect-sofa',
        content: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Finding the perfect sofa for your home can be a daunting task. In this comprehensive guide, we\'ll walk you through everything you need to know about selecting the ideal sofa for your space.',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        },
        excerpt: 'A comprehensive guide to help you find the perfect sofa for your home.',
        publishDate: new Date().toISOString()
      },
      {
        title: 'Top 10 Sofa Trends for 2024',
        slug: 'top-10-sofa-trends-2024',
        content: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Discover the latest sofa trends that are making waves in 2024. From sustainable materials to innovative designs, we\'ve got you covered.',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        },
        excerpt: 'Stay ahead of the curve with these trending sofa styles for 2024.',
        publishDate: new Date().toISOString()
      }
    ];

    // Create sample products
    const products = [
      {
        name: 'Modern Sectional Sofa',
        slug: 'modern-sectional-sofa',
        description: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'A luxurious modern sectional sofa that combines comfort with contemporary design. Perfect for large living spaces.',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        },
        price: 1299.99,
        amazonLink: 'https://amazon.com/modern-sectional-sofa',
        rating: 4.5,
        reviewCount: 128,
        featured: true
      },
      {
        name: 'Compact Loveseat',
        slug: 'compact-loveseat',
        description: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Perfect for small spaces, this compact loveseat offers maximum comfort without taking up too much room.',
                  marks: [],
                  data: {}
                }
              ]
            }
          ]
        },
        price: 499.99,
        amazonLink: 'https://amazon.com/compact-loveseat',
        rating: 4.2,
        reviewCount: 85,
        featured: false
      }
    ];

    // Upload images first
    const imageAssets = await Promise.all([
      uploadImage(environment, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc', 'sofa-1.jpg'),
      uploadImage(environment, 'https://images.unsplash.com/photo-1567016432779-094069958ea5', 'sofa-2.jpg'),
      uploadImage(environment, 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e', 'loveseat-1.jpg'),
      uploadImage(environment, 'https://images.unsplash.com/photo-1491924778227-f225b115b5b2', 'loveseat-2.jpg')
    ]);

    // Create blog posts
    for (const post of blogPosts) {
      const entry = await environment.createEntry('blogPost', {
        fields: {
          title: { 'en-US': post.title },
          slug: { 'en-US': post.slug },
          content: { 'en-US': post.content },
          featuredImage: { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: imageAssets[0].sys.id } } },
          excerpt: { 'en-US': post.excerpt },
          publishDate: { 'en-US': post.publishDate }
        }
      });
      await entry.publish();
      console.log(`Created blog post: ${post.title}`);
    }

    // Create products
    for (const [index, product] of products.entries()) {
      const entry = await environment.createEntry('product', {
        fields: {
          name: { 'en-US': product.name },
          slug: { 'en-US': product.slug },
          description: { 'en-US': product.description },
          price: { 'en-US': product.price },
          amazonLink: { 'en-US': product.amazonLink },
          image: { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: imageAssets[index + 2].sys.id } } },
          rating: { 'en-US': product.rating },
          reviewCount: { 'en-US': product.reviewCount },
          featured: { 'en-US': product.featured }
        }
      });
      await entry.publish();
      console.log(`Created product: ${product.name}`);
    }

    console.log('Sample content created successfully!');
  } catch (error) {
    console.error('Error creating sample content:', error);
  }
}

async function uploadImage(environment, url, fileName) {
  const response = await fetch(url);
  const buffer = await response.buffer();
  
  const asset = await environment.createAsset({
    fields: {
      title: { 'en-US': fileName },
      file: {
        'en-US': {
          contentType: 'image/jpeg',
          fileName: fileName,
          file: buffer
        }
      }
    }
  });

  await asset.processForAllLocales();
  await asset.publish();
  return asset;
}

createSampleContent(); 