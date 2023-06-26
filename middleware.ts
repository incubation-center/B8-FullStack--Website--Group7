import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // => public routes

  // => protected routes
  // - /admin/*

  // url
  const url = request.nextUrl.clone();

  // get token from cookie
  const token = request.cookies.get('accessToken');

  // condition
  const isAuthRoute = url.pathname.startsWith('/auth');

  // if logged in, redirect to homepage page
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.nextUrl).href);
  }
}
