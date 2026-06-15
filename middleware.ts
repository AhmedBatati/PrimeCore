export const config = {
  matcher: [
    '/owner-dashboard.html',
    '/data/:path*',
    '/scripts/:path*',
    '/.agents/:path*',
    '/.gemini/:path*',
    '/.impeccable/:path*',
    '/.vscode/:path*',
    '/DESIGN.md',
    '/PRODUCT.md',
    '/package.json',
  ],
};

export default function middleware(request: Request) {
  const pathname = new URL(request.url).pathname;

  if (
    pathname.startsWith('/data/') ||
    pathname.startsWith('/scripts/') ||
    pathname.startsWith('/.agents/') ||
    pathname.startsWith('/.gemini/') ||
    pathname.startsWith('/.impeccable/') ||
    pathname.startsWith('/.vscode/') ||
    pathname === '/DESIGN.md' ||
    pathname === '/PRODUCT.md' ||
    pathname === '/package.json'
  ) {
    return new Response('Not found', {
      status: 404,
      headers: {
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  const cookieHeader = request.headers.get('cookie') || '';

  if (!cookieHeader.includes('primecore_owner_session=')) {
    const loginUrl = new URL('/owner-login.html', request.url);
    loginUrl.searchParams.set('next', '/owner-dashboard.html');
    return Response.redirect(loginUrl);
  }
}
