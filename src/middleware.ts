import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/mypage/owner',
    '/mypage/owner/:path*',
    '/mypage/applicant',
    '/mypage/applicant/:path*',
    '/createAlbaform/owner',
    '/createAlbaform/owner/:path*',
    '/createAlbaform/applicant',
    '/createAlbaform/applicant/:path*',
    '/myAlbaform/owner',
    '/myAlbaform/owner/:path*',
    '/myAlbaform/applicant',
    '/myAlbaform/applicant/:path*',
  ],
};

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const role = req.cookies.get('role')?.value;

  if (!role) return NextResponse.next();

  if (pathname.includes('/applicant') && role === 'owner') {
    return NextResponse.redirect(new URL('/owner', req.url));
  }

  if (pathname.includes('owner') && role === 'applicant') {
    return NextResponse.redirect(new URL('/applicant', req.url));
  }

  return NextResponse.next();
}
