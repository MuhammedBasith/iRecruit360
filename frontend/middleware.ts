// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const currentUserCookie = request.cookies.get('loggedIn');
  // console.log('currentUserCookie*** ', currentUserCookie)

  let url = request.url
  // console.log(url)
  if (!currentUserCookie && url.includes('/dashboard')){
    return NextResponse.redirect('http://localhost:3000/')
  }
}