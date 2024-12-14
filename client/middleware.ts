import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    console.log(request.cookies);
    
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const secret = process.env.JWT_SECRET;
        
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        
        const isValid = await jwtVerify(token.value, new TextEncoder().encode(secret));
        if (!isValid) {
            throw new Error('Invalid token');
        }
        const response = NextResponse.next();
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/', '/course/:path*', '/createUpdate/:path*', '/userCourses'],
};
