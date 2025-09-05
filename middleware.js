import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');

export async function middleware(req){
    const jwt = req.cookies.get('auth-token')?.value
    
    if (req.nextUrl.pathname.includes('/usuario')){
        if (jwt===undefined){
            const url = req.nextUrl.clone();
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
        try {
            const { payload } = await jwtVerify(jwt, JWT_SECRET);
            const userIdInToken = payload.userId;

            const pathSegments = req.nextUrl.pathname.split('/');
            const userIdInUrl = parseInt(pathSegments[pathSegments.length - 1], 10);

            if (userIdInToken !== userIdInUrl) {
                const url = req.nextUrl.clone();
                url.pathname = "/login";
                return NextResponse.redirect(url);
            }
            return NextResponse.next();

        } catch (error) {
            const url = req.nextUrl.clone();
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    } else if (req.nextUrl.pathname.includes('/admin')){
        if (jwt===undefined){
            const url = req.nextUrl.clone();
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
        try {
            const { payload } = await jwtVerify(jwt, JWT_SECRET);
            const role_id = payload.role_id;
            if (role_id !== 1) {
                const url = req.nextUrl.clone();
                url.pathname = "/login";
                return NextResponse.redirect(url);
            }
            return NextResponse.next();

        } catch (error) {
            const url = req.nextUrl.clone();
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
}