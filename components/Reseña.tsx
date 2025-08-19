import SectionWrapper from "@/components/SectionWrapper"
import DarkWrapper from "@/components/DarkWrapper"

const CenteredCTAText = () => {
    return (
        
        <SectionWrapper id="reseña-historica" >
            <div className="mx-8 md:mx-3 rounded-xl">
                <DarkWrapper className="rounded-3xl">
                <div className="custom-screen text-center mx-5">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-gray-300 text-3xl font-semibold sm:text-4xl mb-12">
                            Reseña Histórica
                        </h2>
                        <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 text-justify text-gray-300">
                            <p className="">
                                Nace un 7 de octubre de 2019. Fundado por el maestro José Carmelo Calabrese, este
programa tiene como objetivo la formación musical y artística integral de los nuevos
músicos del Estado Carabobo y Venezuela, creando así, las generaciones de relevo de la
Orquesta Sinfónica de Carabobo. 
Este programa académico lleva el nombre del Director Laureado de la Orquesta Sinfónica
de Carabobo, maestro José Calabrese (padre). Actualmente cuenta con alianzas estratégicas
y académicas con organizaciones en países como Venezuela, Estados Unidos, Colombia y
Brasil, además de tener el aval internacional de la UNESCO.
                            </p>
                            <p className="">
                                La Orquesta Sinfónica de Carabobo en cada presentación hace gala de una inigualable versatilidad, la cual se demuestra en la amplia gama del repertorio que ejecuta, el cual va desde el clásico universal, la música popular y sobre todo, la mejor música venezolana de todos los tiempos.
                                Una demostración del reconocimiento a la calidad de esta agrupación musical, está en el hecho histórico de haber sido escogida como orquesta acompañante del famoso tenor Luciano Pavarotti en el memorable concierto realizado en la ciudad de Valencia.
                                Más de tres décadas de arduo, constante, fructífero y renovador trabajo.
                                
                            </p>
                        </div>
                    </div>
                </div>
                </DarkWrapper>
            </div>
        </SectionWrapper>
    )
}

export default CenteredCTAText