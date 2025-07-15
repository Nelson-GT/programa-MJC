"use client";
import Head from "next/head";
import Reseña from "@/components/Reseña"; 
import Programas from "@/components/Programas";
import Audiciones from "@/components/Audiciones";
import Titulo from "@/components/Titulo";
import Alianza from "@/components/Alianzas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <meta name='robots' content='index' />
      </Head>
      <Navbar />
      <Titulo />  {/* sinfonica de carabobo */} 
      <Alianza /> {/* Alianzas */}
      <Reseña /> {/* reseña histórica */} 
      <Programas /> {/* Forma parte de nuestros programas */}
      <Footer />
    </>
  );
}
