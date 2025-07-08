'use client';
import { useEffect, useState } from 'react';
import Button from "@/components/ui/Button"
import Navbar from "@/components/Navbar"

export default function Login() {

  interface ListaEsperaItem {
    id: number;
    id_estudiante: number | null;
  }

  interface Estudiante {
    id: number;
    id_usuario: number | null;
    id_materias: number | null;
    nombre: string;
    fecha_nacimiento: string;
    sexo: string;
    ci: string;
    telefono: string;
    institucion_educacional: string;
    ocupacion: string;
    profesion: string;
    lugar_trabajo: string;
    direccion_residencial: string;
    email: string;
    alergico: string;
    antecedentes: string;
    antecedentes_especificados: string;
    emergencia_nombre: string;
    emergencia_telefono: string;
    reperesentante_nombre: string;
    reperesentante_ci: string;
    reperesentante_parentesco: string;
    reperesentante_telefono: string;
    reperesentante_ocupacion: string;
    reperesentante_profesion: string;
    reperesentante_lugar_trabajo: string;
    reperesentante_direccion: string;
    reperesentante_email: string;
    instrumentos: string;
    teorica: string;
    otros: string;
  }

  const [lista, setLista] = useState<ListaEsperaItem[]>([]);
  const [Estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  const fetchLista = async () => {
    try {
      const res = await fetch('/api/lista_espera');
      const data = await res.json();

      if (!res.ok) {
        console.log(`Ha ocurrido un error: ${data.message}`);
        return;
      }

      setLista(data.data);
    } catch (err) {
      console.error('Error al obtener lista_espera:', err);
    }
  };

  useEffect(() => {
    fetchLista();
  }, []);

  const fetchEstudiantesPorLista = async () => {
    if (lista.length === 0) {
      console.log("La lista está vacía.");
      return;
    }
    if (lista.length === 1) {
      try {
        const res = await fetch(`/api/estudiante?id=${lista[0].id_estudiante}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(`Error al obtener estudiante único: ${data.message}`);
        } else {
          setEstudiantes(data.data);
        }
      } catch (err) {
        console.error("Error al obtener estudiante único:", err);
      }
    } else {
      const params = lista.map((e) => `id=${e.id_estudiante}`).join('&');
      try {
        const res = await fetch(`/api/estudiante?${params}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(`Error al obtener estudiantes: ${data.message}`);
        } else {
          setEstudiantes(data.data);
        }
      } catch (err) {
        console.error("Error al obtener estudiantes:", err);
      }
    }
  };

  useEffect(() => {
    fetchEstudiantesPorLista();
  }, [lista]);

  
  const calcularEdad = (fecha: string) => {
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleGenerarPDF = async (indice: number): Promise<void> => {
    try {
      const estudiante = Estudiantes[indice];
      const res = await fetch("/api/pdf_registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreEstudiante: estudiante.nombre || "",
          fechaNacimiento: estudiante.fecha_nacimiento || "",
          edad: calcularEdad(estudiante.fecha_nacimiento) || "",
          sexo: estudiante.sexo || "",
          cedula: estudiante.ci || "",
          telefono: estudiante.telefono || "",
          institucion: estudiante.institucion_educacional || "",
          ocupacion: estudiante.ocupacion || "",
          profesion: estudiante.profesion || "",
          lugarTrabajo: estudiante.lugar_trabajo || "",
          direccion: estudiante.direccion_residencial || "",
          email: estudiante.email || "",
          alergias: estudiante.alergico || "",
          antecedentes: estudiante.antecedentes || "",
          alergiasEspecificadas:estudiante.antecedentes_especificados || "",
          contactoEmergencia:estudiante.emergencia_nombre || "",
          numeroEmergencia:estudiante.emergencia_telefono || "",

          representanteNombre: estudiante.reperesentante_nombre || "",
          representanteCI: estudiante.reperesentante_ci || "",
          parentesco: estudiante.reperesentante_parentesco || "",
          representanteTelefono: estudiante.reperesentante_telefono || "",
          representanteOcupacion: estudiante.reperesentante_ocupacion || "",
          representanteProfesion: estudiante.reperesentante_profesion || "",
          representanteLugarTrabajo: estudiante.reperesentante_lugar_trabajo || "",
          representanteDireccion: estudiante.reperesentante_direccion || "",
          representanteEmail: estudiante.reperesentante_email || "",

          instrumentosData: estudiante.instrumentos || "",
          teoricasData: estudiante.teorica || "",
          otrosData: estudiante.otros || "",
          autorizacion: "Si",
          firmaCedula: "Prueba de firma y cédula",
        }),
      })

      if (!res.ok) throw new Error("Error generando PDF")

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      window.open(url, "_blank")

      const link = document.createElement("a")
      link.href = url
      link.download = `planilla-${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error al generar PDF:", error)
    }
  }

  const crearUsuario = async (indice: number): Promise<void> => {
    try {
      const estudiante = Estudiantes[indice];

      // crea un usuario
      const res = await fetch("/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: estudiante.email,
          contraseña: estudiante.ci || "123456789",
          rol: "estudiante",
          id_datos: estudiante.id || "",
        }),
      })
      const resultado = await res.json();
      if (!res.ok) {
        console.log(`Ha ocurrido un error: ${resultado.message}`);
        return;
      }
      const id_usuario = resultado.id;

      // actualiza el campo id_usuario en la tabla estudiante
      const resEstudiante = await fetch('/api/estudiante', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: estudiante.id,
          id_usuario: id_usuario
        }),
      });
      const resultadoEstudiante = await resEstudiante.json();
      if (!resEstudiante.ok) {
        console.log(`Ha ocurrido un error: ${resultadoEstudiante.message}`);
        return;
      }

      // actualiza la lista de espera
      const resLista = await fetch('/api/lista_espera', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_estudiante: estudiante.id,
          estado: 0
        }),
      });
      const resultadoLista = await resLista.json();
      if (!resEstudiante.ok) {
        console.log(`Ha ocurrido un error: ${resultadoLista.message}`);
        return;
      }
      await fetchEstudiantesPorLista()
      await fetchLista()
      alert("Usuario creado exitosamente.")

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center px-40">
        <div className="text-center mb-5">
        <h1><span className="font-bold text-3xl text-gray-700">Lista de Espera</span></h1>
        <h3><span className="font-bold text-xl text-gray-600">Programa de Formación Musical<br></br>"Maestro José Calabrese"</span></h3>
        </div>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead>
        <tr>
          <th className="px-4 py-2 bg-gray-100">ID</th>
          <th className="px-4 py-2 bg-gray-200">Nombre</th>
          <th className="px-4 py-2 bg-gray-100">Edad</th>
          <th className="px-4 py-2 bg-gray-200">Instrumento</th>
          <th className="px-4 py-2 bg-gray-100">Teórica</th>
          <th className="px-4 py-2 bg-gray-200">Otros</th>
          <th className="px-4 py-2 bg-gray-100">Acciones</th>
        </tr>
          </thead>
          <tbody>
          {Estudiantes.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-2 text-center text-gray-500">
                No hay estudiantes cargados.
              </td>
            </tr>
          ) : (
            Estudiantes.map((estudiante: any, indice) => (
              <tr key={estudiante.id}>
                <td className="px-4 py-2 border-b text-center font-bold">{estudiante.id}</td>
                <td className="px-4 py-2 border-b text-center font-bold">{estudiante.nombre}</td>
                <td className="px-4 py-2 border-b text-center font-bold">
                  {estudiante.fecha_nacimiento ? calcularEdad(estudiante.fecha_nacimiento) : '—'}
                </td>
                <td className="px-4 py-2 border-b text-center font-bold">{estudiante.instrumentos || '—'}</td>
                <td className="px-4 py-2 border-b text-center font-bold">{estudiante.teorica || '—'}</td>
                <td className="px-4 py-2 border-b text-center font-bold">{estudiante.otros || '—'}</td>
                <td className="px-4 py-2 border-b text-center">
                  <Button className="bg-gray-500 text-white rounded-xl hover:bg-gray-700 text-xs px-2 py-1 mr-2"
                          onClick={() => handleGenerarPDF(indice)}
                  >
                    Planilla
                  </Button>
                  <Button className="bg-green-500 text-white rounded-xl hover:bg-green-600 text-xs px-2 py-1"
                          onClick={() => crearUsuario(indice)}>
                    Aceptar
                  </Button>
                  <Button className="bg-red-600 text-white rounded-xl hover:bg-red-800 text-xs px-2 py-1 ml-2">
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        </table>
      </div>
    </>
  )
}