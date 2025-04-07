"use client"

import { useState } from "react"
import {
  ArrowUpDown,
  BarChart3,
  Bird,
  ChevronDown,
  Database,
  File,
  FileEdit,
  FileText,
  Home,
  Leaf,
  Lock,
  Mountain,
  Play,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sliders,
  ShowerHeadIcon as Swimmer,
  Type,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Dashboard sections
const sections = [
  { id: "dashboard", name: "Dashboard", icon: Home },
  { id: "species", name: "Especies de Patos", icon: Bird },
  { id: "behaviors", name: "Comportamientos", icon: Play },
  { id: "habitats", name: "Hábitats", icon: Mountain },
  { id: "foods", name: "Alimentos", icon: Leaf },
  { id: "users", name: "Usuarios", icon: Users },
  { id: "stats", name: "Estadísticas", icon: BarChart3 },
  { id: "content", name: "Contenidos", icon: FileText },
  { id: "access", name: "Control de Accesos", icon: Lock },
]

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/40">
        <Sidebar>
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2 font-semibold">
              <Swimmer className="h-6 w-6" />
              <span>Admin Panel</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Gestión</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sections.map((section) => (
                    <SidebarMenuItem key={section.id}>
                      <SidebarMenuButton
                        isActive={activeSection === section.id}
                        onClick={() => setActiveSection(section.id)}
                      >
                        <section.icon className="h-4 w-4" />
                        <span>{section.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Sistema</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Settings className="h-4 w-4" />
                      <span>Configuración</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-muted-foreground">admin@example.com</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center gap-4 md:gap-8">
              <form className="flex-1 md:max-w-xs">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar..." className="pl-8 md:w-full lg:w-[320px]" />
                </div>
              </form>
              <div className="ml-auto flex items-center gap-4">
                <Button variant="outline" size="sm">
                  Ayuda
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">
            {activeSection === "dashboard" && <DashboardSection />}
            {activeSection === "species" && <SpeciesSection />}
            {activeSection === "behaviors" && <BehaviorsSection />}
            {activeSection === "habitats" && <HabitatsSection />}
            {activeSection === "foods" && <FoodsSection />}
            {activeSection === "users" && <UsersSection />}
            {activeSection === "stats" && <StatsSection />}
            {activeSection === "content" && <ContentSection />}
            {activeSection === "access" && <AccessSection />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function DashboardSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Principal</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Usuarios registrados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,274</div>
            <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Simulaciones hechas</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,582</div>
            <p className="text-xs text-muted-foreground">+8% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Especies activas</CardTitle>
            <Bird className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+2 nuevas especies</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Usuarios activos</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">649</div>
            <p className="text-xs text-muted-foreground">+4% desde el mes pasado</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Actividad reciente</CardTitle>
            <CardDescription>Resumen de las últimas simulaciones y acciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Juan Díaz</p>
                  <p className="text-sm text-muted-foreground">
                    Simuló comportamiento de Pato Mandarín en hábitat de río
                  </p>
                </div>
                <div className="ml-auto font-medium">Hace 5 min</div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                  <AvatarFallback>ML</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">María López</p>
                  <p className="text-sm text-muted-foreground">Creó nuevo tipo de comportamiento para Pato Criollo</p>
                </div>
                <div className="ml-auto font-medium">Hace 15 min</div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                  <AvatarFallback>CP</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Carlos Pérez</p>
                  <p className="text-sm text-muted-foreground">Modificó hábitat de laguna con nuevas características</p>
                </div>
                <div className="ml-auto font-medium">Hace 45 min</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Especies más populares</CardTitle>
            <CardDescription>Top 5 especies más vistas este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium">Pato Mandarín</span>
                  <span className="ml-auto">89%</span>
                </div>
                <Progress value={89} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium">Pato Real</span>
                  <span className="ml-auto">76%</span>
                </div>
                <Progress value={76} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium">Pato Criollo</span>
                  <span className="ml-auto">65%</span>
                </div>
                <Progress value={65} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium">Pato Silbón</span>
                  <span className="ml-auto">52%</span>
                </div>
                <Progress value={52} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="font-medium">Pato Mallard</span>
                  <span className="ml-auto">45%</span>
                </div>
                <Progress value={45} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SpeciesSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Especies de Patos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nueva Especie
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Plumaje</TableHead>
              <TableHead>Hábitat</TableHead>
              <TableHead>Comportamientos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Pato Mandarín" />
                  <AvatarFallback>PM</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Pato Mandarín</TableCell>
              <TableCell>Colorido</TableCell>
              <TableCell>
                <Badge variant="secondary">Lago</Badge>
                <Badge variant="secondary" className="ml-1">
                  Río
                </Badge>
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <FileEdit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Pato Real" />
                  <AvatarFallback>PR</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Pato Real</TableCell>
              <TableCell>Verde y marrón</TableCell>
              <TableCell>
                <Badge variant="secondary">Lago</Badge>
                <Badge variant="secondary" className="ml-1">
                  Ciénaga
                </Badge>
              </TableCell>
              <TableCell>4</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <FileEdit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Pato Criollo" />
                  <AvatarFallback>PC</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Pato Criollo</TableCell>
              <TableCell>Negro y blanco</TableCell>
              <TableCell>
                <Badge variant="secondary">Lago</Badge>
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <FileEdit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Pato Silbón" />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Pato Silbón</TableCell>
              <TableCell>Castaño y negro</TableCell>
              <TableCell>
                <Badge variant="secondary">Río</Badge>
                <Badge variant="secondary" className="ml-1">
                  Ciénaga
                </Badge>
              </TableCell>
              <TableCell>2</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <FileEdit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function BehaviorsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Comportamientos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Comportamiento
        </Button>
      </div>
      <Tabs defaultValue="flight">
        <TabsList>
          <TabsTrigger value="flight">Vuelo</TabsTrigger>
          <TabsTrigger value="sound">Sonido</TabsTrigger>
          <TabsTrigger value="swim">Nado</TabsTrigger>
          <TabsTrigger value="walk">Caminata</TabsTrigger>
        </TabsList>
        <TabsContent value="flight" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de vuelo</CardTitle>
              <CardDescription>Gestiona los patrones de vuelo de los patos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Especies asociadas</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Vuelo rápido</TableCell>
                    <TableCell>Aleteo rápido con alta elevación</TableCell>
                    <TableCell>12</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Vuelo en formación V</TableCell>
                    <TableCell>Formación aerodinámica grupal</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Planear</TableCell>
                    <TableCell>Vuelo de bajo consumo energético</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sound" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de sonido</CardTitle>
              <CardDescription>Gestiona las vocalizaciones de los patos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Especies asociadas</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Graznido fuerte</TableCell>
                    <TableCell>Sonido agudo y alto</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Silbido bajo</TableCell>
                    <TableCell>Sonido melódico y suave</TableCell>
                    <TableCell>9</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="swim" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de nado</CardTitle>
              <CardDescription>Gestiona los patrones de nado</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Especies asociadas</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Nado rápido</TableCell>
                    <TableCell>Propulsión veloz en superficie</TableCell>
                    <TableCell>14</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Buceo</TableCell>
                    <TableCell>Inmersión completa para alimentación</TableCell>
                    <TableCell>11</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="walk" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de caminata</CardTitle>
              <CardDescription>Gestiona los patrones de marcha</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Especies asociadas</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Balanceo</TableCell>
                    <TableCell>Marcha con balanceo lateral</TableCell>
                    <TableCell>21</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Carrera</TableCell>
                    <TableCell>Desplazamiento rápido en tierra</TableCell>
                    <TableCell>16</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function HabitatsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Hábitats</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Hábitat
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Lago</CardTitle>
            <CardDescription>Cuerpo de agua dulce de gran tamaño</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Temperatura del agua</h4>
                <p className="text-sm text-muted-foreground">Templada (15-25°C)</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Comportamientos asociados</h4>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge>Nado en superficie</Badge>
                  <Badge>Buceo poco profundo</Badge>
                  <Badge>Graznido territorial</Badge>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Especies presentes</h4>
                <p className="text-sm">23 especies</p>
              </div>
              <Button variant="outline" className="w-full">
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Río</CardTitle>
            <CardDescription>Corriente de agua dulce en movimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Temperatura del agua</h4>
                <p className="text-sm text-muted-foreground">Fría (5-15°C)</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Comportamientos asociados</h4>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge>Nado contra corriente</Badge>
                  <Badge>Pesca superficial</Badge>
                  <Badge>Vuelo bajo</Badge>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Especies presentes</h4>
                <p className="text-sm">17 especies</p>
              </div>
              <Button variant="outline" className="w-full">
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ciénaga</CardTitle>
            <CardDescription>Ecosistema de agua estancada y vegetación densa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Temperatura del agua</h4>
                <p className="text-sm text-muted-foreground">Caliente (20-30°C)</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Comportamientos asociados</h4>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Badge>Camuflaje</Badge>
                  <Badge>Alimentación de plantas</Badge>
                  <Badge>Nido en vegetación</Badge>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Especies presentes</h4>
                <p className="text-sm">12 especies</p>
              </div>
              <Button variant="outline" className="w-full">
                Editar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FoodsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Alimentos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Alimento
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Alimentos por origen</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Todos</DropdownMenuItem>
                  <DropdownMenuItem>Origen animal</DropdownMenuItem>
                  <DropdownMenuItem>Origen vegetal</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Especies compatibles</TableHead>
                  <TableHead>Hábitats</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Peces pequeños</TableCell>
                  <TableCell>
                    <Badge>Animal</Badge>
                  </TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Lago</Badge>
                    <Badge variant="secondary" className="ml-1">
                      Río
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Semillas acuáticas</TableCell>
                  <TableCell>
                    <Badge>Vegetal</Badge>
                  </TableCell>
                  <TableCell>28</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Lago</Badge>
                    <Badge variant="secondary" className="ml-1">
                      Ciénaga
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Insectos acuáticos</TableCell>
                  <TableCell>
                    <Badge>Animal</Badge>
                  </TableCell>
                  <TableCell>22</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Lago</Badge>
                    <Badge variant="secondary" className="ml-1">
                      Río
                    </Badge>
                    <Badge variant="secondary" className="ml-1">
                      Ciénaga
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Algas</TableCell>
                  <TableCell>
                    <Badge>Vegetal</Badge>
                  </TableCell>
                  <TableCell>19</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Lago</Badge>
                    <Badge variant="secondary" className="ml-1">
                      Ciénaga
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UsersSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <File className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Sliders className="mr-2 h-4 w-4" /> Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por plan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Todos</DropdownMenuItem>
              <DropdownMenuItem>Gratuito</DropdownMenuItem>
              <DropdownMenuItem>Premium</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Avatar</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">Juan Díaz</TableCell>
                <TableCell>juandiaz@example.com</TableCell>
                <TableCell>
                  <Badge>Premium</Badge>
                </TableCell>
                <TableCell>10/04/2023</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Activo
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <FileEdit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                    <AvatarFallback>ML</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">María López</TableCell>
                <TableCell>marialopez@example.com</TableCell>
                <TableCell>
                  <Badge>Premium</Badge>
                </TableCell>
                <TableCell>22/05/2023</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Activo
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <FileEdit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                    <AvatarFallback>CP</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">Carlos Pérez</TableCell>
                <TableCell>carlosperez@example.com</TableCell>
                <TableCell>
                  <Badge variant="secondary">Gratuito</Badge>
                </TableCell>
                <TableCell>15/06/2023</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Activo
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <FileEdit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">Ana Rodríguez</TableCell>
                <TableCell>anarodriguez@example.com</TableCell>
                <TableCell>
                  <Badge variant="secondary">Gratuito</Badge>
                </TableCell>
                <TableCell>30/07/2023</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Inactivo
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <FileEdit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function StatsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Estadísticas y Reportes</h1>
        <div className="flex gap-2">
          <Button>
            <File className="mr-2 h-4 w-4" /> Exportar informe
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Especies más vistas</CardTitle>
            <CardDescription>Top 5 especies con más visualizaciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
              <BarChart3 className="h-16 w-16 text-muted-foreground/80" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Simulaciones más ejecutadas</CardTitle>
            <CardDescription>Top 5 simulaciones populares</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
              <BarChart3 className="h-16 w-16 text-muted-foreground/80" />
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Comportamientos más frecuentes</CardTitle>
            <CardDescription>Distribución de comportamientos por frecuencia de uso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
              <BarChart3 className="h-16 w-16 text-muted-foreground/80" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ContentSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Contenidos</h1>
      </div>
      <Tabs defaultValue="texts">
        <TabsList>
          <TabsTrigger value="texts">Textos educativos</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Formulario de contacto</TabsTrigger>
        </TabsList>
        <TabsContent value="texts" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Textos educativos</CardTitle>
              <CardDescription>Editar contenido educativo sobre patos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Sección</TableHead>
                    <TableHead>Última actualización</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Anatomía del pato</TableCell>
                    <TableCell>Educación básica</TableCell>
                    <TableCell>12/03/2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Migración de patos</TableCell>
                    <TableCell>Comportamiento</TableCell>
                    <TableCell>05/04/2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Reproducción</TableCell>
                    <TableCell>Biología</TableCell>
                    <TableCell>22/05/2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="faqs" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preguntas frecuentes</CardTitle>
              <CardDescription>Gestionar FAQs de la aplicación</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pregunta</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Última actualización</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">¿Cómo empezar una simulación?</TableCell>
                    <TableCell>Uso de la app</TableCell>
                    <TableCell>18/02/2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">¿Qué diferencia hay entre planes?</TableCell>
                    <TableCell>Planes y pagos</TableCell>
                    <TableCell>03/03/2023</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Formulario de contacto</CardTitle>
              <CardDescription>Configuración de campos y notificaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Campos activos</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Nombre</Badge>
                    <Badge variant="outline">Email</Badge>
                    <Badge variant="outline">Asunto</Badge>
                    <Badge variant="outline">Mensaje</Badge>
                    <Badge variant="outline">Teléfono</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Destinatarios de notificaciones</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>admin@example.com</Badge>
                    <Badge>soporte@example.com</Badge>
                  </div>
                </div>
                <Button variant="outline">Configurar formulario</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AccessSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Control de Accesos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Usuario
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Roles de usuario</CardTitle>
            <CardDescription>Gestionar permisos y accesos</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rol</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Usuarios</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Administrador</TableCell>
                  <TableCell>Acceso completo al sistema</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Editor</TableCell>
                  <TableCell>Puede crear y editar contenido</TableCell>
                  <TableCell>7</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lector</TableCell>
                  <TableCell>Solo puede ver información</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <FileEdit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Logs de actividad</CardTitle>
            <CardDescription>Últimas acciones en el panel de administración</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary/10 p-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Admin inició sesión</p>
                  <p className="text-xs text-muted-foreground">IP: 192.168.1.1 • Firefox • Hace 5 minutos</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary/10 p-2">
                  <Type className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Editor modificó contenido educativo</p>
                  <p className="text-xs text-muted-foreground">IP: 192.168.1.5 • Chrome • Hace 15 minutos</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary/10 p-2">
                  <Bird className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Admin creó nueva especie de pato</p>
                  <p className="text-xs text-muted-foreground">IP: 192.168.1.1 • Firefox • Hace 30 minutos</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Editor modificó permisos de usuario</p>
                  <p className="text-xs text-muted-foreground">IP: 192.168.1.5 • Chrome • Hace 45 minutos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

