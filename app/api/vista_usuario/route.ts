import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const rawId = searchParams.get('id');
        const id = Number(rawId);

        if (!id || isNaN(id)) {
        return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
        }

        const [rows]: any = await db.query(
        'SELECT * FROM estudiantes WHERE id = ?',
        [id]
        );

        return NextResponse.json({
        message: 'Estudiante obtenido correctamente',
        data: rows
        });
    } catch (error) {
        console.error('Error al obtener estudiante por ID:', error);
        return NextResponse.json(
        { message: 'Error al procesar la solicitud', error },
        { status: 500 }
        );
    }
}