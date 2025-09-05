"use client"
import Head from "next/head"
import Footer from "@/components/Footer"
import Navbar from "@/components/NavbatUser"
import { useParams } from "next/navigation"
import React, { useState, useEffect } from "react"

const foto = "/musico.jpg";

type Nota = {
    nota_final: number;
    nivel_inicial: string;
    siguiente_nivel: string;
    materia: string;
    periodo: string;
    fecha_periodo: string;
    profesor: string;
};

interface Estudiante {
    id: number;
    nombre: string;
    cedula: string;
    telefono_estudiantes: string;
    correo_electronico: string;
    instrumentos: string;
    teoricas: string;
    otros: string;
    activo: number;
}

function agruparPorMateria(notas: Nota[]): Record<string, Nota[]> {
    return notas.reduce((acc, nota) => {
        acc[nota.materia] = acc[nota.materia] || [];
        acc[nota.materia].push(nota);
        return acc;
    }, {} as Record<string, Nota[]>);
}

export default function Estudiante() {
    const { id } = useParams();
    const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
    const [notasAgrupadas, setNotasAgrupadas] = useState<Record<string, Nota[]> | null>(null);
    const [loadingEstudiante, setLoadingEstudiante] = useState(true);
    const [loadingNotas, setLoadingNotas] = useState(false); // Nuevo estado de carga para notas
    const [errorEstudiante, setErrorEstudiante] = useState<string | null>(null);
    const [errorNotas, setErrorNotas] = useState<string | null>(null); // Nuevo estado de error para notas

    const fetchDatosEstudiante = async () => {
        try {
            setLoadingEstudiante(true);
            const resEstudiante = await fetch(`/api/vista_usuario?id=${id}`);
            if (!resEstudiante.ok) {
                throw new Error(`Error al obtener datos del estudiante: ${resEstudiante.statusText}`);
            }
            const dataEstudiante = await resEstudiante.json();
            setEstudiante(dataEstudiante.data[0]);
        } catch (err) {
            console.error('Error al obtener datos del estudiante:', err);
            setErrorEstudiante('No se pudieron cargar los datos del estudiante.');
        } finally {
            setLoadingEstudiante(false);
        }
    };

    const fetchNotasEstudiante = async (id: string) => {
        try {
            setLoadingNotas(true);
            const resNotas = await fetch("/api/vista_usuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            if (!resNotas.ok) {
                throw new Error(`Error al obtener notas: ${resNotas.statusText}`);
            }
            const result = await resNotas.json();
            const notasAgrupadas = agruparPorMateria(result.data);
            setNotasAgrupadas(notasAgrupadas);
        } catch (err) {
            console.error('Error al obtener las notas:', err);
            setErrorNotas('No se pudieron cargar las notas del estudiante.');
            setNotasAgrupadas(null); // Asegura que no se muestren datos parciales
        } finally {
            setLoadingNotas(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchDatosEstudiante();
        }
    }, [id]);
    
    useEffect(() => {
        if (id) {
            const idStr = Array.isArray(id) ? id[0] : id;
            fetchNotasEstudiante(idStr);
        }
    }, [id]);

    if (loadingEstudiante) {
        return (
            <div className="w-full flex justify-center items-center h-screen">
                <p className="text-xl">Cargando...</p>
            </div>
        );
    }

    if (errorEstudiante) {
        return (
            <div className="w-full flex justify-center items-center h-screen">
                <p className="text-xl text-red-500">Error: {errorEstudiante}</p>
            </div>
        );
    }
    
    // Si no hay estudiante, muestra un mensaje
    if (!estudiante) {
        return (
            <div className="w-full flex justify-center items-center h-screen">
                <p className="text-xl text-gray-600">Estudiante no encontrado.</p>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Información del Estudiante</title>
            </Head>
            <Navbar />
            <div className="w-full flex flex-col items-center px-4 py-8">
                <div className="bg-white rounded-xl p-4 mb-8">
                    <div className="p-12 border border-gray-300 rounded-xl shadow-md hover:shadow-xl duration-500">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Información Personal</h2>
                        <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-5xl mb-8">
                            <img
                                src={foto}
                                alt={estudiante.nombre || "Foto del Estudiante"}
                                className="w-36 h-36 rounded-full object-cover border"
                            />
                            <div className="flex-1 flex flex-col md:flex-row gap-8 w-full">
                                <div className="flex-1 mb-4 md:mb-0">
                                    <div className="text-gray-600 mb-1"><b>Nombre:</b> {estudiante.nombre}</div>
                                    <div className="text-gray-600 mb-1"><b>Cédula:</b> {estudiante.cedula}</div>
                                    <div className="text-gray-600 mb-1"><b>Teléfono:</b> {estudiante.telefono_estudiantes}</div>
                                    <div className="text-gray-600"><b>Email:</b> {estudiante.correo_electronico}</div>
                                </div>
                                <div className="flex-1 mb-4 md:mb-0">
                                    <div className="text-gray-600 mb-1"><b>Instrumento Principal:</b> {estudiante.instrumentos? estudiante.instrumentos : "No registrado."}</div>
                                    <div className="text-gray-600 mb-1"><b>Teóricas:</b> {estudiante.teoricas? estudiante.teoricas : "No registrado."} </div>
                                    <div className="text-gray-600"><b>Otros:</b> {estudiante.otros? estudiante.otros : "No registrado."}</div>
                                </div>
                                <div className="flex-1">
                                    <div className="text-gray-600 mb-1"><b>Estatus Administrativo:</b> estatus</div>
                                    <div className="text-gray-600"><b>Estatus Académico:</b> {estudiante.activo === 1? "Activo" : "Inactivo"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Historial Académico: Renderizado condicional */}
                {loadingNotas ? (
                    <p className="text-lg text-gray-600">Cargando notas...</p>
                ) : errorNotas ? (
                    <p className="text-lg text-red-500">Error: {errorNotas}</p>
                ) : notasAgrupadas && Object.entries(notasAgrupadas).length > 0 ? (
                    Object.entries(notasAgrupadas).map(([materia, registros]) => (
                        <div key={materia} className="bg-white shadow rounded-lg p-6 w-full max-w-3xl mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Historial Académico: {materia}</h3>
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg mb-2 shadow-md hover:shadow-xl duration-500">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-700">
                                        <th className="px-4 py-2 border-b border-gray-300">Periodo</th>
                                        <th className="px-4 py-2 border-b border-gray-300">Profesor</th>
                                        <th className="px-4 py-2 border-b border-gray-300">Nivel Inicial</th>
                                        <th className="px-4 py-2 border-b border-gray-300">Nota Final</th>
                                        <th className="px-4 py-2 border-b border-gray-300">Siguiente Nivel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registros.map((nota, i) => (
                                        <tr key={i} className="hover:bg-gray-100">
                                            <td className="px-4 py-2 border-b border-gray-300 text-center">{nota.periodo}</td>
                                            <td className="px-4 py-2 border-b border-gray-300 text-center">{nota.profesor}</td>
                                            <td className="px-4 py-2 border-b border-gray-300 text-center">{nota.nivel_inicial}</td>
                                            <td className="px-4 py-2 border-b border-gray-300 text-center">{nota.nota_final}</td>
                                            <td className="px-4 py-2 border-b border-gray-300 text-center">{nota.siguiente_nivel}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    !loadingNotas && <p className="text-lg text-gray-600">No se encontraron notas para este estudiante.</p>
                )}
            </div>
            <Footer />
        </>
    );
}