import { NextResponse } from 'next/server';

export function middleware(req) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // Only protect the /admin route
  if (url.pathname.startsWith('/admin')) {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      // Decode base64
      const [user, pwd] = atob(authValue).split(':');

      // Simple hardcoded check
      if (user === 'admin' && pwd === 'adarsh123') {
        return NextResponse.next();
      }
    }
    
    url.pathname = '/api/auth';
    // Trigger Basic Auth popup in browser
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};
