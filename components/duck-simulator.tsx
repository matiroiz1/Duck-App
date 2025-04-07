"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Info,
  Play,
  Save,
  Share2,
  Download,
  RefreshCw,
  Volume2,
  VolumeX,
  Droplets,
  Thermometer,
  Calendar,
  Bird,
} from "lucide-react"
import Image from "next/image"

// Tipos de datos
type DuckSpecies = {
  id: string
  name: string
  scientificName: string
  image: string
  description: string
  canFly: boolean
  defaultFlyBehavior: FlyBehavior
  defaultQuackBehavior: QuackBehavior
}

type Habitat = {
  id: string
  name: string
  description: string
  image: string
}

type WaterState = "fria" | "templada" | "caliente"
type Season = "verano" | "otono" | "invierno" | "primavera"
type FlyBehavior = "flyWithWings" | "flyMigratory" | "flyV" | "flyNoWay" | "flyRocketPowered"
type QuackBehavior = "whistle" | "squeal" | "growl" | "mute" | "quack" | "squeak"

// Datos de ejemplo
const duckSpecies: DuckSpecies[] = [
  {
    id: "pato-crestón",
    name: "Pato Crestón",
    scientificName: "Lophonetta specularioides",
    image: "/placeholder.svg?height=200&width=200",
    description: "Pato grande con cresta distintiva y plumaje marrón grisáceo.",
    canFly: true,
    defaultFlyBehavior: "flyWithWings",
    defaultQuackBehavior: "quack",
  },
  {
    id: "pato-barcino",
    name: "Pato Barcino",
    scientificName: "Anas flavirostris",
    image: "/placeholder.svg?height=200&width=200",
    description: "Pato pequeño con pico amarillo y plumaje moteado.",
    canFly: true,
    defaultFlyBehavior: "flyMigratory",
    defaultQuackBehavior: "whistle",
  },
  {
    id: "pato-picazo",
    name: "Pato Picazo",
    scientificName: "Netta peposaca",
    image: "/placeholder.svg?height=200&width=200",
    description: "Pato buceador con cabeza negra y pico rojo distintivo.",
    canFly: true,
    defaultFlyBehavior: "flyV",
    defaultQuackBehavior: "squeal",
  },
  {
    id: "pato-cutirí",
    name: "Pato Cutirí",
    scientificName: "Amazonetta brasiliensis",
    image: "/placeholder.svg?height=200&width=200",
    description: "Pato pequeño y colorido con manchas blancas en las alas.",
    canFly: true,
    defaultFlyBehavior: "flyWithWings",
    defaultQuackBehavior: "squeak",
  },
]

const habitats: Habitat[] = [
  {
    id: "estanque",
    name: "Estanque",
    description: "Cuerpo de agua pequeño y tranquilo, ideal para patos que prefieren aguas calmas.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "lago",
    name: "Lago",
    description: "Cuerpo de agua grande con profundidad variable, adecuado para diversos comportamientos.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "laguna",
    name: "Laguna",
    description: "Cuerpo de agua poco profundo con vegetación abundante, ideal para alimentación.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "humedal",
    name: "Humedal",
    description: "Área inundada con vegetación densa, perfecto para anidación y protección.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "rio",
    name: "Río",
    description: "Corriente de agua en movimiento, desafiante para la natación pero rico en alimentos.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "pantano",
    name: "Pantano",
    description: "Área de aguas estancadas con suelo fangoso, rico en nutrientes.",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "cienaga",
    name: "Ciénaga",
    description: "Zona pantanosa con vegetación densa y aguas turbias.",
    image: "/placeholder.svg?height=150&width=300",
  },
]

const flyBehaviors = {
  flyWithWings: "Vuelo con alas (normal)",
  flyMigratory: "Vuelo migratorio (larga distancia)",
  flyV: "Vuelo en formación V",
  flyNoWay: "No puede volar",
  flyRocketPowered: "Vuelo propulsado (especial)",
}

const quackBehaviors = {
  whistle: "Silbido",
  squeal: "Chillido",
  growl: "Gruñido",
  mute: "Silencioso",
  quack: "Graznido",
  squeak: "Chirrido",
}

