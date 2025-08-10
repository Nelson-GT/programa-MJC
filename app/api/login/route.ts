import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

const bcrypt = require('bcrypt');
async function comparePassword(password:string, hash:string) {
    const result = await bcrypt.compare(password, hash);
    return result;
}

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const [estudianteRows]: any = await db.query(
        'SELECT password, id_estudiante FROM users_students WHERE username = ?',
        [email]
        );

        const estudiante = estudianteRows[0];
        console.log("Estudiante encontrado:", estudiante);
        if (!estudiante) {
        return NextResponse.json({ message: 'Estudiante no encontrado' }, { status: 404 });
        }

        // Comparar contraseña
        const isMatch = await comparePassword(password, estudiante.password);
        if (!isMatch) {
        return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
        }

        // Autenticación exitosa
        return NextResponse.json({ message: 'Login exitoso', userId: estudiante.id_estudiante });
    } catch (error) {
        console.error('Error en login:', error);
        return NextResponse.json({ message: 'Error interno', error }, { status: 500 });
    }
}