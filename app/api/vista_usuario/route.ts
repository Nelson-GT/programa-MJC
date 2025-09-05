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
        'SELECT id, nombre, cedula, telefono_estudiantes, correo_electronico, instrumentos, teoricas, otros, activo FROM estudiantes WHERE id = ?',
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

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id) {
        return NextResponse.json(
            { message: 'Falta el id del estudiante' },
            { status: 400 }
        );
        }

        // Consulta SQL con JOIN para obtener todos los datos
        const query = `
        SELECT 
        ar.definitiva AS nota_final, 
        ar.nivel AS nivel_inicial, 
        ar.nivel_obtenido AS siguiente_nivel, 
        ac.catedra AS materia,
        pe.nombre AS periodo, 
        pe.fecha_inicio AS fecha_periodo,
        ac.profesor AS profesor
        FROM acta_renglon AS ar JOIN actas AS ac ON ar.acta_id = ac.id JOIN periodos AS pe ON ac.periodo_id = pe.id
        WHERE ar.estudiante_id = ? ORDER BY pe.fecha_inicio ASC;
        `;

        const [notas]: any = await db.execute(query, [id]);

        if (notas.length === 0) {
        return NextResponse.json(
            { message: 'No se encontraron notas para este estudiante', data: [] },
            { status: 200 }
        );
        }

        return NextResponse.json(
        { message: 'Notas obtenidas con éxito', data: notas },
        { status: 200 }
        );
    } catch (error) {
        console.error('Error al obtener notas:', error);
        return NextResponse.json(
        { message: 'Error interno del servidor', error },
        { status: 500 }
        );
    }
}