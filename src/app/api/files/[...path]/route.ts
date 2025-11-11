import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  // Replace with your actual blob storage URL
  const blobBaseUrl = 'https://YOUR_BLOB_URL.blob.vercel-storage.com';
  
  const { path } = await params;
  const filePath = path.join('/');
  const blobUrl = `${blobBaseUrl}/${filePath}`;
  
  const response = await fetch(blobUrl);
  
  if (!response.ok) {
    return new NextResponse('File not found', { status: 404 });
  }
  
  const blob = await response.blob();
  
  return new NextResponse(blob, {
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}