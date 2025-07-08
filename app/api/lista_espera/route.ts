import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { id_estudiante } = await req.json();

        if (!id_estudiante) {
        return NextResponse.json(
            { message: 'Falta id_estudiante' },
            { status: 400 }
        );
        }

        const query = 'INSERT INTO lista_espera (id_estudiante) VALUES (?)';
        const [result]: any = await db.execute(query, [id_estudiante]);

        return NextResponse.json({
        message: 'Agregado a lista de espera correctamente',
        result,
        });
    } catch (error) {
        console.error('Error al insertar en lista_espera:', error);
        return NextResponse.json(
        { message: 'Error del servidor', error },
        { status: 500 }
        );
    }
}