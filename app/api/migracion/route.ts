import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const query = `
            SELECT id FROM estudiantes WHERE activo = 1   
            `;
        const [rows]: any = await db.query(query);

        console.log(`Datos obtenidos correctamente (cantidad de registros: ${rows.length})`)
        for (const estudiante of rows) {
          const response = await fetch(`http://localhost:3000/api/usuario`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_estudiante: estudiante.id }),
          });
          const data = await response.json();
          console.log(data)
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
