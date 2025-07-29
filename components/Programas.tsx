import Image from 'next/image'
import SectionWrapper from "@/components/SectionWrapper"
import NavLink from "@/components/ui/NavLink"

const CTA = () => {
    return (
        <SectionWrapper id="cta" className="overflow-hidden p-5 md:p-30"> 
            <div className="custom-screen flex flex-col-reverse gap-x-12 justify-between md:flex-row md:items-center">
                <div className="flex-none max-w-xl mt-12 space-y-3 md:mt-0">
                    <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Forma parte de nuestros programas
                    </h2>
                    <p className="text-gray-600 text-justify mt-8">
                        La Estudiantina del Programa de Formación Musical Maestro José Calabrese te invita a ser parte de nuestra armonía!

                        ¿Te apasiona la música y quieres llevar tu talento al siguiente nivel? ¡Esta es tu oportunidad! Ven y aprende mandolina, cuatro o guitarra.

                        Aquí podrás:
                        Desarrollar tus habilidades musicales con la guía de nuestros maestros.
                        Compartir el escenario y vivir experiencias inolvidables.
                        Formar parte de una familia que celebra la música y la amistad.
                    </p>
                    <div className="pt-1">
                        <NavLink
                            href="/registro"
                            className="inline-flex items-center gap-x-2 font-medium text-sm text-white mt-3"
                            style={{backgroundColor: "rgba(112, 3, 3, 1)"}}
                        >
                            Inscribirse
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </NavLink>
                    </div>
                </div>
                <div className="flex-none w-full md:max-w-xl">
                    <Image src="/imagen1.jpg" alt="chart" width={600} height={600} className='w-full shadow-lg rounded-lg border' />
                </div>
            </div>
        </SectionWrapper>
    )
}

export default CTA