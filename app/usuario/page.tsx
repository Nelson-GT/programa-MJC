"use client"
import Head from "next/head"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

const estudiante = {
  foto: "/musico.jpg",
  nombre: "Pedro Perez",
  cedula: "12345678",
  telefono: "04129999999",
  email: "pperez@email.com",
  instrumento: "Violín",
  teoricas: ["Historia", "Solfeo"],
  otros: ["Coro", "Armonía"],
  estatusAdministrativo: "Activo",
  estatusAcademico: "Regular",
}

type Nota = {
  periodo: string;
  nivel_inicial: string;
  nota_final: number;
  estatus: string;
  materia: string;
};

const notas_prueba: Nota[] = [
  { periodo: "2024-1", nivel_inicial: "A1", nota_final: 18.5, estatus: "Promovido", materia: "Violín" },
  { periodo: "2024-2", nivel_inicial: "A2", nota_final: 17.2, estatus: "Continua", materia: "Violín" },
  { periodo: "2024-3", nivel_inicial: "A2", nota_final: 15.8, estatus: "Promovido", materia: "Violín" },
  { periodo: "2025-1", nivel_inicial: "B1", nota_final: 16.9, estatus: "Promovido", materia: "Violín" },
  { periodo: "2024-2", nivel_inicial: "Primer año", nota_final: 12.3, estatus: "Promovido", materia: "Solfeo" },
  { periodo: "2024-3", nivel_inicial: "Segundo año", nota_final: 13.8, estatus: "Promovido", materia: "Solfeo" },
  { periodo: "2025-1", nivel_inicial: "Tercer año", nota_final: 15.0, estatus: "Promovido", materia: "Solfeo" },
  { periodo: "2024-3", nivel_inicial: "A1", nota_final: 10.5, estatus: "Continua", materia: "Coro" },
  { periodo: "2025-1", nivel_inicial: "A1", nota_final: 11.7, estatus: "Continua", materia: "Coro" },
];

function agruparPorMateria(notas: Nota[]): Record<string, Nota[]> {
  return notas.reduce((acc, nota) => {
    acc[nota.materia] = acc[nota.materia] || [];
    acc[nota.materia].push(nota);
    return acc;
  }, {} as Record<string, Nota[]>);
}

const notasPorMateria = agruparPorMateria(notas_prueba);

export default function Estudiante() {
  return (
    <>
      <Head>
        <title>Información del Estudiante</title>
      </Head>
      <Navbar />
      <div className="w-full flex flex-col items-center px-4 py-8">

        {/* Información Personal */}
        <div className="bg-white rounded-xl p-12 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Información Personal</h2>
          <div className=" flex flex-col md:flex-row items-center gap-8 w-full max-w-5xl mb-8">
            <img
              src={estudiante.foto}
              alt={estudiante.nombre}
              className="w-36 h-36 rounded-full object-cover border"
            />
            <div className="flex-1 flex flex-col md:flex-row gap-8 w-full">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="text-gray-600 mb-1"><b>Nombre:</b> {estudiante.nombre}</div>
                <div className="text-gray-600 mb-1"><b>Cédula:</b> {estudiante.cedula}</div>
                <div className="text-gray-600 mb-1"><b>Teléfono:</b> {estudiante.telefono}</div>
                <div className="text-gray-600"><b>Email:</b> {estudiante.email}</div>
              </div>
              <div className="flex-1 mb-4 md:mb-0">
                <div className="text-gray-600 mb-1"><b>Instrumento Principal:</b> {estudiante.instrumento}</div>
                <div className="text-gray-600 mb-1"><b>Teóricas:</b> {estudiante.teoricas.join(", ")}</div>
                <div className="text-gray-600"><b>Otros:</b> {estudiante.otros.join(", ")}</div>
              </div>
              <div className="flex-1">
                <div className="text-gray-600 mb-1"><b>Estatus Administrativo:</b> {estudiante.estatusAdministrativo}</div>
                <div className="text-gray-600"><b>Estatus Académico:</b> {estudiante.estatusAcademico}</div>
              </div>
            </div>
          </div>
        </div>

        {Object.entries(notasPorMateria).map(([materia, registros]) => ( /* Divide por materia*/
          <div key={materia} className="bg-white shadow rounded-lg p-6 w-full max-w-3xl mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Historial Académico: {materia}</h3>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg mb-2">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2 border-b">Periodo</th>
                  <th className="px-4 py-2 border-b">Nivel</th>
                  <th className="px-4 py-2 border-b">Nota Final</th>
                  <th className="px-4 py-2 border-b">Estatus</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((nota, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 border-b text-center">{nota.periodo}</td>
                    <td className="px-4 py-2 border-b text-center">{nota.nivel_inicial}</td>
                    <td className="px-4 py-2 border-b text-center">{nota.nota_final}</td>
                    <td className="px-4 py-2 border-b text-center">{nota.estatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}