"use client"
import Button from "@/components/ui/Button"
import Navbar from "@/components/Navbar"

export default function Login() {

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
          <Button className="bg-blue-600 text-white rounded-xl hover:bg-blue-800">
            Acción 1
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