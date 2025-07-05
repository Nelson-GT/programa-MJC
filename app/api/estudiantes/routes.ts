import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
    const [rows] = await db.query('SELECT * FROM estudiantes')
    return NextResponse.json(rows)
}

/* 
"use client"
import { useEffect, useState } from "react"

type Estudiante = {
    id: number
    nombre: string
    instrumento: string
    // agrega los campos que tengas en tu tabla
}

export default function ListaEstudiantes() {
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const obtenerEstudiantes = async () => {
        try {
            const res = await fetch("/api/estudiantes")
            const data = await res.json()
            setEstudiantes(data)
        } catch (error) {
            console.error("Error al cargar estudiantes:", error)
        } finally {
            setLoading(false)
        }
        }

        obtenerEstudiantes()
    }, [])

    if (loading) return <p>Cargando...</p>

    return (
        <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Listado de Estudiantes</h2>
        <ul className="space-y-2">
            {estudiantes.map((e) => (
            <li key={e.id} className="bg-white p-4 rounded shadow">
                {e.nombre} – {e.instrumento}
            </li>
            ))}
        </ul>
        </div>
    )
}
*/