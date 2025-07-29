import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // Buscar estudiante por email
        const [estudianteRows]: any = await db.query(
        'SELECT * FROM estudiantes WHERE correo_electronico = ?',
        [email]
        );

        const estudiante = estudianteRows[0];
        if (!estudiante) {
        return NextResponse.json({ message: 'Estudiante no encontrado' }, { status: 404 });
        }

        // Buscar usuario con el id del estudiante
        const [userRows]: any = await db.query(
        'SELECT * FROM users WHERE estudiante_id = ?',
        [estudiante.id]
        );

        const user = userRows[0];
        if (!user) {
        return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
        }

        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
        }

        // Autenticación exitosa
        return NextResponse.json({ message: 'Login exitoso', userId: user.id });
    } catch (error) {
        console.error('Error en login:', error);
        return NextResponse.json({ message: 'Error interno', error }, { status: 500 });
    }
}