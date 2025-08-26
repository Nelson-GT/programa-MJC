"use client";
import Head from "next/head";
import Reseña from "@/components/Reseña"; 
import Programas from "@/components/Programas";
import Audiciones from "@/components/Audiciones";
import Titulo from "@/components/Titulo";
import Alianza from "@/components/Alianzas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Estadistica from "@/components/Estadisticas"
import Mision_vision from "@/components/mision_vision"

export default function Home() {
  return (
    <div className="fondo">
      <Head>
        <meta name='robots' content='index' />
      </Head>
      <Navbar />
      <Titulo />  {/* sinfonica de carabobo */} 
      <Estadistica></Estadistica>
      <Alianza /> {/* Alianzas */}
      <Reseña /> {/* reseña histórica */} 
      <Mision_vision />
      <Programas /> {/* Forma parte de nuestros programas */}
      <Footer />
    </div>
  );
}
