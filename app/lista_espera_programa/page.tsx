'use client';
import { useEffect, useState } from 'react';
import Button from "@/components/ui/Button"
import Navbar from "@/components/Navbar"

export default function ListaEspera() {
  interface EstudianteListaEspera {
    id: number;
    nombre: string;
    fecha_nacimiento: string;
    cedula: string;
    genero: string;
    instrumento: string;
    telefono: string;
    email: string;
    direccion: string;
    nombre_emergencia: string;
    numero_emergencia: string;
    nombre_representante: string;
    cedula_representante: string;
    parentesco: string;
    telefono_representante: string;
    ocupacion_representante: string;
    estado: number;
    teorica?: string;
    otros?: string;
  }

  const [estudiantes, setEstudiantes] = useState<EstudianteListaEspera[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [selectedEstudiante, setSelectedEstudiante] = useState<number>(0);

  const fetchListaEspera = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3200/api/lista_espera');
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cargar la lista de espera');
      }
      
      const data = await response.json();
      setEstudiantes(data.data);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar la lista de espera');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListaEspera();
  }, []);

  const calcularEdad = (fecha: string) => {
    if (!fecha) return 0;
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleGenerarPDF = async (estudiante: EstudianteListaEspera): Promise<void> => {
    try {
      const res = await fetch("/api/pdf_registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreEstudiante: estudiante.nombre || "",
          fechaNacimiento: estudiante.fecha_nacimiento || "",
          edad: calcularEdad(estudiante.fecha_nacimiento) || "",
          sexo: estudiante.genero || "",
          cedula: estudiante.cedula || "",
          telefono: estudiante.telefono || "",
          direccion: estudiante.direccion || "",
          email: estudiante.email || "",
          contactoEmergencia: estudiante.nombre_emergencia || "",
          numeroEmergencia: estudiante.numero_emergencia || "",
          representanteNombre: estudiante.nombre_representante || "",
          representanteCI: estudiante.cedula_representante || "",
          parentesco: estudiante.parentesco || "",
          representanteTelefono: estudiante.telefono_representante || "",
          representanteOcupacion: estudiante.ocupacion_representante || "",
          instrumentosData: estudiante.instrumento || "",
          autorizacion: "Si",
          firmaCedula: "Prueba de firma y cédula",
        }),
      });

      if (!res.ok) throw new Error("Error generando PDF");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");

      const link = document.createElement("a");
      link.href = url;
      link.download = `planilla-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("Error al generar el PDF");
    }
  };

  const handleAceptarEstudiante = async (idEstudiante: number) => {
    try {
      // Aquí iría la lógica para aceptar al estudiante
      // Por ejemplo, crear usuario y actualizar estado
      const res = await fetch('/api/lista_espera', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_estudiante: idEstudiante,
          estado: 0 // Cambiar estado a inactivo
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      // Actualizar la lista
      await fetchListaEspera();
      alert("Estudiante aceptado exitosamente");
    } catch (err) {
      console.error(err);
      alert("Error al aceptar estudiante");
    }
  };

  const handleRechazarEstudiante = async (idEstudiante: number) => {
    try {
      // Aquí iría la lógica para rechazar al estudiante
      const res = await fetch('http://localhost:3200/api/lista_espera', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_estudiante: idEstudiante
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      // Actualizar la lista
      await fetchListaEspera();
      alert("Estudiante rechazado exitosamente");
    } catch (err) {
      console.error(err);
      alert("Error al rechazar estudiante");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center px-40">
        <div className="text-center mb-5">
          <h1><span className="font-bold text-3xl text-gray-700">Lista de Espera</span></h1>
          <h3><span className="font-bold text-xl text-gray-600">Programa de Formación Musical<br />"Maestro José Calabrese"</span></h3>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <p>Cargando estudiantes...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <button 
              onClick={fetchListaEspera}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-100">ID</th>
                <th className="px-4 py-2 bg-gray-200">Nombre</th>
                <th className="px-4 py-2 bg-gray-100">Edad</th>
                <th className="px-4 py-2 bg-gray-200">Cédula</th>
                <th className="px-4 py-2 bg-gray-100">Instrumento</th>
                <th className="px-4 py-2 bg-gray-200">Teórica</th>
                <th className="px-4 py-2 bg-gray-100">Otros</th>
                <th className="px-4 py-2 bg-gray-200">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-2 text-center text-gray-500">
                    No hay estudiantes en lista de espera
                  </td>
                </tr>
              ) : (
                estudiantes.map((estudiante) => (
                  <tr key={estudiante.id}>
                    <td className="px-4 py-2 border-b text-center">{estudiante.id}</td>
                    <td className="px-4 py-2 border-b text-center">{estudiante.nombre}</td>
                    <td className="px-4 py-2 border-b text-center">
                      {calcularEdad(estudiante.fecha_nacimiento)}
                    </td>
                    <td className="px-4 py-2 border-b text-center">{estudiante.cedula || '—'}</td>
                    <td className="px-4 py-2 border-b text-center">{estudiante.instrumento || '—'}</td>
                    <td className="px-4 py-2 border-b text-center">{estudiante.teorica || '—'}</td>
                    <td className="px-4 py-2 border-b text-center">{estudiante.otros || '—'}</td>
                    <td className="px-4 py-2 border-b text-center flex justify-center space-x-2">
                      <Button 
                        className="px-2 py-1 mr-2 rounded-full hover:bg-gray-100"
                        onClick={() => handleGenerarPDF(estudiante)}
                      >
                        <img
                          src="/edit.svg"
                          alt="Generar PDF"
                          className="h-7 w-7"
                        />
                      </Button>
                      <Button 
                        className="px-2 py-1 rounded-full hover:bg-green-100"
                        onClick={() => {
                          setSelectedEstudiante(estudiante.id);
                          setShowModalConfirm(true);
                        }}
                      >
                        <img
                          src="/check.svg"
                          alt="Aceptar estudiante"
                          className="h-7 w-7"
                        />
                      </Button>
                      <Button 
                        className="px-2 py-1 ml-2 rounded-full hover:bg-red-100"
                        onClick={() => {
                          setSelectedEstudiante(estudiante.id);
                          setShowModalDelete(true);
                        }}
                      >
                        <img
                          src="/delete.svg"
                          alt="Rechazar estudiante"
                          className="h-7 w-7"
                        />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de confirmación */}
      {showModalConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <p className="text-center mb-6">
              ¿Estás seguro de que deseas <span className="text-green-600">aceptar</span> a<br />
              <span className="font-bold text-lg">
                {estudiantes.find(e => e.id === selectedEstudiante)?.nombre}
              </span>?
            </p>
            <div className="flex justify-between mt-4">
              <Button
                className="w-[48%] bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => setShowModalConfirm(false)}
              >
                Volver
              </Button>
              <Button
                className="w-[48%] bg-green-600 text-white hover:bg-green-400 rounded"
                onClick={() => {
                  setShowModalConfirm(false);
                  handleAceptarEstudiante(selectedEstudiante);
                }}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para rechazar */}
      {showModalDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <p className="text-center mb-6">
              ¿Estás seguro de que deseas <span className="text-red-600">rechazar</span> a<br />
              <span className="font-bold text-lg">
                {estudiantes.find(e => e.id === selectedEstudiante)?.nombre}
              </span>?
            </p>
            <div className="flex justify-between mt-4">
              <Button
                className="w-[48%] bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => setShowModalDelete(false)}
              >
                Volver
              </Button>
              <Button
                className="w-[48%] bg-red-600 text-white hover:bg-red-700 rounded"
                onClick={() => {
                  setShowModalDelete(false);
                  handleRechazarEstudiante(selectedEstudiante);
                }}
              >
                Rechazar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}``