export default function DuckSimulator() {
  // Estados
  const [selectedDuck, setSelectedDuck] = useState<DuckSpecies | null>(null)
  const [selectedHabitat, setSelectedHabitat] = useState<Habitat | null>(null)
  const [waterState, setWaterState] = useState<WaterState>("templada")
  const [season, setSeason] = useState<Season>("primavera")
  const [flyBehavior, setFlyBehavior] = useState<FlyBehavior | null>(null)
  const [quackBehavior, setQuackBehavior] = useState<QuackBehavior | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [currentBehavior, setCurrentBehavior] = useState<string>("")
  const [simulationHistory, setSimulationHistory] = useState<any[]>([])
  const [isSoundMuted, setIsSoundMuted] = useState(false)

  // Efectos
  useEffect(() => {
    if (selectedDuck) {
      setFlyBehavior(selectedDuck.defaultFlyBehavior)
      setQuackBehavior(selectedDuck.defaultQuackBehavior)
    }
  }, [selectedDuck])

  // Funciones de comportamiento
  const swim = () => {
    setCurrentBehavior("El pato está nadando tranquilamente en el agua.")
    return "swim"
  }

  const walk = () => {
    setCurrentBehavior("El pato camina por la orilla buscando alimento.")
    return "walk"
  }

  const fly = () => {
    if (!selectedDuck?.canFly) {
      setCurrentBehavior("Este pato no puede volar en estas condiciones.")
      return "nofly"
    }

    switch (flyBehavior) {
      case "flyWithWings":
        setCurrentBehavior("El pato vuela con sus alas de manera normal.")
        break
      case "flyMigratory":
        setCurrentBehavior("El pato emprende un vuelo migratorio de larga distancia.")
        break
      case "flyV":
        setCurrentBehavior("El pato vuela en formación V con otros patos.")
        break
      case "flyRocketPowered":
        setCurrentBehavior("¡El pato despega como un cohete! (Comportamiento especial)")
        break
      default:
        setCurrentBehavior("El pato no puede volar en estas condiciones.")
    }
    return flyBehavior
  }

  const quack = () => {
    switch (quackBehavior) {
      case "whistle":
        setCurrentBehavior("El pato emite un silbido suave.")
        break
      case "squeal":
        setCurrentBehavior("El pato emite un chillido agudo.")
        break
      case "growl":
        setCurrentBehavior("El pato emite un gruñido bajo.")
        break
      case "mute":
        setCurrentBehavior("El pato permanece en silencio.")
        break
      case "quack":
        setCurrentBehavior("El pato emite un graznido característico: ¡Cuac!")
        break
      case "squeak":
        setCurrentBehavior("El pato emite un chirrido corto.")
        break
      default:
        setCurrentBehavior("El pato no emite sonido.")
    }
    return quackBehavior
  }

  // Determinar comportamiento basado en condiciones
  const determineBehavior = () => {
    if (!selectedDuck || !selectedHabitat) return

    // Lógica para determinar comportamiento basado en condiciones
    if (waterState === "caliente" && season === "verano") {
      // En agua caliente durante el verano, es probable que vuele
      fly()
      setTimeout(() => quack(), 2000)
    } else if (waterState === "fria" && season === "invierno") {
      // En agua fría durante el invierno, probablemente nade para mantenerse caliente
      swim()
      setTimeout(() => quack(), 2000)
    } else if (["otono", "primavera"].includes(season)) {
      // En temporadas de transición, puede caminar por la orilla
      walk()
      setTimeout(() => quack(), 2000)
    } else {
      // Comportamiento predeterminado
      swim()
      setTimeout(() => quack(), 2000)
    }

    // Guardar simulación en historial
    const newSimulation = {
      duck: selectedDuck.name,
      habitat: selectedHabitat.name,
      water: waterState,
      season: season,
      timestamp: new Date().toISOString(),
    }

    setSimulationHistory((prev) => [...prev, newSimulation])
  }

  // Iniciar simulación
  const startSimulation = () => {
    if (!selectedDuck || !selectedHabitat) return

    setIsSimulating(true)
    determineBehavior()

    // Detener simulación después de un tiempo
    setTimeout(() => {
      setIsSimulating(false)
    }, 10000)
  }

  // Reiniciar simulación
  const resetSimulation = () => {
    setIsSimulating(false)
    setCurrentBehavior("")
  }

  // Guardar simulación
  const saveSimulation = () => {
    alert("Simulación guardada en tu perfil")
  }

  // Compartir simulación
  const shareSimulation = () => {
    alert("Enlace de simulación copiado al portapapeles")
  }

  // Descargar resumen
  const downloadSummary = () => {
    alert("Descargando resumen de simulación...")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Panel de selección */}
      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bird className="h-5 w-5 text-amber-600" />
              Selección de Especie
            </CardTitle>
            <CardDescription>Elige una especie de pato argentino para simular</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={(value) => setSelectedDuck(duckSpecies.find((duck) => duck.id === value) || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una especie" />
              </SelectTrigger>
              <SelectContent>
                {duckSpecies.map((duck) => (
                  <SelectItem key={duck.id} value={duck.id}>
                    {duck.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedDuck && (
              <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative w-24 h-24 overflow-hidden rounded-lg bg-amber-100">
                    <Image
                      src={selectedDuck.image || "/placeholder.svg"}
                      alt={selectedDuck.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{selectedDuck.name}</h3>
                    <p className="text-sm italic text-muted-foreground">{selectedDuck.scientificName}</p>
                    <p className="text-sm mt-2">{selectedDuck.description}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              Selección de Hábitat
            </CardTitle>
            <CardDescription>Elige el entorno donde vivirá el pato</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              onValueChange={(value) => setSelectedHabitat(habitats.find((habitat) => habitat.id === value) || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un hábitat" />
              </SelectTrigger>
              <SelectContent>
                {habitats.map((habitat) => (
                  <SelectItem key={habitat.id} value={habitat.id}>
                    {habitat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedHabitat && (
              <div className="mt-4">
                <div className="relative h-32 w-full overflow-hidden rounded-lg">
                  <Image
                    src={selectedHabitat.image || "/placeholder.svg"}
                    alt={selectedHabitat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm mt-2">{selectedHabitat.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-red-500" />
              Condiciones Ambientales
            </CardTitle>
            <CardDescription>Configura las condiciones del entorno</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Estado del Agua</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={waterState === "fria" ? "default" : "outline"}
                  onClick={() => setWaterState("fria")}
                  className={waterState === "fria" ? "bg-blue-500 hover:bg-blue-600" : ""}
                >
                  Fría
                </Button>
                <Button
                  variant={waterState === "templada" ? "default" : "outline"}
                  onClick={() => setWaterState("templada")}
                  className={waterState === "templada" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                >
                  Templada
                </Button>
                <Button
                  variant={waterState === "caliente" ? "default" : "outline"}
                  onClick={() => setWaterState("caliente")}
                  className={waterState === "caliente" ? "bg-red-500 hover:bg-red-600" : ""}
                >
                  Caliente
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Estación del Año
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={season === "verano" ? "default" : "outline"}
                  onClick={() => setSeason("verano")}
                  className={season === "verano" ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                >
                  Verano
                </Button>
                <Button
                  variant={season === "otono" ? "default" : "outline"}
                  onClick={() => setSeason("otono")}
                  className={season === "otono" ? "bg-orange-500 hover:bg-orange-600" : ""}
                >
                  Otoño
                </Button>
                <Button
                  variant={season === "invierno" ? "default" : "outline"}
                  onClick={() => setSeason("invierno")}
                  className={season === "invierno" ? "bg-blue-500 hover:bg-blue-600" : ""}
                >
                  Invierno
                </Button>
                <Button
                  variant={season === "primavera" ? "default" : "outline"}
                  onClick={() => setSeason("primavera")}
                  className={season === "primavera" ? "bg-green-500 hover:bg-green-600" : ""}
                >
                  Primavera
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel de simulación */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex justify-between">
              <span>Simulación de Comportamiento</span>
              <Button variant="ghost" size="icon" onClick={() => setIsSoundMuted(!isSoundMuted)}>
                {isSoundMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </CardTitle>
            <CardDescription>Observa cómo el pato reacciona a las condiciones seleccionadas</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow relative">
            {!selectedDuck || !selectedHabitat ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Selecciona una especie de pato y un hábitat para comenzar la simulación
                </p>
              </div>
            ) : !isSimulating ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="relative w-40 h-40 mb-4">
                  <Image
                    src={selectedDuck.image || "/placeholder.svg"}
                    alt={selectedDuck.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-medium">{selectedDuck.name}</h3>
                  <p className="text-sm">
                    En {selectedHabitat.name}, agua {waterState}, {season}
                  </p>
                  <Button onClick={startSimulation} className="mt-4 bg-amber-600 hover:bg-amber-700">
                    <Play className="mr-2 h-4 w-4" /> Iniciar Simulación
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col">
                <div className="flex-grow relative bg-gradient-to-b from-blue-100 to-blue-200 rounded-lg overflow-hidden">
                  {/* Fondo del hábitat */}
                  <div className="absolute inset-0">
                    <Image
                      src={selectedHabitat.image || "/placeholder.svg"}
                      alt={selectedHabitat.name}
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>

                  {/* Animación del pato */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-40 h-40 animate-bounce">
                      <Image
                        src={selectedDuck.image || "/placeholder.svg"}
                        alt={selectedDuck.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Información de comportamiento */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-center">
                    <p>{currentBehavior}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-center space-x-2">
                  <Button variant="outline" size="sm" onClick={resetSimulation}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Reiniciar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="w-full space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Comportamiento de Vuelo</h4>
                  <Select
                    value={flyBehavior || undefined}
                    onValueChange={(value) => setFlyBehavior(value as FlyBehavior)}
                    disabled={!selectedDuck}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona comportamiento" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(flyBehaviors).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Comportamiento de Sonido</h4>
                  <Select
                    value={quackBehavior || undefined}
                    onValueChange={(value) => setQuackBehavior(value as QuackBehavior)}
                    disabled={!selectedDuck}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona comportamiento" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(quackBehaviors).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={saveSimulation}>
                        <Save className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Guardar simulación</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={shareSimulation}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Compartir simulación</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={downloadSummary}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Descargar resumen</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información Adicional</CardTitle>
            <CardDescription>Detalles sobre el comportamiento y hábitat</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="comportamiento">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="comportamiento">Comportamiento</TabsTrigger>
                <TabsTrigger value="habitat">Hábitat</TabsTrigger>
                <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
              </TabsList>
              <TabsContent value="comportamiento" className="p-4">
                {selectedDuck ? (
                  <div className="space-y-4">
                    <h3 className="font-medium">Comportamientos de {selectedDuck.name}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium">Vuelo</h4>
                        <p className="text-sm text-muted-foreground">
                          {flyBehavior ? flyBehaviors[flyBehavior] : "No seleccionado"}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Sonido</h4>
                        <p className="text-sm text-muted-foreground">
                          {quackBehavior ? quackBehaviors[quackBehavior] : "No seleccionado"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Adaptación</h4>
                      <p className="text-sm text-muted-foreground">
                        Esta especie se adapta mejor a aguas{" "}
                        {waterState === "fria" ? "frías" : waterState === "caliente" ? "calientes" : "templadas"}y
                        prefiere la estación de {season}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Selecciona una especie para ver su comportamiento</p>
                )}
              </TabsContent>
              <TabsContent value="habitat" className="p-4">
                {selectedHabitat ? (
                  <div className="space-y-4">
                    <h3 className="font-medium">{selectedHabitat.name}</h3>
                    <p>{selectedHabitat.description}</p>
                    <div>
                      <h4 className="text-sm font-medium">Características</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        <li>Temperatura del agua: {waterState}</li>
                        <li>Estación actual: {season}</li>
                        <li>
                          Vegetación:{" "}
                          {["humedal", "pantano", "cienaga"].includes(selectedHabitat.id) ? "Abundante" : "Moderada"}
                        </li>
                        <li>Profundidad: {["lago", "rio"].includes(selectedHabitat.id) ? "Alta" : "Baja a media"}</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Selecciona un hábitat para ver sus detalles</p>
                )}
              </TabsContent>
              <TabsContent value="estadisticas" className="p-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Estadísticas de Simulación</h3>
                  {simulationHistory.length > 0 ? (
                    <div>
                      <p className="text-sm">Has realizado {simulationHistory.length} simulaciones</p>
                      <div className="mt-4">
                        <h4 className="text-sm font-medium">Últimas simulaciones:</h4>
                        <ul className="mt-2 space-y-2">
                          {simulationHistory.slice(-3).map((sim, index) => (
                            <li key={index} className="text-sm p-2 bg-muted rounded-md">
                              <span className="font-medium">{sim.duck}</span> en {sim.habitat}, agua {sim.water},{" "}
                              {sim.season}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Aún no has realizado simulaciones</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sugerencias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDuck && (
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    const randomHabitat = habitats[Math.floor(Math.random() * habitats.length)]
                    setSelectedHabitat(randomHabitat)
                  }}
                >
                  <Info className="mr-2 h-4 w-4" />
                  ¿Probar este pato en otro hábitat?
                </Button>
              )}

              {selectedHabitat && (
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    const seasons: Season[] = ["verano", "otono", "invierno", "primavera"]
                    const randomSeason = seasons[Math.floor(Math.random() * seasons.length)]
                    setSeason(randomSeason)
                  }}
                >
                  <Info className="mr-2 h-4 w-4" />
                  ¿Ver cómo reacciona en otra estación?
                </Button>
              )}

              {selectedDuck && (
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => {
                    const randomDuck = duckSpecies.filter((d) => d.id !== selectedDuck.id)[
                      Math.floor(Math.random() * (duckSpecies.length - 1))
                    ]
                    setSelectedDuck(randomDuck)
                  }}
                >
                  <Info className="mr-2 h-4 w-4" />
                  Comparar con otro pato
                </Button>
              )}

              <Button
                variant="outline"
                className="justify-start"
                onClick={() => {
                  setWaterState(waterState === "fria" ? "caliente" : "fria")
                }}
              >
                <Info className="mr-2 h-4 w-4" />
                Cambiar temperatura del agua
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

