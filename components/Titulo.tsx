import GradientWrapper from "@/components/GradientWrapper"
import NavLink from "@/components/ui/NavLink"
import { useState, useEffect } from 'react';

type Slide = {
  id: number;
  src: string;
  alt: string;
};

const Hero = () => {
     const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slides: Slide[] = [
    { id: 1, src: "/imagen1.jpeg", alt: "Imagen 1 del programa" },
    { id: 2, src: "/imagen2.jpeg", alt: "Imagen 2 del programa" },
    { id: 3, src: "/imagen3.jpeg", alt: "Imagen 3 del programa" },
    { id: 4, src: "/imagen4.jpeg", alt: "Imagen  4 del programa" },
    { id: 5, src: "/imagen5.jpeg", alt: "Imagen  5 del programa" },
    { id: 6, src: "/imagen6.jpeg", alt: "Imagen  6 del programa" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };
    return(
    <section>
        <GradientWrapper wrapperClassName="inset-0" className="custom-screen text-gray-600 pt-5">
            <div className="space-y-5 max-w-4xl mx-auto text-center">
                <h1 className="text-3xl text-gray-800 font-extrabold mx-auto sm:text-5xl">
                    Programa de Formación Musical <span className=" bg-clip-text text-transparent bg-gradient-to-r from-[#A4131A] to-[#CB9318]">"Maestro José Calabrese"</span>
                </h1>
                <p className="max-w-xl mx-auto ">
                    Desde el corazón de Carabobo, resonando con historia y pasión
                </p>
                <div className="max-w-3xl mx-auto ">
            <div className="relative h-80 sm:h-86 rounded-lg overflow-hidden shadow-xl mt-10">
              {/* Contenedor de slides */}
              <div className="relative h-full w-full">
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide 
                        ? 'opacity-100 z-0' 
                        : 'opacity-0 pointer-events-none z-0'
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              
              {/* Botones de navegación */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm z-10 transition-all"
                aria-label="Imagen anterior"
              >
                &lt;
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm z-10 transition-all"
                aria-label="Siguiente imagen"
              >
                &gt;
              </button>
              
              {/* Indicadores de slide */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                    }`}
                    aria-label={`Ir a la imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
    
                <div className="flex items-center justify-center gap-x-3 font-medium text-sm">
                    <NavLink
                        href="/registro"
                        className="flex items-center gap-x-2 text-white"
                        style={{backgroundColor: "rgba(112, 3, 3, 1)"}}
                    >
                        Inscribirse
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </NavLink>
                    <NavLink
                        href="#reseña-historica" 
                        className="flex items-center gap-x-2 text-gray-700 hover:text-gray-900"
                        scroll={false}
                    >
                        Sobre nosotros  
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </NavLink>
                </div>
            </div>
        </GradientWrapper>
    </section>
    )
}

export default Hero