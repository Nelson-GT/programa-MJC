import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const {
      id_estudiante,
      contraseña,
    } = await req.json();

    if (!id_estudiante) {
      return NextResponse.json(
        { message: 'Falta el campo obligatorio: id_estudiante' },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO users (
        id_estudiante, password 
      ) VALUES (?, ?)
    `;

    const values = [
      id_estudiante,
      contraseña
    ];

    const [result]: any = await db.execute(query, values);
    const insertId = result?.insertId ?? null;

    return NextResponse.json({
      message: 'Usuario creado exitosamente',
      id: insertId,
    });
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor', error },
      { status: 500 }
    );
  }
}