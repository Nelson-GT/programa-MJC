"use client"
import Head from "next/head"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import React, { useState, useEffect, FormEvent} from "react"

export default function Login() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [errorLogin, setErrorLogin] = useState("")
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userName === "admin" && password === "admin") {
      router.push("/admin")
    } else {
      console.log({userName, password});
    }
  }
  
  const login = async (email: string, password: string) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json();
    if (!res.ok){ 
      setErrorLogin(result.message)
      setShowModal(true);
    };
    alert
    router.push(`/usuario/${result.userId}`);
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Iniciar Sesión - Planilla</title>
      </Head>
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-sm w-full text-gray-600">
          <div className="text-center">
            <h1 className="mt-5 text-gray-800 text-3xl font-bold sm:text-3xl">
              Iniciar Sesión
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="font-medium text-gray-700">Usuario *</label>
              <Input
                type="text"
                required
                placeholder="Usuario / Correo electrónico"
                className="w-full mt-3 focus:border-blue-600"
                id="username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium text-gray-700">Contraseña *</label>
              <Input
                type="password"
                required
                placeholder="Contraseña"
                className="w-full mt-3 focus:border-blue-600"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full text-white ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg"
              style={{backgroundColor: "rgba(112, 3, 3, 1)"}}
              onClick={() => {login(userName || "", password || "")}}
            >
              Ingresar
            </Button>
            <div className="flex justify-center">
              <a href="#" className="text-gray-600 hover:underline text-sm">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* Modal para rechazar */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent bg-opacity-30 backdrop-blur-sm">
          <div className="flex flex-col item-center justify-center bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <p className="text-center mb-6 font-semibold text-red-600 text-lg">
              {errorLogin}
            </p>
            <div className="flex justify-center items-center">
              <Button
                className="w-1/2 bg-gray-200 hover:bg-gray-300 rounded shadow-lg"
                onClick={() => setShowModal(false)}
              >
                <span className="font-bold text-">Volver</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}