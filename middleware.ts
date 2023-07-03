import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

import { isUserAdmin, isTokenValid, decodeToken, Token } from './service/token';

export async function middleware(request: NextRequest) {
  // => public routes
  // - /

  // => protected routes
  // - /admin/*

  // url
  const url = request.nextUrl.clone();

  // get token from cookie
  const accessToken = decodeToken(request.cookies.get('accessToken')?.value);

  // condition
  const isAuthRoute = url.pathname.startsWith('/auth');
  const isAdminRoute = url.pathname.startsWith('/admin');

  // if logged in, redirect to homepage page
  if (isAuthRoute) {
    if (!accessToken) return;

    const tokenValidation = await isTokenValid((accessToken as Token).value);

    if (tokenValidation) {
      return NextResponse.redirect(new URL('/', request.nextUrl).href);
    }

    return;
  } else if (isAdminRoute) {
    // in case, user try to access admin route via url
    if (!accessToken) {
      return NextResponse.redirect(
        new URL('/unauthorized-page', request.nextUrl).href
      );
    }

    // check if user is admin
    const adminValidation = isUserAdmin((accessToken as Token).value);
    if (!adminValidation) {
      return NextResponse.redirect(
        new URL('/unauthorized-page', request.nextUrl).href
      );
    }

    // at this point, user is admin
    // check if token is valid
    const tokenValidation = await isTokenValid((accessToken as Token).value);
    if (!tokenValidation) {
      return NextResponse.redirect(new URL('/', request.nextUrl).href);
    }
  }
}
