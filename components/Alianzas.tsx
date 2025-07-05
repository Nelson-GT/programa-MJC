import Image from 'next/image'
import SectionWrapper from '@/components/SectionWrapper'

import hesperia from '@/public/logos/hesperia.png'
import ujap from '@/public/logos/ujap.png'
import clx from '@/public/logos/clx.png'
import redvital from '@/public/logos/redvital.jpg'

const logos = [
    {
        src: hesperia,
        alt: "Hesperia WTC Valencia"
    },
    {
        src: ujap,
        alt: "Universidad Jose Antonio Páez"
    },
    {
        src: redvital,
        alt: "Redvital"
    },
    {
        src: clx,
        alt: "CLX Group"
    },
]

const LogoGrid = () => (
    <SectionWrapper>
        <div className="custom-screen">
            <h2 className="font-semibold text-sm text-gray-800 text-center">
                Nuestras Alianzas
            </h2>
            <div className="mt-8 flex justify-center">
                <ul className="inline-grid grid-cols-2 gap-x-10 gap-y-8 md:gap-x-16 sm:grid-cols-2 md:grid-cols-4">
                    {
                        logos.map((item, idx) => (
                            <li key={idx} className="flex justify-center items-center">
                                <div style={{ width: 100, height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        src={item.src}
                                        alt={item.alt}
                                        style={{ objectFit: 'contain' }}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </SectionWrapper>
)

export default LogoGrid