import { NextRequest, NextResponse } from 'next/server';


export default function middleware(request: NextRequest) {
  const currentUserCookie = request.cookies.get('loggedIn');

  const protectedRoutes = [
    '/candidate/instructions',
    '/candidate/interview-details',
    '/candidate/round-one',
    '/candidate/round-two',
    '/candidate/round-three',
  ];

  const url = request.url;

  if (!currentUserCookie && protectedRoutes.some(route => url.includes(route))) {
    return NextResponse.redirect('http://localhost:3000/');
  }

  const adminCookie = request.cookies.get('adminLoggedIn');
  console.log(adminCookie)

  const adminProtectedRoutes = [
    'admin/add-candidates',
    'admin/add-interview',
    'admin/add-questions',
    'admin/admin-home',
    'admin/candidate-report',
    'admin/schedule-interview',
    'admin/show-interviews',
    'admin/view-results',
  ];

  if (!adminCookie && adminProtectedRoutes.some(route => url.includes(route))) {
    return NextResponse.redirect('http://localhost:3000/admin-login');
  }

  return NextResponse.next();
}
