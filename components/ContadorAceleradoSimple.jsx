import { useState, useEffect, useRef } from 'react';

const useContadorAcelerado = (numeroFinal, duracion, estaVisible) => {
  const [contador, setContador] = useState(0);
  const inicioRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    if (!estaVisible) {
      setContador(0);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      return;
    }

    inicioRef.current = null;

    const animar = (tiempoActual) => {
      if (!inicioRef.current) inicioRef.current = tiempoActual;
      
      const tiempoTranscurrido = tiempoActual - inicioRef.current;
      const progreso = Math.min(tiempoTranscurrido / duracion, 1);
      const progresoAcelerado = Math.pow(progreso, 3);
      
      setContador(Math.floor(progresoAcelerado * numeroFinal));
      
      if (progreso < 1) {
        requestRef.current = requestAnimationFrame(animar);
      }
    };

    requestRef.current = requestAnimationFrame(animar);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [estaVisible, numeroFinal, duracion]);

  return contador;
};

export default function ContadorConReinicio ({ numeroFinal }){
  const [estaVisible, setEstaVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setEstaVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const contador = useContadorAcelerado(numeroFinal, 2000, estaVisible);

  return <div ref={ref} className='text-5xl font-times'>+{contador}</div>;
};
