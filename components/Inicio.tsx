import Link from "next/link";

export default function Inicio() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-4 
  bg-cover bg-[center_top_40%] md:bg-[center_top_20%]"
      style={{
        backgroundImage: "url('/inicio/duck.png')",
      }}
    >
      {/* Contenido centrado con fondo blanco translúcido */}
      <div className="flex flex-col items-center justify-center gap-8 text-center bg-white/10 p-6 rounded-xl shadow-lg">
        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
          DUCK APP
        </h1>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/catalogo"
            className="inline-flex h-12 items-center justify-center rounded-md bg-black px-8 text-lg font-medium text-white shadow hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Catálogo
          </Link>
          <Link
            href="/administracion"
            className="inline-flex h-12 items-center justify-center rounded-md bg-black px-8 text-lg font-medium text-white shadow hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Administración
          </Link>
          <Link
            href="/simulacion"
            className="inline-flex h-12 items-center justify-center rounded-md bg-black px-8 text-lg font-medium text-white shadow hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Simulación
          </Link>
        </div>
      </div>
    </main>
  );
}
