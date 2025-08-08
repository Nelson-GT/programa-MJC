import ContadorConReinicio from "@/components/ContadorAceleradoSimple"

const Estadisticas = () => (
    <div className="pb-10">
        <h2 className="font-semibold text-3xl text-gray-800 text-center pb-10">
                Nuestra Trayectoria
            </h2>
        <div className="flex items-center justify-center gap-5">

            <div className="flex flex-col items-center bg-transparent rounded-2xl p-6">
                <img src="/violin.png" alt="" className="h-60 w-60 object-contain mb-2"/>
                <ContadorConReinicio numeroFinal={200} className="mb-1"/>
                <p className="text-3xl mt-1 font-medium">Estudiantes</p>
                <p className="text-3xl mt-1 font-medium">Inscritos</p>
            </div>
            <div className="flex flex-col items-center bg-transparent rounded-2xl p-6">
                <img src="/birrete.png" alt="" className="h-60 w-60 object-contain mb-2 "/>
                <ContadorConReinicio numeroFinal={30} className="mb-1"/>
                <p className="text-3xl mt-1 font-medium ">Cátedras</p>
                <p className="text-3xl mt-1 font-medium ">Activas</p>
            </div>
            <div className="flex flex-col items-center bg-transparent rounded-2xl p-6">
                <img src="/relogs.png" alt="" className="h-60 w-60 object-contain mb-2"/>
                <ContadorConReinicio numeroFinal={48} className="mb-1"/>
                <p className="text-3xl mt-1 font-medium ">Años de</p>
                <p className="text-3xl mt-1 font-medium ">Historia</p>
            </div>
        </div>
    </div>
)

export default Estadisticas