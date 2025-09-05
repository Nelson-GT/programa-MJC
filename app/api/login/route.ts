import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { SignJWT } from 'jose';
import { TextEncoder } from 'util';
const bcrypt = require('bcrypt');

const JWT_CONFIG = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET || 'secreto-seguro'),
  algorithm: 'HS256',
  expiresIn: '1h',
  cookieName: 'auth-token',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 60 * 60 * 1
  }
};
async function comparePassword(password: string, hash: string) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

export async function POST(req: NextRequest,res: NextResponse) {
  try {
    const { email, password } = await req.json();

    const [estudianteRows]: any = await db.query(
      'SELECT password, id_estudiante, remember_token, role_id FROM users WHERE username = ?',
      [email]
    );

    const estudiante = estudianteRows[0];
    
    if (!estudiante) {
      return NextResponse.json(
        { message: 'Estudiante no encontrado' }, 
        { status: 404 }
      );
    }
    const isMatch = await comparePassword(password, estudiante.password);
    if (!isMatch) {

      return NextResponse.json(
        { message: 'Contraseña incorrecta' }, 
        { status: 401 }
      );
    }
    const token = await new SignJWT({ 
      userId: estudiante.id_estudiante,
      role_id: estudiante.role_id,
      remember_token: estudiante.remember_token,
    })
      .setProtectedHeader({ alg: JWT_CONFIG.algorithm })
      .setIssuedAt()
      .setExpirationTime(JWT_CONFIG.expiresIn)
      .sign(JWT_CONFIG.secret);

    let url;
    console.log(`id: ${estudiante.id_estudiante}, rol : ${estudiante.role_id}`)
    if (estudiante.role_id === 1) {
      url = `/admin`;
    } else {
      url = `/usuario/${estudiante.id_estudiante}`;
    }

    const response = NextResponse.json(
      { 
        message: 'Login exitoso', 
        userId: estudiante.id_estudiante,
        redirectUrl: url 
      },
      { status: 200 }
    );
    response.cookies.set({
      name: JWT_CONFIG.cookieName,
      value: token,
      ...JWT_CONFIG.cookieOptions
    });

    return response;

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json(
      { message: 'Error interno', error }, 
      { status: 500 }
    );
  }
}