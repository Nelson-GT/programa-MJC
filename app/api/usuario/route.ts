import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

const crypto = require('crypto');

function creartoken(genero:string, fecha_nacimiento:string, nombre:string) {
  const sal = process.env.JWT_SECRET;
  const cadenaConSal = genero + sal + fecha_nacimiento + nombre;
  const hash = crypto.createHash('sha256').update(cadenaConSal).digest('hex');
  return {
    sal: sal,
    hash: hash
  };
}

const bcrypt = require('bcrypt');
const saltRounds = 12;

async function hashPassword(password:string) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function POST(req: NextRequest) {
  try {
    console.log("Creando usuario...")
    const { id_estudiante } = await req.json();
    console.log("id_estudiante recibido:", id_estudiante);

    if (!id_estudiante) {
      return NextResponse.json(
        { message: 'Falta el campo obligatorio: id_estudiante' },
        { status: 400 }
      );
    }

    const selectQuery = `
      SELECT correo_electronico, nombre, cedula, cedula_representante, created_at, genero, fecha_nacimiento 
      FROM estudiantes 
      WHERE id = ?
    `;
    const [estudiante]: any = await db.execute(selectQuery, [id_estudiante]);

    if (!estudiante || estudiante.length === 0) {
      return NextResponse.json(
        { message: 'Estudiante no encontrado en la base de datos' },
        { status: 404 }
      );
    }

    const { correo_electronico, nombre, cedula, cedula_representante, created_at, genero, fecha_nacimiento } = estudiante[0];
    let añoRegistro = new Date(created_at).getFullYear().toString().slice(-2);
    let usernameToInsert = nombre + añoRegistro;

    let passwordToInsert;
    if (cedula === null || cedula.toUpperCase() === 'N/A' || cedula.toUpperCase() === 'NA' || cedula.startsWith("000")) {
      if (cedula_representante === null || cedula_representante.toUpperCase() === 'N/A' || cedula_representante.toUpperCase() === 'NA') {
        passwordToInsert = "123456789";
      } else {
        passwordToInsert = cedula_representante;
      }
    } else {
      passwordToInsert = cedula;
    }

    const hashedPassword = await hashPassword(passwordToInsert);
    
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const token = creartoken(genero, fecha_nacimiento.toISOString(), nombre);

    const insertQuery = `
      INSERT INTO users (
        username, password, rango, remember_token, created_at, updated_at, role_id, id_estudiante
      ) VALUES (?, ?, 'Estudiante', ?, ?, ?, 3)
    `;

    const values = [
      usernameToInsert,
      hashedPassword,
      id_estudiante,
      token.hash,
      now,
      now,
    ];
    console.log(values);

    const [result]: any = await db.execute(insertQuery, values);
    const insertId = result?.insertId ?? null;

    const updateQuery = `
      UPDATE estudiantes SET activo = 1 WHERE id = ?
    `;
    const [datos]: any = await db.execute(updateQuery, [id_estudiante]);

    return NextResponse.json({
      message: 'Usuario creado exitosamente',
      id: insertId,
    });
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor', error },
      { status: 500 }
    );
  }
}

export async function crearUsuario(id_estudiante: number) {
    try {
        const selectQuery = `
            SELECT correo_electronico, nombre, cedula, cedula_representante, created_at, genero, fecha_nacimiento
            FROM estudiantes 
            WHERE id = ?
        `;
        const [estudiante]: any = await db.execute(selectQuery, [id_estudiante]);

        if (!estudiante || estudiante.length === 0) {
            throw new Error('Estudiante no encontrado en la base de datos');
        }

        const { correo_electronico, nombre, cedula, cedula_representante, created_at, genero, fecha_nacimiento } = estudiante[0];

        let añoRegistro = new Date(created_at).getFullYear().toString().slice(-2);
        let usernameToInsert = nombre + añoRegistro;
        usernameToInsert = usernameToInsert.toLowerCase().replaceAll(' ', '');
        
        let passwordToInsert;
        if (cedula === null || cedula.toUpperCase() === 'N/A' || cedula.toUpperCase() === 'NA' || cedula.startsWith("000")) {
            if (cedula_representante === null || cedula_representante.toUpperCase() === 'N/A' || cedula_representante.toUpperCase() === 'NA') {
                passwordToInsert = "123456789";
            } else {
                passwordToInsert = cedula_representante;
            }
        } else {
            passwordToInsert = cedula;
        }

        const hashedPassword = await hashPassword(passwordToInsert);
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const token = creartoken(genero, fecha_nacimiento, nombre);

        const insertQuery = `
            INSERT INTO users (
                username, password, rango, remember_token, created_at, updated_at, role_id, id_estudiante
            ) VALUES (?, ?, 'Estudiante', ?, ?, ?, 3, ?)
        `;

        const values = [
            usernameToInsert,
            hashedPassword,
            token.hash,
            now,
            now,
            id_estudiante,
        ];

        const [result]: any = await db.execute(insertQuery, values);
        const insertId = result?.insertId ?? null;

        const updateQuery = `
            UPDATE estudiantes SET activo = 1 WHERE id = ?
        `;
        await db.execute(updateQuery, [id_estudiante]);

        return {
            message: 'Usuario creado exitosamente',
            id: insertId,
        };
    } catch (error:any) {
        throw new Error('Error al insertar usuario: ' + error.message);
    }
}