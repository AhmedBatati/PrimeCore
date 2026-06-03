export const config = {
  matcher: '/owner-dashboard.html',
};

export default function middleware(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';

  if (!cookieHeader.includes('primecore_owner_session=')) {
    const loginUrl = new URL('/owner-login.html', request.url);
    loginUrl.searchParams.set('next', '/owner-dashboard.html');
    return Response.redirect(loginUrl);
  }
}
