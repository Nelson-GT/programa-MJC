import { NextResponse } from 'next/server';
import db from '@/lib/db';

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