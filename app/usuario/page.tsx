"use client"
import { useState } from "react"
import Head from "next/head"
import Brand from "@/components/Brand"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

type Evaluacion = {
  evaluacion: string
  peso: number
  nota: number
}

type NotasPorMateria = Record<string, Evaluacion[]>

const estudiante = {
  foto: "/persona.jpg",
  nombre: "Nelson Guerrero",
  cedula: "32067861",
  telefono: "04124117850",
  email: "nelson.guerrero@email.com",
  instrumento: "Violín",
  teoricas: ["Historia", "Solfeo"],
  otros: ["Coro", "Armonía"],
  estatusAdministrativo: "Activo",
  estatusAcademico: "Regular",
}

const notas = {
  instrumento: [
    { evaluacion: "Parcial 1", peso: 30, nota: 18 },
    { evaluacion: "Parcial 2", peso: 30, nota: 17 },
    { evaluacion: "Recital", peso: 40, nota: 19 },
  ],
  teoricas: {
    Historia: [
      { evaluacion: "Examen 1", peso: 50, nota: 16 },
      { evaluacion: "Examen 2", peso: 50, nota: 18 },
    ],
    Solfeo: [
      { evaluacion: "Prueba 1", peso: 60, nota: 17 },
      { evaluacion: "Prueba 2", peso: 40, nota: 15 },
    ],
  } as NotasPorMateria,
  otros: {
    Coro: [{ evaluacion: "Participación", peso: 100, nota: 20 }],
    Armonía: [{ evaluacion: "Trabajo Final", peso: 100, nota: 18 }],
  } as NotasPorMateria,
}

function calcularTotal(materiaNotas: Evaluacion[]) {
  return materiaNotas.reduce(
    (acc, n) => acc + (n.peso / 100) * n.nota,
    0
  )
}

export default function Estudiante() {
  return (
    <>
      <Head>
        <title>Información del Estudiante</title>
      </Head>
      <Navbar />
      <div className="w-full flex flex-col items-center px-4 py-8">

        {/* Información Personal */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Información Personal</h2>
          <div className=" flex flex-col md:flex-row items-center gap-8 w-full max-w-5xl mb-8">
            <img
              src={estudiante.foto}
              alt={estudiante.nombre}
              className="w-36 h-36 rounded-full object-cover border"
            />
            <div className="flex-1 flex flex-col md:flex-row gap-8 w-full">
              {/* Columna 1 */}
              <div className="flex-1 mb-4 md:mb-0">
                <div className="text-gray-600 mb-1"><b>Nombre:</b> {estudiante.nombre}</div>
                <div className="text-gray-600 mb-1"><b>Cédula:</b> {estudiante.cedula}</div>
                <div className="text-gray-600 mb-1"><b>Teléfono:</b> {estudiante.telefono}</div>
                <div className="text-gray-600"><b>Email:</b> {estudiante.email}</div>
              </div>
              {/* Columna 2 */}
              <div className="flex-1 mb-4 md:mb-0">
                <div className="text-gray-600 mb-1"><b>Instrumento Principal:</b> {estudiante.instrumento}</div>
                <div className="text-gray-600 mb-1"><b>Teóricas:</b> {estudiante.teoricas.join(", ")}</div>
                <div className="text-gray-600"><b>Otros:</b> {estudiante.otros.join(", ")}</div>
              </div>
              {/* Columna 3 */}
              <div className="flex-1">
                <div className="text-gray-600 mb-1"><b>Estatus Administrativo:</b> {estudiante.estatusAdministrativo}</div>
                <div className="text-gray-600"><b>Estatus Académico:</b> {estudiante.estatusAcademico}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-3xl mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Instrumento Principal: {estudiante.instrumento}</h3>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg mb-2">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border-b">Evaluación</th>
                <th className="px-4 py-2 border-b">Peso (%)</th>
                <th className="px-4 py-2 border-b">Nota</th>
                <th className="px-4 py-2 border-b">Total Acumulado</th>
              </tr>
            </thead>
            <tbody>
              {notas.instrumento.map((n, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 border-b text-center">{n.evaluacion}</td>
                  <td className="px-4 py-2 border-b text-center">{n.peso}</td>
                  <td className="px-4 py-2 border-b text-center">{n.nota}</td>
                  <td className="px-4 py-2 border-b text-center">{((n.peso / 100) * n.nota).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="px-4 py-2 font-bold text-right border-b">Total Acumulado</td>
                <td className="px-4 py-2 font-bold border-b">{calcularTotal(notas.instrumento).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notas de Teóricas */}
        {estudiante.teoricas.map((materia) => (
          <div key={materia} className="bg-white shadow rounded-lg p-6 w-full max-w-3xl mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Teórica: {materia}</h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg mb-2">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2 border-b">Evaluación</th>
                  <th className="px-4 py-2 border-b">Peso (%)</th>
                  <th className="px-4 py-2 border-b">Nota</th>
                  <th className="px-4 py-2 border-b">Total Acumulado</th>
                </tr>
              </thead>
              <tbody>
                {notas.teoricas[materia].map((n, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 border-b text-center">{n.evaluacion}</td>
                    <td className="px-4 py-2 border-b text-center">{n.peso}</td>
                    <td className="px-4 py-2 border-b text-center">{n.nota}</td>
                    <td className="px-4 py-2 border-b text-center">{((n.peso / 100) * n.nota).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="px-4 py-2 font-bold text-right border-b">Total Acumulado</td>
                  <td className="px-4 py-2 font-bold border-b">{calcularTotal(notas.teoricas[materia]).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}

        {/* Notas de Otros */}
        {estudiante.otros.map((materia) => (
          <div key={materia} className="bg-white shadow rounded-lg p-6 w-full max-w-3xl mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Otro: {materia}</h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg mb-2">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2 border-b">Evaluación</th>
                  <th className="px-4 py-2 border-b">Peso (%)</th>
                  <th className="px-4 py-2 border-b">Nota</th>
                  <th className="px-4 py-2 border-b">Total Acumulado</th>
                </tr>
              </thead>
              <tbody>
                {notas.otros[materia].map((n, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 border-b text-center">{n.evaluacion}</td>
                    <td className="px-4 py-2 border-b text-center">{n.peso}</td>
                    <td className="px-4 py-2 border-b text-center">{n.nota}</td>
                    <td className="px-4 py-2 border-b text-center">{((n.peso / 100) * n.nota).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} className="px-4 py-2 font-bold text-right border-b">Total Acumulado</td>
                  <td className="px-4 py-2 font-bold border-b">{calcularTotal(notas.otros[materia]).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}