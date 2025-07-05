"use client";
import Head from "next/head";
import React from 'react';
import Brand from "@/components/Brand";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Navbar from "@/components/Navbar";
import Select from "@/components/ui/Select";

export default function index() {
  return (
    <>
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
          <form onSubmit={(e) => e.preventDefault()} className='mt-8 space-y-5'>

            {/* --------------------Estudiante-------------------- */}
            <h3 className='text-gray-800 text-2xl font-bold sm:text-xl'>Datos del Estudiante</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="w-32 h-40 bg-gray-200 border-2 border-gray-400 rounded-lg flex items-center justify-center overflow-hidden">
                  {/* Aquí se puede mostrar la foto seleccionada o un ícono de placeholder */}
                  <span className="text-gray-400 text-sm">Foto</span>
                </div>
                <label className="mt-2 block text-center text-sm font-medium text-gray-700">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    // onChange={handlePhotoChange} // Puedes implementar la lógica para mostrar la foto
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
                <label className='font-medium'>Nombres y Apellidos</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>

            {/* Fecha de Nacimiento y Edad */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Fecha de Nacimiento</label>
                <Input
                  id='fecha-nacimiento'
                  type='date'
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className='w-full mt-3 focus:border-blue-600'
                  onChange={e => {
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
                      }
                    } else {
                      if (edadInput) {
                        edadInput.value = '';
                      }
                    }
                  }}
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Edad</label>
                <Input
                  id='edad-estudiante'
                  type='text'
                  required
                  readOnly
                  className='w-full mt-3 focus:border-blue-600 bg-gray-100'
                  tabIndex={-1}
                />
              </div>
            </div>

            {/* Sexo y C.I. */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Sexo</label>
                <Select
                  required
                  className='w-full mt-3 border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg'
                >
                  <option value=''>Seleccione una opción</option>
                  <option value='masculino'>Masculino</option>
                  <option value='femenino'>Femenino</option>
                </Select>
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>C.I.:</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>

            {/* Teléfono Celular */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Teléfono Celular</label>
                <Input
                  type='tel'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>

            {/* Institución Educacional y Ocupación */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Institución Educacional</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Ocupación</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>

            {/* Profesión y Lugar de Trabajo */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Profesión</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Lugar de Trabajo</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>

            {/* Dirección Residencial */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Dirección Residencial</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>

            {/* E-mail */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>E-mail</label>
                <Input
                  type='email'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>

            {/* Alérgico(a) a */}
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Alérgico(a) a</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>

            {/* Antecedentes (médico, psicológico) */}
            <div>
              <label className='font-medium'>Antecedentes (médico, psicológico)</label>
              <div className='flex items-center mt-3 space-x-6'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='antecedentes'
                    value='si'
                    required
                    className='form-radio text-blue-600'
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
                  />
                  <span className='ml-2'>No</span>
                </label>
              </div>
            </div>
            <div>
              <label className='font-medium'>Especifique (anexar informe correspondiente)</label>
              <Input
                type='text'
                required
                className='w-full mt-3 focus:border-blue-600'
              />
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>En caso de emergencia avisar a</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Teléfono</label>
                <Input
                  type='tel'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>
            <br></br>
            {/* --------------------Representante Legal-------------------- */}
            <h3 className='text-gray-800 text-3xl font-bold sm:text-xl'>Datos del Representante Legal</h3>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Nombres y Apellidos</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>C.I.:</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Parentesco</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Teléfono Celular</label>
                <Input
                  type='tel'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Ocupación</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Profesión</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Lugar de Trabajo</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>Dirección Residencial</label>
                <Input
                  type='text'
                  required
                  className='w-full mt-3 focus:border-blue-600'
                />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-4 w-full'>
              <div className='flex-1 w-full'>
                <label className='font-medium'>E-mail</label>
                <Input
                  type='email'
                  required
                  className='w-full mt-3 focus:border-blue-600'
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
                            required
                            className='w-full border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg'
                            name={`instrumento-${item.id}`}
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
                            required
                            className='w-full focus:border-blue-600'
                            name={`teorica-${item.id}`}
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
                            required
                            className='w-full focus:border-blue-600'
                            name={`otro-${item.id}`}
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
              </p>
            <div className='flex items-center mt-3 space-x-6'>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='alergico'
                    value='si'
                    required
                    className='form-radio text-blue-600'
                  />
                  <span className='ml-2'>Sí</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='radio'
                    name='alergico'
                    value='no'
                    required
                    className='form-radio text-blue-600'
                  />
                  <span className='ml-2'>No</span>
                </label>
              </div>
            <Button
              type='submit'
              className='w-full text-white bg-blue-600 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg'>
              Inscribir
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
