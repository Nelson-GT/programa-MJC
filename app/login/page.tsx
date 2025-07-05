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
            <h1 className="mt-5 text-gray-800 text-2xl font-bold sm:text-3xl">
              Iniciar Sesión
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Accede con tu usuario o correo y contraseña
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="font-medium">Usuario o Correo</label>
              <Input
                type="text"
                required
                placeholder="usuario o correo"
                className="w-full mt-3 focus:border-blue-600"
                id="username"
              />
            </div>
            <div>
              <label className="font-medium">Contraseña</label>
              <Input
                type="password"
                required
                placeholder="contraseña"
                className="w-full mt-3 focus:border-blue-600"
                id="password"
              />
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-blue-600 hover:underline text-sm">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-500 ring-offset-2 ring-blue-600 focus:ring shadow rounded-lg"
            >
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}