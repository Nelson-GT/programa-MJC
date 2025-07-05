import SectionWrapper from "@/components/SectionWrapper"
import DarkWrapper from "@/components/DarkWrapper"

const CenteredCTAText = () => {
    return (
        
        <SectionWrapper id="reseña-historica">
            <DarkWrapper>
            <div className="custom-screen text-center">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-gray-300 text-3xl font-semibold sm:text-4xl mb-8">
                        Reseña Histórica
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 text-left text-gray-300">
                        <p>
                            Su trayectoria artística y de formación, enmarcada como parte de un programa social, ha sido catalogada como el hecho más importante en la vida cultural valenciana en décadas. En el año de 1976 nace esta institución que con el tiempo se ha convertido en el corazón y nervio del mundo cultural en Carabobo.
                            Desde el año 1985 el podio de dirección es ocupado por el Maestro José Calabrese, quien con su aquilatada experiencia en la dirección de agrupaciones musicales, logra imprimirle a la joven orquesta un estilo propio, una musicalidad que la identifica, eso que algunos llaman “personalidad”. Desde entonces, el ascenso de la agrupación se hace más notable, asume con éxito repertorios más exigentes, lo cual es avalado por la opinión de destacados directores, solistas nacionales y extranjeros invitados.
                        </p>
                        <p>
                            La Orquesta Sinfónica de Carabobo en cada presentación hace gala de una inigualable versatilidad, la cual se demuestra en la amplia gama del repertorio que ejecuta, el cual va desde el clásico universal, la música popular y sobre todo, la mejor música venezolana de todos los tiempos.
                            Una demostración del reconocimiento a la calidad de esta agrupación musical, está en el hecho histórico de haber sido escogida como orquesta acompañante del famoso tenor Luciano Pavarotti en el memorable concierto realizado en la ciudad de Valencia.
                            Más de tres décadas de arduo, constante, fructífero y renovador trabajo, le ha permitido un sólido sitial en el ámbito musical del país. Distinguida con múltiples reconocimientos de los diversos sectores representativos de nuestra sociedad.
                            La Orquesta Sinfónica de Carabobo, trascendencia de identidad, ocupa un lugar en la historia cultural de la región y el país.
                        </p>
                    </div>
                </div>
            </div>
        </DarkWrapper>
        </SectionWrapper>
    )
}

export default CenteredCTAText