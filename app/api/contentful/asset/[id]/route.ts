import { createClient } from 'contentful';
import { NextResponse } from 'next/server';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const asset = await client.getAsset(params.id);
    const url = `https:${asset.fields.file.url}`;
    
    // Redirect to the actual asset URL
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Error fetching asset:', error);
    return new NextResponse('Asset not found', { status: 404 });
  }
} 