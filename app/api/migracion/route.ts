import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { crearUsuario } from "@/app/api/usuario/route";

export async function GET() {
    try {
        const query = `
            SELECT id FROM estudiantes WHERE activo = 1   
            `;
        const [rows]: any = await db.query(query);

        console.log(`Datos obtenidos correctamente (cantidad de registros: ${rows.length})`);

        for (const estudiante of rows) {
            try {
                // Llama a la lógica directamente, sin necesidad de fetch
                const result = await crearUsuario(estudiante.id);
                console.log(`Usuario creado para el estudiante ${estudiante.id}:`, result);
            } catch (creationError:any) {
                console.error(`Error al crear usuario para el estudiante ${estudiante.id}:`, creationError.message);
            }
        }
        return NextResponse.json({
            message: 'Migración completada exitosamente',
            status: 200
        });
    } catch (error) {
        console.error('Ocurrio un error en la migración:', error);
            return NextResponse.json(
                { message: 'Error del servidor', error },
                { status: 500 }
            );
    }
}
