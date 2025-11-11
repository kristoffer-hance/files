import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  
  // Only handle requests to files.hance.ai
  if (hostname === 'files.hance.ai') {
    // Get the path (everything after files.hance.ai/)
    const filePath = request.nextUrl.pathname.slice(1); // Remove leading slash
    
    // If no path, return 404
    if (!filePath) {
      return new NextResponse('Not found', { status: 404 });
    }
    
    // Build the blob URL
    const blobUrl = `https://n09hnv8wwuep54mn.public.blob.vercel-storage.com/${filePath}`;
    
    // Rewrite to the blob URL
    return NextResponse.rewrite(blobUrl);
  }
  
  // For other domains, continue normally
  return NextResponse.next();
}

// Only run middleware on all paths except Next.js internals
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};