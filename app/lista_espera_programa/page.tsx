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
    nombre: string;
    sexo: string;
    ci: string;
    fecha_nacimiento: string;
    email: string;
    direccion_residencial: string;
    fehca_ingreso: string;
    instrumentos: string;
    codigo_instrumento: string;
    reperesentante_nombre: string;
    reperesentante_ocupacion: string;
    reperesentante_parentesco: string;
    reperesentante_ci: string;
    telefono: string;
    reperesentante_telefono: string;
    emergencia_nombre: string;
    emergencia_telefono: string;

/*
    institucion_educacional: string;
    ocupacion: string;
    profesion: string;
    lugar_trabajo: string;
    alergico: string;
    antecedentes: string;
    antecedentes_especificados: string;
    reperesentante_profesion: string;
    reperesentante_lugar_trabajo: string;
    reperesentante_direccion: string;
    reperesentante_email: string;
    teorica: string;
    otros: string;
    */
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
          /*
          institucion: estudiante.institucion_educacional || "",
          ocupacion: estudiante.ocupacion || "",
          profesion: estudiante.profesion || "",
          lugarTrabajo: estudiante.lugar_trabajo || "",
          */
          direccion: estudiante.direccion_residencial || "",
          email: estudiante.email || "",
          /*
          alergias: estudiante.alergico || "",
          antecedentes: estudiante.antecedentes || "",
          alergiasEspecificadas:estudiante.antecedentes_especificados || "",
          */
          contactoEmergencia:estudiante.emergencia_nombre || "",
          numeroEmergencia:estudiante.emergencia_telefono || "",

          representanteNombre: estudiante.reperesentante_nombre || "",
          representanteCI: estudiante.reperesentante_ci || "",
          parentesco: estudiante.reperesentante_parentesco || "",
          representanteTelefono: estudiante.reperesentante_telefono || "",
          representanteOcupacion: estudiante.reperesentante_ocupacion || "",
          /*
          representanteProfesion: estudiante.reperesentante_profesion || "",
          representanteLugarTrabajo: estudiante.reperesentante_lugar_trabajo || "",
          representanteDireccion: estudiante.reperesentante_direccion || "",
          representanteEmail: estudiante.reperesentante_email || "",
          */

          instrumentosData: estudiante.instrumentos || "",
          /*
          teoricasData: estudiante.teorica || "",
          otrosData: estudiante.otros || "",
          */
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
          id_estudiante: estudiante.id,
          password: estudiante.ci || "123456789",
        }),
      })
      const resultado = await res.json();
      if (!res.ok) {
        console.log(`Ha ocurrido un error: ${resultado.message}`);
        return;
      }
      const id_usuario = resultado.id;

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
      if (!resLista.ok) {
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

  const eliminarUsuario = async (indice: number): Promise<void> => {
    try {
      const estudiante = Estudiantes[indice];
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
      if (!resLista.ok) {
        console.log(`Ha ocurrido un error: ${resultadoLista.message}`);
        return;
      }
      await fetchEstudiantesPorLista()
      await fetchLista()
      alert("Usuario eliminado exitosamente.")

    } catch (err) {
      console.error(err);
    }
  }

  const [showModalConfirm, setShowModalConfir] = useState<boolean>(false);
  const [showModalDelete, setshowModalDelete] = useState<boolean>(false);
  const [aux, setAux] = useState<number>(0)

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
          <th className="px-4 py-2 bg-gray-100">Cedula</th>
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
                <td className="px-4 py-2 border-b text-center font-bold">{estudiante.ci || '—'}</td>
                <td className="px-4 py-2 border-b text-center font-bold">{estudiante.instrumentos || '—'}</td>
                <td className="px-4 py-2 border-b text-center font-bold">{estudiante.teorica || '—'}</td>
                <td className="px-4 py-2 border-b text-center font-bold">{estudiante.otros || '—'}</td>
                <td className="px-4 py-2 border-b text-center">
                  <Button className="px-2 py-1 mr-2 rounded-full hover:bg-gray-100"
                          onClick={() => handleGenerarPDF(indice)}
                  >
                    <img
                      src="/edit.svg"
                      alt="Icono de check"
                      className="h-7 w-7"
                    />
                  </Button>
                  <Button className="px-2 py-1 rounded-full hover:bg-green-100"
                          onClick={() => {
                            setAux(indice);
                            setShowModalConfir(true)}}>
                    <img
                      src="/check.svg"
                      alt="Icono de check"
                      className="h-7 w-7"
                    />
                  </Button>
                  <Button className="px-2 py-1 ml-2 rounded-full hover:bg-red-100"
                          onClick={() => {
                            setAux(indice);
                            setshowModalDelete(true)}}>
                    <img
                      src="/delete.svg"
                      alt="Icono de check"
                      className="h-7 w-7"
                    />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
        </table>
      </div>
      {/* Modal de confirmación */}
      {showModalConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-30 backdrop-blur-sm ">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <p className="text-center mb-6">
              Estás seguro de que desea <span className="text-green-600">Aceptar</span> a<br></br><span className="font-bold text-lg">{Estudiantes[aux].nombre}.</span>
            </p>
            <div className="flex justify-between mt-4">
              <Button
                className="w-[48%] bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => {
                  setShowModalConfir(false);
                  crearUsuario(aux)
                }}
              >
                Volver
              </Button>
              <Button
                className="w-[48%] bg-green-600 text-white hover:bg-green-400 rounded"
                onClick={() => {
                setShowModalConfir(false);
                eliminarUsuario(aux)
                }}
              >
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Modal para Denegar */}
      {showModalDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-30 backdrop-blur-sm ">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <p className="text-center mb-6">
              Estás seguro de que desea <span className="text-red-600">Rechazar</span> a<br></br><span className="font-bold text-lg">{Estudiantes[aux].nombre}</span>.
            </p>
            <div className="flex justify-between mt-4">
              <Button
                className="w-[48%] bg-gray-200 hover:bg-gray-300 rounded"
                onClick={() => setshowModalDelete(false)}
              >
                Volver
              </Button>
              <Button
                className="w-[48%] bg-red-600 text-white hover:bg-red-700 rounded"
                onClick={() => {
                setshowModalDelete(false);
                eliminarUsuario(aux)
                }}
              >
                Rechazar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}