import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const query = `
            SELECT nombre, id, tipo FROM catedras`;
        const [rows]: any = await db.query(query);
        const query2 = `
            SELECT nombre, id FROM grupales`;
        const [rows2]: any = await db.query(query2);

        return NextResponse.json({
            message: 'Lista de espera obtenida correctamente',
            data: rows,
            grupales: rows2,
        });
    } catch (error) {
        console.error('Error al obtener lista_espera:', error);
        return NextResponse.json(
            { message: 'Error del servidor', error },
            { status: 500 }
        );
    }
}