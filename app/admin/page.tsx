"use client"
import Button from "@/components/ui/Button"
import Navbar from "@/components/Navbar"
import React, { useState } from 'react';

export default function Login() {

  const fetchListaEspera = async () => {
    try {
      const response = await fetch(`/api/migracion`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cargar la lista de espera');
      }
      const data = await response.json();
    } catch (err) {
      console.error('Error:', err);
    } finally {
    }
  };
  return (
    <>
      <Navbar />
      <div className="w-full flex flex-row items-center justify-center px-4 py-8 gap-5">
        <div className="flex flex-col max-w-sm w-full text-gray-600 gap-5">
            <Button
            className="bg-blue-600 text-white rounded-xl hover:bg-blue-800"
            onClick={() => window.location.href = "/lista_espera_programa"}
            >
            Lista de Espera
            </Button>
          <Button className="bg-blue-600 text-white rounded-xl hover:bg-blue-800"
          onClick={() => {
            const confirm = window.confirm("Esta seguro que desea Iniciar la migración de datos para crear usuarios?")
            if (confirm) {
              const data = fetchListaEspera();
            }
          }}>
            Iniciar Migración
          </Button>
        </div>
        <div className="flex flex-col max-w-sm w-full text-gray-600 gap-5">
          <Button className="bg-blue-600 text-white rounded-xl hover:bg-blue-800">
            Acción 2
          </Button>
          <Button className="bg-blue-600 text-white rounded-xl hover:bg-blue-800">
            Acción 3
          </Button>
        </div>
      </div>
    </>
  )
}