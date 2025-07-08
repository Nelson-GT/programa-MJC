import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      contraseña,
      rol = "estudiante",
      id_datos = null,
      id_notas = null,
      estado = 1,
    } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Falta el campo obligatorio: email' },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO usuario (
        email, contraseña, rol,
        id_datos, id_notas, estado
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      email,
      contraseña,
      rol,
      id_datos,
      id_notas,
      estado,
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