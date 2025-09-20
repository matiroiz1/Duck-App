"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { useIsMobile } from '@/components/ui/use-mobile'; // Importa el hook


// Definición de tipos para los patos
interface Duck {
  id: number
  name: string
  scientificName: string
  description: string
  image: string
  category: string
  size: string
  color: string
  habitat: string[]
}

export default function CatalogoPatos() {
  // Estado para el pato seleccionado en el popup
  const [selectedDuck, setSelectedDuck] = useState<Duck | null>(null)

  // Estado para los filtros
  const [filters, setFilters] = useState({
    names: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    habitats: [] as string[],
  })

  // Estado para los patos filtrados
  const [filteredDucks, setFilteredDucks] = useState<Duck[]>([])

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("")

  // Datos de ejemplo para los patos
  const ducks: Duck[] = [
    {
      id: 1,
      name: "Pato Crestón",
      scientificName: "Lophonetta specularioides",
      description:
        "Pato de tamaño mediano con una distintiva cresta en la cabeza. Habita principalmente en lagos y ríos de la Patagonia argentina.",
      image: "/catalogo/patoCreston.jpg?height=300&width=400&text=Pato Crestón",
      category: "nativos",
      size: "mediano",
      color: "marron",
      habitat: ["lagos", "rios"],
    },
    {
      id: 2,
      name: "Pato Overo",
      scientificName: "Anas sibilatrix",
      description:
        "Conocido por su plumaje blanco y negro característico. Es común en humedales y lagunas de toda Argentina.",
      image: "/catalogo/patoOvero.jpg?height=300&width=400&text=Pato Overo",
      category: "nativos",
      size: "mediano",
      color: "blanco",
      habitat: ["humedales", "lagos"],
    },
    {
      id: 3,
      name: "Pato Barcino",
      scientificName: "Anas flavirostris",
      description:
        "Uno de los patos más comunes en Argentina. De tamaño pequeño y color marrón moteado, habita en diversos cuerpos de agua.",
      image: "/catalogo/patoBarcino.jpg?height=300&width=400&text=Pato Barcino",
      category: "nativos",
      size: "pequeno",
      color: "marron",
      habitat: ["humedales", "lagos", "rios"],
    },
    {
      id: 4,
      name: "Pato Cabeza Negra",
      scientificName: "Heteronetta atricapilla",
      description: "Único pato parásito de nido del mundo. El macho tiene la cabeza negra característica.",
      image: "/catalogo/patoCabezaNegra.jpg?height=300&width=400&text=Pato Cabeza Negra",
      category: "raros",
      size: "pequeno",
      color: "negro",
      habitat: ["humedales"],
    },
    {
      id: 5,
      name: "Pato Maicero",
      scientificName: "Anas georgica",
      description: "Pato de tamaño mediano con plumaje marrón. Común en zonas agrícolas y humedales.",
      image: "/catalogo/patoMaicero.jpg?height=300&width=400&text=Pato Maicero",
      category: "nativos",
      size: "mediano",
      color: "marron",
      habitat: ["humedales", "lagos"],
    },
    {
      id: 6,
      name: "Pato Cuchara",
      scientificName: "Spatula platalea",
      description:
        "Reconocible por su pico ancho en forma de cuchara. Migra a Argentina durante ciertas épocas del año.",
      image: "/catalogo/patoCuchara.jpg?height=300&width=400&text=Pato Cuchara",
      category: "migratorios",
      size: "grande",
      color: "marron",
      habitat: ["humedales", "lagos"],
    },
  ]

  // Función para desplazarse a una sección
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Función para manejar cambios en los filtros
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters }

      switch (filterType) {
        case "name":
          if (newFilters.names.includes(value)) {
            newFilters.names = newFilters.names.filter((name) => name !== value)
          } else {
            newFilters.names.push(value)
          }
          break
        case "size":
          if (newFilters.sizes.includes(value)) {
            newFilters.sizes = newFilters.sizes.filter((size) => size !== value)
          } else {
            newFilters.sizes.push(value)
          }
          break
        case "color":
          if (newFilters.colors.includes(value)) {
            newFilters.colors = newFilters.colors.filter((color) => color !== value)
          } else {
            newFilters.colors.push(value)
          }
          break
        case "habitat":
          if (newFilters.habitats.includes(value)) {
            newFilters.habitats = newFilters.habitats.filter((habitat) => habitat !== value)
          } else {
            newFilters.habitats.push(value)
          }
          break
      }

      return newFilters
    })
  }

  // Efecto para aplicar filtros
  useEffect(() => {
    let result = [...ducks]

    // Aplicar filtro de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (duck) =>
          duck.name.toLowerCase().includes(term) ||
          duck.scientificName.toLowerCase().includes(term) ||
          duck.description.toLowerCase().includes(term),
      )
    }

    // Aplicar filtros de nombre
    if (filters.names.length > 0) {
      result = result.filter((duck) => filters.names.includes(duck.name))
    }

    // Aplicar filtros de tamaño
    if (filters.sizes.length > 0) {
      result = result.filter((duck) => filters.sizes.includes(duck.size))
    }

    // Aplicar filtros de color
    if (filters.colors.length > 0) {
      result = result.filter((duck) => filters.colors.includes(duck.color))
    }

    // Aplicar filtros de hábitat
    if (filters.habitats.length > 0) {
      result = result.filter((duck) => duck.habitat.some((h) => filters.habitats.includes(h)))
    }

    setFilteredDucks(result)
  }, [filters, searchTerm])

  // Inicializar los patos filtrados con todos los patos al cargar
  useEffect(() => {
    setFilteredDucks(ducks)
  }, [])

  // Paleta de colores marrón
  const colors = {
    lightest: "#FEF9EC", // 50
    lighter: "#FAEECB", // 100
    light: "#F5DC92", // 200
    medium: "#EFC356", // 300
    mediumDark: "#EBAE34", // 400
    dark: "#E4BF1C", // 500
    darker: "#CA6C15", // 600
    darkest: "#A84D15", // 700
    deep: "#883C18", // 800
    deeper: "#703217", // 900
    deepest: "#401808", // 950
  }

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { id: "inicio", label: "Inicio" },
    { id: "caracteristicas", label: "Características" },
    { id: "especies", label: "Especies" },
    { id: "contacto", label: "Contacto" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error(`Element with id ${id} not found`);
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b shadow-md" style={{ backgroundColor: colors.lighter }}>
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/inicio/logo_solo.png?height=40&width=40"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-xl font-bold" style={{ color: colors.darkest }}>
              Duck App
            </h1>
          </div>
          {/* Menú para pantallas NO móviles */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className="text-sm font-bold transition duration-300 ease-in-out hover:text-[#EBAE34] hover:underline underline-offset-4 cursor-pointer"
                  style={{ color: colors.darker }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Botón para abrir el menú en pantallas móviles */}
          {isMobile && (
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden"
              style={{ color: colors.darker, borderColor: colors.medium }}
            >
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
            </Button>
          )}

          {/* Menú desplegable para pantallas móviles */}
          {isMobile && isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-md mt-1 z-20">
              <ul className="py-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

  return (
    <div id="inicio">
      <Navbar/>
      <main className="flex-1">
        {/* Sección de Encabezado */}
        <section  className="py-12" style={{ backgroundColor: colors.light }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.darkest }}>
              Catálogo de Patos Argentinos
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: colors.darker }}>
              Descubre las especies más fascinantes de patos que habitan en Argentina. Una guía completa con imágenes,
              características y hábitats de estas maravillosas aves acuáticas.
            </p>
          </div>
        </section>


        {/* Sección Principal Destacada */}
        <section className="py-12" style={{ backgroundColor: colors.lighter }}>
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: colors.darkest }}>
                  Descubre la Belleza de Nuestros Patos Nativos
                </h2>
                <p className="mb-6" style={{ color: colors.darker }}>
                  Argentina alberga una increíble diversidad de patos, desde el colorido Pato Crestón hasta el elegante
                  Pato Overo. Nuestro catálogo te permite explorar estas maravillosas aves en su hábitat natural.
                </p>
                <Button
                  style={{ backgroundColor: colors.darker, color: colors.lightest }}
                  onClick={() => scrollToSection("especies")}
                >
                  Explorar Especies
                </Button>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/catalogo/ducks.png?height=600&width=800"
                  alt="Pato destacado"
                  fill
                  className="object-cover"
                  style={{ backgroundColor: colors.medium }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Lista de Características */}
        <section className="py-12" id="caracteristicas" style={{ backgroundColor: colors.light, paddingTop: '100px' }}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.darkest }}>
              Características
            </h2>
            <div className="max-w-3xl mx-auto mb-8">
              <div className="flex items-center rounded-lg p-2 shadow-sm" style={{ backgroundColor: colors.lightest }}>
                <Search className="h-5 w-5 mr-2" style={{ color: colors.darker }} />
                <input
                  type="text"
                  placeholder="Buscar por nombre, tamaño, color o hábitat..."
                  className="flex-1 bg-transparent border-none focus:outline-none"
                  style={{ color: colors.darkest }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2" style={{ color: colors.darkest }}>
                    Filtrar por Nombre
                  </h3>
                  <div className="space-y-2">
                    {ducks.map((duck) => (
                      <div key={`name-${duck.id}`} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`pato-${duck.id}`}
                          className="mr-2"
                          checked={filters.names.includes(duck.name)}
                          onChange={() => handleFilterChange("name", duck.name)}
                        />
                        <label htmlFor={`pato-${duck.id}`} style={{ color: colors.darker }}>
                          {duck.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2" style={{ color: colors.darkest }}>
                    Filtrar por Tamaño
                  </h3>
                  <div className="space-y-2">
                    {["pequeno", "mediano", "grande"].map((size) => (
                      <div key={`size-${size}`} className="flex items-center">
                        <input
                          type="checkbox"
                          id={size}
                          className="mr-2"
                          checked={filters.sizes.includes(size)}
                          onChange={() => handleFilterChange("size", size)}
                        />
                        <label htmlFor={size} style={{ color: colors.darker }}>
                          {size === "pequeno" ? "Pequeño" : size === "mediano" ? "Mediano" : "Grande"}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2" style={{ color: colors.darkest }}>
                    Filtrar por Color
                  </h3>
                  <div className="space-y-2">
                    {["marron", "negro", "blanco"].map((color) => (
                      <div key={`color-${color}`} className="flex items-center">
                        <input
                          type="checkbox"
                          id={color}
                          className="mr-2"
                          checked={filters.colors.includes(color)}
                          onChange={() => handleFilterChange("color", color)}
                        />
                        <label htmlFor={color} style={{ color: colors.darker }}>
                          {color === "marron" ? "Marrón" : color === "negro" ? "Negro" : "Blanco"}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2" style={{ color: colors.darkest }}>
                    Filtrar por Hábitat
                  </h3>
                  <div className="space-y-2">
                    {["humedales", "lagos", "rios"].map((habitat) => (
                      <div key={`habitat-${habitat}`} className="flex items-center">
                        <input
                          type="checkbox"
                          id={habitat}
                          className="mr-2"
                          checked={filters.habitats.includes(habitat)}
                          onChange={() => handleFilterChange("habitat", habitat)}
                        />
                        <label htmlFor={habitat} style={{ color: colors.darker }}>
                          {habitat === "humedales" ? "Humedales" : habitat === "lagos" ? "Lagos" : "Ríos"}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resultados de filtrado */}
            {(filters.names.length > 0 ||
              filters.sizes.length > 0 ||
              filters.colors.length > 0 ||
              filters.habitats.length > 0 ||
              searchTerm) && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-center" style={{ color: colors.darkest }}>
                  Resultados de la búsqueda ({filteredDucks.length})
                </h3>
                {filteredDucks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDucks.map((duck) => (
                      <Card
                        key={duck.id}
                        className="overflow-hidden"
                        style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}
                      >
                        <div className="relative h-48" style={{ backgroundColor: colors.medium }}>
                          <Image src={duck.image || "/placeholder.svg"} alt={duck.name} fill className="object-cover" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-1" style={{ color: colors.darkest }}>
                            {duck.name}
                          </h3>
                          <p className="text-sm italic mb-2" style={{ color: colors.darker }}>
                            {duck.scientificName}
                          </p>
                          <p className="text-sm mb-4" style={{ color: colors.darker }}>
                            {duck.description.substring(0, 100)}...
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            style={{ borderColor: colors.medium, color: colors.darker }}
                            onClick={() => setSelectedDuck(duck)}
                          >
                            Ver Detalles <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center" style={{ color: colors.darker }}>
                    No se encontraron patos con los filtros seleccionados.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>


        {/* Sección de Lista de Portafolio */} 
        <section className="py-12" id="especies" style={{ backgroundColor: colors.lighter, paddingTop: '100px'}}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.darkest }}>
              Especies de Patos
            </h2>
            <p className="text-center mb-8" style={{ color: colors.darker }}>
              Lista de especies de patos disponibles en el catálogo con información detallada sobre cada una.
            </p>

            <Tabs defaultValue="todos" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-4 mb-8" style={{ backgroundColor: colors.light }}>
                <TabsTrigger value="todos" style={{ color: colors.darkest }}>
                  Todos
                </TabsTrigger>
                <TabsTrigger value="nativos" style={{ color: colors.darkest }}>
                  Nativos
                </TabsTrigger>
                <TabsTrigger value="migratorios" style={{ color: colors.darkest }}>
                  Migratorios
                </TabsTrigger>
                <TabsTrigger value="raros" style={{ color: colors.darkest }}>
                  Raros
                </TabsTrigger>
              </TabsList>

              <TabsContent value="todos" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ducks.map((duck) => (
                    <Card
                      key={duck.id}
                      className="overflow-hidden"
                      style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}
                    >
                      <div className="relative h-48" style={{ backgroundColor: colors.medium }}>
                        <Image src={duck.image || "/placeholder.svg"} alt={duck.name} fill className="object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold mb-1" style={{ color: colors.darkest }}>
                          {duck.name}
                        </h3>
                        <p className="text-sm italic mb-2" style={{ color: colors.darker }}>
                          {duck.scientificName}
                        </p>
                        <p className="text-sm mb-4" style={{ color: colors.darker }}>
                          {duck.description.substring(0, 100)}...
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          style={{ borderColor: colors.medium, color: colors.darker }}
                          onClick={() => setSelectedDuck(duck)}
                        >
                          Ver Detalles <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="nativos" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ducks
                    .filter((duck) => duck.category === "nativos")
                    .map((duck) => (
                      <Card
                        key={duck.id}
                        className="overflow-hidden"
                        style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}
                      >
                        <div className="relative h-48" style={{ backgroundColor: colors.medium }}>
                          <Image src={duck.image || "/placeholder.svg"} alt={duck.name} fill className="object-cover" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-1" style={{ color: colors.darkest }}>
                            {duck.name}
                          </h3>
                          <p className="text-sm italic mb-2" style={{ color: colors.darker }}>
                            {duck.scientificName}
                          </p>
                          <p className="text-sm mb-4" style={{ color: colors.darker }}>
                            {duck.description.substring(0, 100)}...
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            style={{ borderColor: colors.medium, color: colors.darker }}
                            onClick={() => setSelectedDuck(duck)}
                          >
                            Ver Detalles <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="migratorios" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ducks
                    .filter((duck) => duck.category === "migratorios")
                    .map((duck) => (
                      <Card
                        key={duck.id}
                        className="overflow-hidden"
                        style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}
                      >
                        <div className="relative h-48" style={{ backgroundColor: colors.medium }}>
                          <Image src={duck.image || "/placeholder.svg"} alt={duck.name} fill className="object-cover" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-1" style={{ color: colors.darkest }}>
                            {duck.name}
                          </h3>
                          <p className="text-sm italic mb-2" style={{ color: colors.darker }}>
                            {duck.scientificName}
                          </p>
                          <p className="text-sm mb-4" style={{ color: colors.darker }}>
                            {duck.description.substring(0, 100)}...
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            style={{ borderColor: colors.medium, color: colors.darker }}
                            onClick={() => setSelectedDuck(duck)}
                          >
                            Ver Detalles <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="raros" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ducks
                    .filter((duck) => duck.category === "raros")
                    .map((duck) => (
                      <Card
                        key={duck.id}
                        className="overflow-hidden"
                        style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}
                      >
                        <div className="relative h-48" style={{ backgroundColor: colors.medium }}>
                          <Image src={duck.image || "/placeholder.svg"} alt={duck.name} fill className="object-cover" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold mb-1" style={{ color: colors.darkest }}>
                            {duck.name}
                          </h3>
                          <p className="text-sm italic mb-2" style={{ color: colors.darker }}>
                            {duck.scientificName}
                          </p>
                          <p className="text-sm mb-4" style={{ color: colors.darker }}>
                            {duck.description.substring(0, 100)}...
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            style={{ borderColor: colors.medium, color: colors.darker }}
                            onClick={() => setSelectedDuck(duck)}
                          >
                            Ver Detalles <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Sección de Preguntas Frecuentes */}
        <section className="py-12" style={{ backgroundColor: colors.light }}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.darkest }}>
              Preguntas Frecuentes
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <Card style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2" style={{ color: colors.darkest }}>
                    ¿Cuántas especies de patos hay en Argentina?
                  </h3>
                  <p style={{ color: colors.darker }}>
                    Argentina cuenta con más de 20 especies de patos nativos y migratorios que habitan en sus diversos
                    ecosistemas acuáticos. La diversidad incluye especies en todo el territorio nacional.
                  </p>
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2" style={{ color: colors.darkest }}>
                    ¿Cuál es el pato más común en Argentina?
                  </h3>
                  <p style={{ color: colors.darker }}>
                    El Pato Barcino (Anas flavirostris) es una de las especies más comunes y se encuentra ampliamente
                    distribuido en todo el país, especialmente en humedales, lagunas y otros cuerpos de agua.
                  </p>
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2" style={{ color: colors.darkest }}>
                    ¿Dónde puedo observar patos en su hábitat natural?
                  </h3>
                  <p style={{ color: colors.darker }}>
                    Los mejores lugares para observar patos en Argentina son los humedales de Iberá, la laguna de Mar
                    Chiquita, y los parques nacionales como El Palmar y Nahuel Huapi. Estos ecosistemas ofrecen
                    excelentes oportunidades para el avistamiento de aves.
                  </p>
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: colors.lightest, borderColor: colors.medium }}>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2" style={{ color: colors.darkest }}>
                    ¿En qué época del año es mejor para observar patos?
                  </h3>
                  <p style={{ color: colors.darker }}>
                    La primavera y el otoño suelen ser las mejores temporadas para la observación de patos en Argentina.
                    Durante la primavera muchas especies están en época de reproducción, mientras que en otoño se pueden
                    observar especies migratorias.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Sección de Contacto */}
        <section id="contacto" className="py-20" style={{ backgroundColor: colors.lighter }}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.darkest }}>
              Contacto
            </h2>
            <p className="text-center mb-8" style={{ color: colors.darker }}>
              ¿Tienes preguntas sobre las especies de patos o necesitas información adicional? ¡Contáctanos!
            </p>

            <div className="max-w-md mx-auto">
              <Card style={{ backgroundColor: colors.lighter, borderColor: colors.medium }}>
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="nombre"
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.darkest }}
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        className="w-full p-2 border rounded-md"
                        placeholder="Tu nombre"
                        style={{ borderColor: colors.medium, backgroundColor: colors.lightest, color: colors.darkest }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.darkest }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-2 border rounded-md"
                        placeholder="tu@email.com"
                        style={{ borderColor: colors.medium, backgroundColor: colors.lightest, color: colors.darkest }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="mensaje"
                        className="block text-sm font-medium mb-1"
                        style={{ color: colors.darkest }}
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="mensaje"
                        rows={4}
                        className="w-full p-2 border rounded-md"
                        placeholder="Escribe tu consulta sobre especies de patos..."
                        style={{ borderColor: colors.medium, backgroundColor: colors.lightest, color: colors.darkest }}
                      ></textarea>
                    </div>
                    <Button className="w-full" style={{ backgroundColor: colors.darker, color: colors.lightest }}>
                      Enviar Consulta
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Pie de Página */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Catálogo de Patos Argentinos</h3>
              <p className="text-gray-400">
                La guía más completa sobre las especies de patos que habitan en Argentina.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Especies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 Catálogo de Patos Argentinos. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de detalles del pato */}
      <Dialog open={!!selectedDuck} onOpenChange={(open) => !open && setSelectedDuck(null)}>
        <DialogContent className="sm:max-w-[500px]" style={{ backgroundColor: colors.lightest }}>
          <DialogHeader>
            <DialogTitle style={{ color: colors.darkest }}>{selectedDuck?.name}</DialogTitle>
            <DialogDescription style={{ color: colors.darker }}>{selectedDuck?.scientificName}</DialogDescription>
          </DialogHeader>
          <div className="relative h-64 w-full rounded-md overflow-hidden my-4">
            {selectedDuck && (
              <Image
                src={selectedDuck.image || "/placeholder.svg"}
                alt={selectedDuck.name}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1" style={{ color: colors.darkest }}>
                Descripción
              </h4>
              <p style={{ color: colors.darker }}>{selectedDuck?.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-1" style={{ color: colors.darkest }}>
                  Categoría
                </h4>
                <p style={{ color: colors.darker }}>
                  {selectedDuck?.category === "nativos"
                    ? "Nativo"
                    : selectedDuck?.category === "migratorios"
                      ? "Migratorio"
                      : "Raro"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: colors.darkest }}>
                  Tamaño
                </h4>
                <p style={{ color: colors.darker }}>
                  {selectedDuck?.size === "pequeno"
                    ? "Pequeño"
                    : selectedDuck?.size === "mediano"
                      ? "Mediano"
                      : "Grande"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: colors.darkest }}>
                  Color predominante
                </h4>
                <p style={{ color: colors.darker }}>
                  {selectedDuck?.color === "marron" ? "Marrón" : selectedDuck?.color === "negro" ? "Negro" : "Blanco"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: colors.darkest }}>
                  Hábitat
                </h4>
                <p style={{ color: colors.darker }}>
                  {selectedDuck?.habitat
                    .map((h) => (h === "humedales" ? "Humedales" : h === "lagos" ? "Lagos" : "Ríos"))
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
          <DialogClose asChild>
            <Button style={{ backgroundColor: colors.darker, color: colors.lightest }}>Cerrar</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

