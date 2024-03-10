// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const currentUserCookie = request.cookies.get('loggedIn');

  let url = request.url
  if (!currentUserCookie && url.includes('/dashboard')){
    return NextResponse.redirect('http://localhost:3000/')
  }
}