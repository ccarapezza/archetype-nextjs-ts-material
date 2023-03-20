// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: [
    '/api/protected/:function*',
    '/protected/:function*'
  ]
}

const URL_PERMISSIONS = {
  '/api/protected': ['user'],
  '/api/admin': ['admin'],
}

export async function middleware(req: NextRequest) {
  const session = await getToken({req})
  if (!session) {
    return NextResponse.rewrite(new URL('/auth/sign-in', req.url))
  }

  return NextResponse.next();
}