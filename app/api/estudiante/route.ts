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
        nombre, fecha_nacimiento, sexo, ci,
        telefono, institucion_educacional, ocupacion, profesion, lugar_trabajo,
        direccion_residencial, email, alergias, antecedentes, antecedentes_especificados,
        emergencia_nombre, emergencia_telefono, reperesentante_nombre, reperesentante_ci,
        reperesentante_parentesco, reperesentante_telefono, reperesentante_ocupacion,
        reperesentante_profesion, reperesentante_lugar_trabajo,
        reperesentante_direccion, reperesentante_email,
        instrumentos, teoricas, otros,
        } = data;

        const query = `
        INSERT INTO estudiante (
            nombre, fecha_nacimiento, sexo, ci,
            telefono, institucion_educacional, ocupacion, profesion, lugar_trabajo,
            direccion_residencial, email, alergico, antecedentes, antecedentes_especificados,
            emergencia_nombre, emergencia_telefono, reperesentante_nombre, reperesentante_ci,
            reperesentante_parentesco, reperesentante_telefono, reperesentante_ocupacion,
            reperesentante_profesion, reperesentante_lugar_trabajo,
            reperesentante_direccion, reperesentante_email,
            instrumentos, teorica, otros
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
        nombre, fecha_nacimiento, sexo, ci,
        telefono, institucion_educacional, ocupacion, profesion, lugar_trabajo,
        direccion_residencial, email, alergias, antecedentes, antecedentes_especificados,
        emergencia_nombre, emergencia_telefono, reperesentante_nombre, reperesentante_ci,
        reperesentante_parentesco, reperesentante_telefono, reperesentante_ocupacion,
        reperesentante_profesion, reperesentante_lugar_trabajo,
        reperesentante_direccion, reperesentante_email,
        instrumentos, teoricas, otros,
        ];

        console.log('Datos recibidos:', data);
        console.log('Valores para la consulta:', values);
        const [result]: any = await db.execute(query, values);
        const insertId = result?.insertId ?? null;

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
