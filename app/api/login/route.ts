import { NextRequest, NextResponse } from 'next/server';
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
        console.log("Estudiante encontrado:", estudiante);
        if (!estudiante) {
        return NextResponse.json({ message: 'Estudiante no encontrado' }, { status: 404 });
        }

        // Buscar usuario con el id del estudiante
        const [userRows]: any = await db.query(
        'SELECT * FROM users WHERE id_estudiante = ?',
        [estudiante.id]
        );

        const user = userRows[0];
        console.log("usuario:", user)
        if (!user) {
        return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
        }

        // Comparar contraseña
        const isMatch = (password === user.password);
        if (!isMatch) {
        return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
        }

        // Autenticación exitosa
        return NextResponse.json({ message: 'Login exitoso', userId: user.id_estudiante });
    } catch (error) {
        console.error('Error en login:', error);
        return NextResponse.json({ message: 'Error interno', error }, { status: 500 });
    }
}