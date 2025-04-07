import Image from "next/image"
import DuckSimulator from "@/components/duck-simulator";

export default function Home() {
  return (
    <>
      <header
        className="fixed top-0 w-full z-50 shadow-md"
        style={{ backgroundColor: "rgb(250, 238, 203)" }}
      >
        <nav className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/inicio/logo_solo.png?height=40&width=40"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </nav>
      </header>
      <main style={{ backgroundColor: "rgb(245, 220, 146)", paddingTop: "80px" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-6">
            Simulador de Comportamiento
          </h1>
          <p className="text-center text-amber-700 mb-8 max-w-3xl mx-auto">
            Selecciona una especie de pato, un hábitat y condiciones ambientales para observar cómo reacciona y simula su
            comportamiento natural.
          </p>

          <DuckSimulator />
        </div>
      </main>
    </>
  );
}
