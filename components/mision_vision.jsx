import ContadorConReinicio from "@/components/ContadorAceleradoSimple"

const Mision_vision = () => (
    <div className=" pb-10">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8">
                <div className="bg-white rounded-3xl shadow-xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col justify-between max-w-lg mx-auto lg:mx-0">
                    <div>
                        <h2 className="text-4xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-[#A4131A] to-[#CB9318] mb-4 text-center">
                            Misión
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed text-center">
                            Formar a nuevas generaciones de músicos, infundiéndoles valores de excelencia, solidaridad, respeto y compañerismo. Buscamos que la música sea un medio de expresión humanista, ayudando a construir una sociedad venezolana mejor a través de la educación y la cultura. 
                        </p>
                    </div>
                </div>
                <div className="bg-white rounded-3xl shadow-xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col justify-between max-w-lg mx-auto lg:mx-0">
                    <div>
                        <h2 className="text-4xl font-extrabold  bg-clip-text text-transparent bg-gradient-to-r from-[#A4131A] to-[#CB9318] mb-4 text-center">
                            Visión
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed text-center ">
                            Nos comprometemos a mantener la vanguardia musical en el país, continuando nuestra labor con las nuevas generaciones. El objetivo es consolidarnos como un reflejo de los valores que ayudamos a construir en la sociedad, a través de la educación y la cultura musical.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

export default Mision_vision