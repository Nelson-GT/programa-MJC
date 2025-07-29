"use client"
import Head from "next/head"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import { FormEvent } from "react"

export default function Login() {
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const usernameInput = document.getElementById("username") as HTMLInputElement | null
    const passwordInput = document.getElementById("password") as HTMLInputElement | null

    const username = usernameInput?.value || ""
    const password = passwordInput?.value || ""

    if (username === "estudiante" && password === "estudiante") {
      router.push("/usuario")
    } else if (username === "profesor" && password === "profesor") {
      router.push("/profesor")
    } else if (username === "admin" && password === "admin") {
      router.push("/admin")
    } else {
      alert("Usuario o contraseña incorrectos")
    }
  }

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
              />
            </div>
            <Button
              type="submit"
              className="w-full text-white ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg"
              style={{backgroundColor: "rgba(112, 3, 3, 1)"}}
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
    </>
  )
}