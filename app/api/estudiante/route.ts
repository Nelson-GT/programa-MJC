import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const idParams = searchParams.getAll('id');

        if (!idParams || idParams.length === 0) {
        return NextResponse.json({ message: 'No se proporcionaron IDs' }, { status: 400 });
        }

        const ids = idParams.map(Number).filter((id) => !isNaN(id));
        if (ids.length === 0) {
        return NextResponse.json({ message: 'IDs inválidos' }, { status: 400 });
        }

        const placeholders = ids.map(() => '?').join(', ');
        const query = `SELECT * FROM estudiantes WHERE id IN (${placeholders})`;

        const [rows]: any = await db.query(query, ids);

        return NextResponse.json({
        message: 'Estudiantes obtenidos correctamente',
        data: rows
        });
    } catch (error) {
        console.error('Error al obtener estudiantes por ID:', error);
        return NextResponse.json(
        { message: 'Error al procesar la solicitud', error },
        { status: 500 }
        );
    }
}


export async function POST(req: Request) {
    try {
        const data = await req.json();

        const {
            nombre,
            genero,
            cedula,
            fecha_nacimiento,
            email,
            direccion_residencial,
            telefono,
            emergencia_nombre,
            numeroEmergencia,
            reperesentante_nombre,
            reperesentante_ci,
            reperesentante_parentesco,
            representanteTelefono,
            reperesentante_profesion,
            instrumentos
        } = data;

        const query = `INSERT INTO estudiantes 
            (nombre, genero, cedula, fecha_nacimiento, correo_electronico, direccion, telefono_estudiantes, 
            nombre_emergencia, numero_emergencia, nombre_representante, cedula_representante, 
            parentesco, telefono_representante, ocupacion_representante, instrumento, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            nombre,
            genero,
            cedula,
            fecha_nacimiento,
            email,
            direccion_residencial,
            telefono,
            emergencia_nombre,
            numeroEmergencia,
            reperesentante_nombre,
            reperesentante_ci,
            reperesentante_parentesco,
            representanteTelefono,
            reperesentante_profesion,
            instrumentos,
            new Date().toISOString().slice(0, 19).replace('T', ' '),
            new Date().toISOString().slice(0, 19).replace('T', ' ') 
        ];

        console.log('Datos recibidos:', data);
        console.log('Valores para la consulta:', values);
        const [result]: any = await db.execute(query, values);
        const insertId = result?.insertId ?? null;
        const [result2]: any = await db.execute(`INSERT INTO lista_espera (id_estudiante) VALUES (?)`, [insertId]);
        return NextResponse.json({ message: 'Estudiante registrado', id: insertId });
    } catch (error) {
        console.error('Error al insertar estudiante:', error);
        return NextResponse.json(
        { message: 'Error al procesar la solicitud', error },
        { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { id, id_usuario } = await req.json();

        if (!id || !id_usuario) {
        return NextResponse.json(
            { message: 'Faltan parámetros: se requieren id e id_usuario' },
            { status: 400 }
        );
        }

        const query = `UPDATE estudiante SET id_usuario = ? WHERE id = ?`;
        const [result]: any = await db.execute(query, [id_usuario, id]);

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
