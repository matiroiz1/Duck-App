import DuckSimulator from "@/components/duck-simulator";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#f5dc92', padding: '1rem', paddingTop: '2rem' }}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-800 mb-6">
          Simulador de Comportamiento de Patos Argentinos
        </h1>
        <p className="text-center text-amber-700 mb-8 max-w-3xl mx-auto">
          Selecciona una especie de pato, un hábitat y condiciones ambientales para observar cómo reacciona y simula su
          comportamiento natural.
        </p>

        <DuckSimulator />
      </div>
    </main>
  )
}

