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
            // 1. Decodificar y verificar el token con el secreto
            const { payload } = await jwtVerify(jwt, JWT_SECRET);
            
            // 2. Extraer el ID del usuario del payload del token
            const userIdInToken = payload.userId;
            
            // 3. Extraer el ID del usuario de la URL
            const pathSegments = req.nextUrl.pathname.split('/');
            const userIdInUrl = parseInt(pathSegments[pathSegments.length - 1], 10);

            // 4. Comparar los IDs: Autorización
            // Si el ID del token no coincide con el ID de la URL, deniega el acceso
            if (userIdInToken !== userIdInUrl) {
                // Redirigir a una página de error 403 (Prohibido)
                const url = req.nextUrl.clone();
                url.pathname = "/login";
                return NextResponse.redirect(url);
            }
            
            // Si los IDs coinciden, continúa la solicitud
            return NextResponse.next();

        } catch (error) {
            // Si el token es inválido o ha expirado, redirige a login
            const url = req.nextUrl.clone();
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
}