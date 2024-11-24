import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware - Path:', request.nextUrl.pathname);
  
  // Aquí podrías implementar la lógica de permisos
  // aunque esto requeriría más cambios en la arquitectura

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
}; 