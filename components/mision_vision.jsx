import ContadorConReinicio from "@/components/ContadorAceleradoSimple"

const Mision_vision = () => (
    <div className=" pb-10">
        <div className="container mx-auto px-15">
            <div className="bg-white rounded-3xl shadow-xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col items-center justify-between w-full mx-auto lg:mx-0 mb-8">
                <h2 className="text-4xl font-extrabold bg-clip-text text-transparent   pb-1 bg-gradient-to-r from-[#A4131A] to-[#CB9318] mb-4">
                    Objetivo General:
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                    Ejecutar una propuesta educativa integral en el campo de la formación musical
                    dentro de la OSC, que contemple los niveles inicial, medio y avanzado, impartida
                    con altos niveles de calidad y creatividad dentro de un clima de enseñanza-
                    aprendizaje que permita potenciar de manera gradual las actitudes y aptitudes de
                    niños(as) y adolescentes ante la música y su ejecución instrumental, con vistas a
                    prepararlos para su incorporación a los estudios del nivel profesional o universitario.
                </p>
            </div>
            <h2 className="text-4xl font-extrabold bg-clip-text text-transparent pb-1 bg-gradient-to-r from-[#A4131A] to-[#CB9318] mb-4 text-center">
                    Objetivos específicos:
                </h2>
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8">
                <div className="bg-white rounded-3xl shadow-xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col justify-between max-w-lg mx-auto lg:mx-0">
                    <div>
                        <p className="text-gray-700 text-lg leading-relaxed text-center">
                            Formar a niños y niñas para ser los futuros miembros de la OSC, desde un
enfoque de la educación musical integral que enfatiza la iniciación en la
práctica instrumental individual y grupal desde edades muy tempranas. 
                        </p>
                    </div>
                </div>
                 <div className="bg-white rounded-3xl shadow-xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col justify-between max-w-lg mx-auto lg:mx-0">
                    <div>
                        <p className="text-gray-700 text-lg leading-relaxed text-center">
                            Proporcionar a los niños, niñas y adolescentes participantes del Programa, la
oportunidad de descubrir sus capacidades interpretativas en una formación
orquestal, permitiéndoles desarrollarse como músicos profesionales
potencialmente exitosos.
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-3xl shadow-xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col justify-between max-w-lg mx-auto lg:mx-0">
                    <div>
                        <p className="text-gray-700 text-lg leading-relaxed text-center ">
                           Desarrollar un programa educativo musical que contemple contenidos
complementarios y en valores que contribuyan a la formación integral de los
niños, niñas, adolescentes participantes.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

export default Mision_vision