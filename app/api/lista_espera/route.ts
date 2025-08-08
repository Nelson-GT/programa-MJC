import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const query = `
            SELECT 
                e.id,
                e.nombre,
                e.fecha_nacimiento,
                e.cedula,
                e.instrumento,
                e.telefono_estudiantes AS telefono,
                e.correo_electronico AS email,
                e.direccion,
                e.nombre_emergencia,
                e.numero_emergencia,
                e.nombre_representante,
                e.cedula_representante,
                e.parentesco,
                e.telefono_representante,
                e.ocupacion_representante,
                le.estado
            FROM 
                estudiantes e
            INNER JOIN 
                lista_espera le ON e.id = le.id_estudiante
            WHERE 
                le.estado = 1
            ORDER BY 
                le.id ASC`;
        const [rows]: any = await db.query(query);

        return NextResponse.json({
            message: 'Lista de espera obtenida correctamente',
            data: rows,
        });
    } catch (error) {
        console.error('Error al obtener lista_espera:', error);
        return NextResponse.json(
            { message: 'Error del servidor', error },
            { status: 500 }
        );
    }
}

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

export async function PUT(req: NextRequest) {
    try {
        const { id_estudiante, estado } = await req.json();

        if (id_estudiante === undefined || estado === undefined ) {
        return NextResponse.json(
            { message: 'Faltan parámetros: se requieren id_estudiante y estado' },
            { status: 400 }
        );
        }

        const query = `UPDATE lista_espera SET estado = ? WHERE id_estudiante = ?`;
        const [result]: any = await db.execute(query, [estado, id_estudiante]);

        if (result.affectedRows === 0) {
        return NextResponse.json(
            { message: 'No se encontró un estudiante con ese ID' },
            { status: 404 }
        );
        }

        return NextResponse.json({
        message: 'id_usuario actualizado correctamente',
        result,
        });
    } catch (error) {
        console.error('Error al actualizar id_usuario:', error);
        return NextResponse.json(
        { message: 'Error al procesar la solicitud', error },
        { status: 500 }
        );
    }
}
