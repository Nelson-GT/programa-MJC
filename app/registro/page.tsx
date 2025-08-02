"use client";
import Head from "next/head";
import React, { useState } from 'react';
import Brand from "@/components/Brand";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Navbar from "@/components/Navbar";
import Select from "@/components/ui/Select";

export default function index() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [nombreEstudiante, setnombreEstudiante] = useState<string | null>(null);
  const [fechaNacimiento, setfechaNacimiento] = useState<string | null>(null);
  const [edad, setedad] = useState<string | null>(null);
  const [genero, setgenero] = useState<string | null>(null); 
  const [cedula, setcedula] = useState<string | null>(null);
  const [rif, setRif] = useState<string | null>(null);
  const [telefonoEstudiante, settelefonoEstudiante] = useState<string>("0");
  const [CodigoTelefonoEstudiante, setCodigoTelefonoEstudiante] = useState<string>("0");
  const [institucion, setinstitucion] = useState<string | null>(null);
  const [ocupacion, setocupacion] = useState<string | null>(null);
  const [profesion, setprofesion] = useState<string | null>(null);
  const [lugarTrabajo, setlugarTrabajo] = useState<string | null>(null);
  const [direccion, setdireccion] = useState<string | null>(null);
  const [email, setemail] = useState<string | null>(null);
  const [alergias, setalergias] = useState<string | null>(null);
  const [antecedentes, setantecedentes] = useState<string | null>(null);
  const [alergiasEspecificadas, setalergiasEspecificadas] = useState<string | null>(null);
  const [contactoEmergencia, setcontactoEmergencia] = useState<string | null>(null);
  const [codigonumeroEmergencia, setCodigoNumeroEmergencia] = useState<string>("0");
  const [numeroEmergencia, setnumeroEmergencia] = useState<string>("0");
  const [representanteNombre, setrepresentanteNombre] = useState<string | null>(null);
  const [representanteCI, setrepresentanteCI] = useState<string | null>(null);
  const [representanteRIF, setrepresentanteRIF] = useState<string | null>(null);
  const [parentesco, setparentesco] = useState<string | null>(null);
  const [representanteCodigoTelefono, setrepresentanteCodigoTelefono] = useState<string>("0");
  const [representanteTelefono, setrepresentanteTelefono] = useState<string | null>(null);
  const [representanteOcupacion, setrepresentanteOcupacion] = useState<string | null>(null);
  const [representanteProfesion, setrepresentanteProfesion] = useState<string | null>(null);
  const [representanteLugarTrabajo, setrepresentanteLugarTrabajo] = useState<string | null>(null);
  const [representanteDireccion, setrepresentanteDireccion] = useState<string | null>(null);
  const [representanteEmail, setrepresentanteEmail] = useState<string | null>(null);
  const [autorizacion, setautorizacion] = useState<string | null>(null);

  // Para los campos de los instrumentos
  const [instrumentosData, setInstrumentosData] = useState<string | null>(null)
  const [teoricasData, setTeoricasData] = useState<string | null>(null)
  const [otrosData, setOtrosData] = useState<string | null>(null)
  const [instrumentos, setInstrumentos] = useState([{ id: 1, value: "" }])
  const [teoricas, setTeoricas] = useState([{ id: 1, value: "" }])
  const [otros, setOtros] = useState([{ id: 1, value: "" }])

  const [esMenor, setEsMenor] = useState<boolean>(true);

  const handleInstrumentoChange = (id: number, newValue: string) => {
    const actualizados = instrumentos.map(item =>
      item.id === id ? { ...item, value: newValue } : item
    )
    setInstrumentos(actualizados)
    const valores = actualizados.map(item => item.value).filter(v => v.trim() !== "")
    setInstrumentosData(valores.join(";"))
  }

  const handleTeoricaChange = (id: number, newValue: string) => {
    const actualizados = teoricas.map(item =>
      item.id === id ? { ...item, value: newValue } : item
    )
    setTeoricas(actualizados)
    const valores = actualizados.map(item => item.value).filter(v => v.trim() !== "")
    setTeoricasData(valores.join(";"))
  }
  

  const handleOtroChange = (id: number, newValue: string) => {
    const actualizados = otros.map(item =>
      item.id === id ? { ...item, value: newValue } : item
    )
    setOtros(actualizados)
    const valores = actualizados.map(item => item.value).filter(v => v.trim() !== "")
    setOtrosData(valores.join(";"))
  }

  const [photo64, setphoto64] = useState<String | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      const reader = new FileReader();
      reader.onloadend = () => {
        setphoto64(reader.result as string); // Aquí tienes la cadena Base64
      };
      reader.readAsDataURL(file); // Convierte a Base64
    }
  }


  const handleGenerarPDF = async (): Promise<void> => {
    try {
      const res = await fetch("/api/pdf_registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photoUrl: photo64 || "",
          nombreEstudiante: nombreEstudiante || " ",
          fechaNacimiento: fechaNacimiento || " ",
          edad: edad || " ",
          sexo: genero || " ",
          cedula: cedula || " ",
          rif: rif || " ",
          telefono: (CodigoTelefonoEstudiante + telefonoEstudiante) || " ",
          institucion: institucion || " ",
          ocupacion: ocupacion || " ",
          profesion: profesion || " ",
          lugarTrabajo: lugarTrabajo || " ",
          email: email || " ",
          direccion: direccion || " ",
          alergias: alergias || " ",
          antecedentes: antecedentes || " ",
          alergiasEspecificadas:alergiasEspecificadas || " ",
          contactoEmergencia:contactoEmergencia || " ",
          numeroEmergencia: (codigonumeroEmergencia + numeroEmergencia) || " ",

          representanteNombre: representanteNombre || " ",
          representanteCI: representanteCI || " ",
          representanteRif: representanteRIF || " ",
          parentesco: parentesco || " ",
          representanteTelefono: (representanteCodigoTelefono + representanteTelefono) || " ",
          representanteOcupacion: representanteOcupacion || " ",
          representanteProfesion: representanteProfesion || " ",
          representanteLugarTrabajo:representanteLugarTrabajo || " ",
          representanteDireccion: representanteDireccion || " ",
          representanteEmail: representanteEmail || " ",

          instrumentosData: instrumentosData || " ",
          teoricasData: teoricasData || " ",
          otrosData: otrosData || " ",
          autorizacion:autorizacion || " ",
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

  const handleRegistrar = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:3200/api/estudiante/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombreEstudiante || "",
          genero: genero || "",
          cedula: cedula || "",
          fecha_nacimiento: fechaNacimiento || "",
          email: email || "",
          direccion_residencial: direccion || "",
          telefono: (CodigoTelefonoEstudiante + telefonoEstudiante) || "",
          emergencia_nombre:contactoEmergencia || "",
          numeroEmergencia: (codigonumeroEmergencia + numeroEmergencia) || "",
          reperesentante_nombre: representanteNombre || "",
          reperesentante_ci: representanteCI || "",
          reperesentante_parentesco: parentesco || "",
          representanteTelefono: (representanteCodigoTelefono + representanteTelefono) || "",
          reperesentante_profesion: representanteProfesion || "",
          instrumentos: instrumentosData || "",
        }),
      })

      const resultado = await res.json();
      alert("Registro exitoso")
      if (!res.ok) {
        console.log(`Ha ocurrido un Error: ${resultado.message}`)
        alert("Ha ocurrido un Error. Por favor, intentelo más tarde");
        return
      }
    } catch (err) {
      console.error(err);
      console.log('Error al conectar con el servidor');
    }
  }

  const [Completo, setCompleto] = useState<boolean | null>(null)
  const checkCompleto = () => {
    if (
      nombreEstudiante &&
      fechaNacimiento &&
      edad &&
      genero &&
      direccion &&
      email &&
      antecedentes &&
      contactoEmergencia &&
      numeroEmergencia &&
      autorizacion
    ) {
      setCompleto(true);
    } else {
      setCompleto(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      setShowModal(true);
      handleGenerarPDF();
    }
  };

  return (
    <div className="fondo">
      <Head>
        <meta name='robots' content='index' />
        <title>Planilla</title>
      </Head>
      <Navbar />
      <div className='w-full min-h-screen flex flex-col items-center justify-center px-4 py-8'>
        <div className='max-w-sm sm:max-w-xl w-full text-gray-600'>
          <div className='text-center'>
            <Brand className='mx-auto' />
            <div className='mt-5 space-y-2'>
              <h1 className='text-gray-800 text-2xl font-bold sm:text-3xl'>
                Programa de Formación Musical
                "Maestro José Calabrese"
              </h1>
              <h1 className='text-gray-800 text-2xl font-bold sm:text-2xl'>
                Fundación Orquesta Sinfónica de Carabobo
              </h1>
              <h1 className='text-gray-800 text-2xl font-bold sm:text-xl'>
                Planilla de Inscripción
              </h1>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
            {/* --------------------Estudiante-------------------- */}
            <h3 className='text-gray-800 text-2xl font-bold sm:text-xl'>Datos del Estudiante</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-40 bg-gray-200 border-2 border-gray-400 rounded-lg overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">Foto</div>
                  )}
                </div>
                <label className="mt-2 block text-center text-sm font-medium text-gray-700">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                  <span className="cursor-pointer text-blue-600 hover:underline">Subir foto</span>
                </label>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold mb-1">Foto</h4>
                <p className="text-sm text-gray-600">
                  La foto debe ser nítida, tipo carnet, fondo blanco, tamaño 3x4 cm. Formato JPG o PNG.
                </p>
              </div>
            </div>
            {/* Nombres y Apellidos */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Nombres y Apellidos *</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setnombreEstudiante(e.target.value)}
                />
              </div>
            </div>

            {/* Fecha de Nacimiento y Edad */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Fecha de Nacimiento *</label>
                <Input
                  id='fecha-nacimiento'
                  type='date'
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={e => {
                    const fechaAux = `${e.target.value.split("-")[2]}-${e.target.value.split("-")[1]}-${e.target.value.split("-")[0]}`
                    setfechaNacimiento(fechaAux);
                    const fecha = e.target.value;
                    const edadInput = document.getElementById('edad-estudiante') as HTMLInputElement | null;
                    if (fecha) {
                      const hoy = new Date();
                      const nacimiento = new Date(fecha);
                      let edad = hoy.getFullYear() - nacimiento.getFullYear();
                      const m = hoy.getMonth() - nacimiento.getMonth();
                      if (m < 0 || (m === 0 && hoy.getDate() < (nacimiento.getDate() + 1))) {
                        edad--;
                      }
                      if (edadInput) {
                        edadInput.value = edad >= 0 ? String(edad) : '';
                        setedad(String(edad));
                        if (edad < 18) {setEsMenor(true)} else {setEsMenor(false)};
                      }
                    } else {
                      if (edadInput) {
                        edadInput.value = '';
                        setedad(null);
                      }
                    }
                  }}
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Edad *</label>
                <Input
                  id='edad-estudiante'
                  type='text'
                  required
                  readOnly
                  className='w-full mt-3 focus:border-blue-600 bg-gray-100'
                  tabIndex={-1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setedad(e.target.value)}
                />
              </div>
            </div>

            {/* genero y C.I. */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Género *</label>
                <Select
                  required
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setgenero(e.target.value)}
                  className='w-full mt-3 border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg'
                >
                  <option value=''>Seleccione una opción</option>
                  <option value='masculino'>Masculino</option>
                  <option value='femenino'>Femenino</option>
                </Select>
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>C.I.</label>
                <Input
                  type='text'
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setcedula(e.target.value)}
                />
              </div>
            </div>

            {/* Teléfono Celular */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='w-[50%]'>
                <label className='font-medium'>Teléfono Celular</label>
                <div className="flex flex-row mt-3 justify-between items-center gap-2">
                  <div className="w-[50%]">
                    <Select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCodigoTelefonoEstudiante(e.target.value)}
                      className='w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg'
                    >
                      <option value="">seleccione</option>
                      <option value='0412'>0412</option>
                      <option value='0422'>0422</option>
                      <option value='0414'>0414</option>
                      <option value='0424'>0424</option>
                      <option value='0416'>0416</option>
                      <option value='0426'>0426</option>
                    </Select>
                  </div>

                  <div className="w-[50%]">
                    <Input
                      type='text'
                      maxLength={7}
                      minLength={7}
                      placeholder="1234567"
                      className='w-full focus:border-blue-600'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => settelefonoEstudiante(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='w-[50%]'>
                <label className='font-medium'>R.I.F.</label>
                <Input
                  type='text'
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRif(e.target.value)}
                />
              </div>
            </div>

            {/* Institución Educacional y Ocupación */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Institución Educacional</label>
                <Input
                  type='text'
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setinstitucion(e.target.value)}
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Ocupación</label>
                <Input
                  type='text'
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setocupacion(e.target.value)}
                />
              </div>
            </div>

            {/* Profesión y Lugar de Trabajo */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Profesión</label>
                <Input
                  type='text'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setprofesion(e.target.value)}
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Lugar de Trabajo</label>
                <Input
                  type='text'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setlugarTrabajo(e.target.value)}
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>

            {/* Dirección Residencial */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Dirección Residencial *</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setdireccion(e.target.value)}
                />
              </div>
            </div>

            {/* E-mail */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>E-mail *</label>
                <Input
                  type='email'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setemail(e.target.value)}
                />
              </div>
            </div>

            {/* Alérgico(a) a */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Alérgico(a) a *</label>
                <Input
                  required
                  value={"Nada"}
                  type='text'
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setalergias(e.target.value)}
                />
              </div>
            </div>

            {/* Antecedentes (médico, psicológico) */}
            <div>
              <label className='font-medium'>Antecedentes (médico, psicológico) *</label>
              <div className='flex items-center mt-3 space-x-6'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='antecedentes'
                    value='si'
                    required
                    className='form-radio text-blue-600'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setantecedentes(e.target.value)}
                  />
                  <span className='ml-2'>Sí</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='antecedentes'
                    value='no'
                    required
                    className='form-radio text-blue-600'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setantecedentes(e.target.value)}
                  />
                  <span className='ml-2'>No</span>
                </label>
              </div>
            </div>
            <div>
              <label className='font-medium'>Especifique (anexar informe correspondiente)</label>
              <Input
                type='text'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setalergiasEspecificadas(e.target.value)}
                className='w-full mt-3 focus:border-blue-600'
              />
            </div>

            <div className='flex flex-col sm:flex-row gap-3 w-full items-start'>
              <div className='w-[50%]'>
                <label className='font-medium'>En caso de emergencia avisar a *</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setcontactoEmergencia(e.target.value)}
                />
              </div>

              <div className='w-[60%]'>
                <label className='font-medium'>Teléfono *</label>
                <div className="flex flex-row mt-3 justify-between items-center gap-2">
                  <div className="w-[50%]">
                    <Select
                      required
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCodigoNumeroEmergencia(e.target.value)}
                      className='w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg'
                    >
                      <option value="">seleccione</option>
                      <option value='0412'>0412</option>
                      <option value='0422'>0422</option>
                      <option value='0414'>0414</option>
                      <option value='0424'>0424</option>
                      <option value='0416'>0416</option>
                      <option value='0426'>0426</option>
                    </Select>
                  </div>

                  <div className="w-[50%]">
                    <Input
                      type='text'
                      maxLength={7}
                      minLength={7}
                      required
                      placeholder="1234567"
                      className='w-full focus:border-blue-600'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setnumeroEmergencia(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            {/* --------------------Representante Legal-------------------- */}
            <h3 className='text-gray-800 text-3xl font-bold sm:text-xl'>Datos del Representante Legal {esMenor ? "*" : ""}</h3>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Nombres y Apellidos {esMenor ? "*" : ""}</label>
                <Input
                  type='text'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setrepresentanteNombre(e.target.value)}
                  className='w-full mt-3 focus:border-blue-600'
                  required =  {esMenor ? true : false}
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>C.I. {esMenor ? "*" : ""}</label>
                <Input
                  type='text'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setrepresentanteCI(e.target.value)}
                  className='w-full mt-3 focus:border-blue-600'
                  required =  {esMenor ? true : false}
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Parentesco {esMenor ? "*" : ""}</label>
                <Input
                  type='text'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setparentesco(e.target.value)}
                  className='w-full mt-3 focus:border-blue-600'
                  required = {esMenor ? true : false}
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 w-full items-start'>
              <div className='w-[50%]'>
                <label className='font-medium'>Teléfono Celular {esMenor ? "*" : ""}</label>
                <div className="flex flex-row mt-3 justify-between items-center gap-2">
                  <div className="w-[50%]">
                    <Select
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setrepresentanteCodigoTelefono(e.target.value)}
                      className='w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg'
                      required =  {esMenor ? true : false}
                    >
                      <option value="">seleccione</option>
                      <option value='0412'>0412</option>
                      <option value='0422'>0422</option>
                      <option value='0414'>0414</option>
                      <option value='0424'>0424</option>
                      <option value='0416'>0416</option>
                      <option value='0426'>0426</option>
                    </Select>
                  </div>

                  <div className="w-[50%]">
                    <Input
                      type='text'
                      maxLength={7}
                      minLength={7}
                      placeholder="1234567"
                      className='w-full focus:border-blue-600'
                      required =  {esMenor ? true : false}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setrepresentanteTelefono(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className='w-[50%]'>
                <label className='font-medium'>Ocupacion {esMenor ? "*" : ""}</label>
                <Input
                  type='text'
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setrepresentanteOcupacion(e.target.value)}
                  required =  {esMenor ? true : false}
                />
              </div>

            </div>

            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Profesión {esMenor ? "*" : ""}</label>
                <Input
                  type='text'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setrepresentanteProfesion(e.target.value)}
                  className='w-full mt-3 focus:border-blue-600'
                  required =  {esMenor ? true : false}
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Lugar de Trabajo {esMenor ? "*" : ""}</label>
                <Input
                  type='text'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setrepresentanteLugarTrabajo(e.target.value)}
                  className='w-full mt-3 focus:border-blue-600'
                  required =  {esMenor ? true : false}
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Dirección Residencial {esMenor ? "*" : ""}</label>
                <Input
                  type='text'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setrepresentanteDireccion(e.target.value)}
                  className='w-full mt-3 focus:border-blue-600'
                  required =  {esMenor ? true : false}
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>R.I.F. {esMenor ? "*" : ""}</label>
                <Input
                  type='text'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setrepresentanteRIF(e.target.value)}
                  className='w-full mt-3 focus:border-blue-600'
                  required =  {esMenor ? true : false}
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>E-mail {esMenor ? "*" : ""}</label>
                <Input
                  type='email'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setrepresentanteEmail(e.target.value)}
                  className='w-full mt-3 focus:border-blue-600'
                  required =  {esMenor ? true : false}
                />
              </div>
            </div>
            

            <br></br>
            {/* --------------------cátedras a inscribir-------------------- */}
            <h3 className='text-gray-800 text-3xl font-bold sm:text-xl'>Cátedras a Inscribir</h3>

            {/* Instrumentos dinámicos */}
            {(() => {
              // React state hooks para los campos dinámicos
              const [instrumentos, setInstrumentos] = React.useState([{ id: 1 }]);
              const [teoricas, setTeoricas] = React.useState([{ id: 1 }]);
              const [otros, setOtros] = React.useState([{ id: 1 }]);

              // Funciones para añadir y eliminar campos
              const handleAdd = (
                setType: React.Dispatch<React.SetStateAction<{ id: number }[]>>,
                arr: { id: number }[]
              ) => {
                if (arr.length >= 3) {
                  if (!window.confirm(`Ya tienes ${arr.length} campos. ¿Estás seguro de añadir uno más?`)) return;
                }
                setType([...arr, { id: Date.now() + Math.random() }]);
              };
              const handleRemove = (
                type: { id: number }[],
                setType: React.Dispatch<React.SetStateAction<{ id: number }[]>>,
                id: number
              ) => {
                setType(type.filter((item: { id: number }) => item.id !== id));
              };

              // Renderizado de campos dinámicos
              return (
                <>
                  {/* Instrumentos */}
                  {instrumentos.map((item, idx) => (
                    <div className='flex flex-col sm:flex-row gap-4 w-full items-end' key={item.id}>
                      <div className='flex-1 w-full'>
                        <label className='font-medium'>{idx === 0 && "Instrumento(s)"}</label>
                        <div className="flex gap-2 mt-3">
                          <Select
                            className='w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg'
                            name={`instrumento-${item.id}`}
                            onChange={(e) => handleInstrumentoChange(item.id, e.target.value)}
                          >
                            <option value=''>Seleccione una opción</option>
                            <option value='Violín'>Violín</option>
                            <option value='Viola'>Viola</option>
                            <option value='Cello'>Cello</option>
                            <option value='Bajo'>Bajo</option>
                            <option value='Trompeta'>Trompeta</option>
                            <option value='Piano'>Piano</option>
                          </Select>
                          <button
                            type="button"
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center"
                            title="Añadir otro instrumento"
                            onClick={() => handleAdd(setInstrumentos, instrumentos)}
                          >
                            <span className="text-lg font-bold">+</span>
                          </button>
                          {instrumentos.length > 1 && (
                            <button
                              type="button"
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center"
                              title="Eliminar"
                              onClick={() => handleRemove(instrumentos, setInstrumentos, item.id)}
                            >
                              <span className="text-lg font-bold">−</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Teóricas */}
                  {teoricas.map((item, idx) => (
                    <div className='flex flex-col sm:flex-row gap-4 w-full items-end' key={item.id}>
                      <div className='flex-1 w-full'>
                        <label className='font-medium'>{idx === 0 && "Teóricas"}</label>
                        <div className="flex gap-2 mt-3">
                          <Input
                            type='text'
                            className='w-full focus:border-blue-600'
                            name={`teorica-${item.id}`}
                            onChange={(e) => handleTeoricaChange(item.id, e.target.value)}
                          />
                          <button
                            type="button"
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center"
                            title="Añadir otra teórica"
                            onClick={() => handleAdd(setTeoricas, teoricas)}
                          >
                            <span className="text-lg font-bold">+</span>
                          </button>
                          {teoricas.length > 1 && (
                            <button
                              type="button"
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center"
                              title="Eliminar"
                              onClick={() => handleRemove(teoricas, setTeoricas, item.id)}
                            >
                              <span className="text-lg font-bold">−</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Otros */}
                  {otros.map((item, idx) => (
                    <div className='flex flex-col sm:flex-row gap-4 w-full items-end' key={item.id}>
                      <div className='flex-1 w-full'>
                        <label className='font-medium'>{idx === 0 && "Otro(s)"}</label>
                        <div className="flex gap-2 mt-3">
                          <Input
                            type='text'
                            className='w-full focus:border-blue-600'
                            name={`otro-${item.id}`}
                            onChange={(e) => handleOtroChange(item.id, e.target.value)}
                          />
                          <button
                            type="button"
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center"
                            title="Añadir otro"
                            onClick={() => handleAdd(setOtros, otros)}
                          >
                            <span className="text-lg font-bold">+</span>
                          </button>
                          {otros.length > 1 && (
                            <button
                              type="button"
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center"
                              title="Eliminar"
                              onClick={() => handleRemove(otros, setOtros, item.id)}
                            >
                              <span className="text-lg font-bold">−</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              );
            })()}
            <br></br>
            {/* Autorización */}
            <h3 className='text-gray-800 text-3xl font-bold sm:text-xl'>Autorización</h3>
            <p className='text-gray-800 text-2x l font-bold sm:text-sm'>
              Autorizo a la Fundación Orquesta Sinfónica de Carabobo a hacer uso del material fotográfico y audiovisual de las actividades académicas y artísticas que se lleven a cabo durante el desarrollo del Programa de Formación Musical. Las imágenes podrán ser usadas para la difusión en medios de comunicación y redes sociales.
               *</p>
            <div className='flex items-center mt-3 space-x-6'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='autorizacion'
                    value='si'
                    required
                    className='form-radio text-blue-600'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setautorizacion(e.target.value)}
                  />
                  <span className='ml-2'>Sí</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='autorizacion'
                    value='no'
                    required
                    className='form-radio text-blue-600'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setautorizacion(e.target.value)}
                  />
                  <span className='ml-2'>No</span>
                </label>
              </div>
            <Button
              type='submit'
              className='w-full text-white bg-blue-600 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg'
            >
              Inscribir
            </Button>
          </form>

          {/* Modal de confirmación */}
          {showModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-30 backdrop-blur-sm ">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                    <p className="text-center mb-6">
                      Se ha descargado la planilla de inscripción. Por favor, realice una revisión y en caso de que todos los datos sean correctos, proceda con la inscripción. <br></br>Si exite algún error, por favor, vuela a llenar los datos correspondientes</p>
                  <div className="flex justify-between mt-4">
                  <Button
                    className="w-[48%] bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => setShowModal(false)}
                  >
                    Volver
                  </Button>
                  <Button
                    className="w-[48%] bg-green-600 text-white hover:bg-green-400 rounded"
                    onClick={() => {
                      setShowModal(false);
                      handleRegistrar()
                    }}
                  >
                    Continuar
                  </Button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
