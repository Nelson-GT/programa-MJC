import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

const crypto = require('crypto');

function creartoken(cadena:string) {
  const sal = crypto.randomBytes(16).toString('hex');
  const cadenaConSal = cadena + sal;
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
    const { id_estudiante } = await req.json();

    if (!id_estudiante) {
      return NextResponse.json(
        { message: 'Falta el campo obligatorio: id_estudiante' },
        { status: 400 }
      );
    }

    const selectQuery = `
      SELECT correo_electronico, nombre, cedula, cedula_representante 
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

    const { correo_electronico, nombre, cedula, cedula_representante } = estudiante[0];

    let usernameToInsert = nombre;
    /*if (correo_electronico === null) {
      usernameToInsert = nombre;
    } else {
      usernameToInsert = correo_electronico;
    }*/

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

    const token = creartoken(now)

    const insertQuery = `
      INSERT INTO users_students (
        username, password, id_estudiante, remember_token, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      usernameToInsert,
      hashedPassword,
      id_estudiante,
      token.hash,
      now,
      now,
    ];

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