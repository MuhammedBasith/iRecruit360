import { NextRequest, NextResponse } from 'next/server';


export default function adminMiddleware(request: NextRequest) {
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

  const url = request.url;

  if (!adminCookie && adminProtectedRoutes.some(route => url.includes(route))) {
    return NextResponse.redirect('http://localhost:3000/admin-login');
  }

  return NextResponse.next();
}
