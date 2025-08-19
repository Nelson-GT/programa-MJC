import { NextResponse } from "next/server";

export async function middleware(req){
    const jwt = req.cookies.get('auth-token')?.value
    
    if (req.nextUrl.pathname.includes('/usuario')){
        if (jwt===undefined){
            const url = req.nextUrl.clone();
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next()
}