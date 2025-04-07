import { Check, X } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Header Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Planes y Precios</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Elige el plan que mejor se adapte a tus necesidades. Ofrecemos una opción gratuita con acceso a
                  especies de patos argentinos y una opción premium con acceso completo a la aplicación.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold text-center">Comparación de Planes</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Características</TableHead>
                    <TableHead className="text-center">Gratuito</TableHead>
                    <TableHead className="text-center">Premium</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Acceso a especies de patos argentinos</TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 mx-auto text-primary" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 mx-auto text-primary" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Acceso a especies globales</TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 mx-auto text-destructive" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 mx-auto text-primary" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Simulación de comportamiento</TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 mx-auto text-destructive" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Check className="h-5 w-5 mx-auto text-primary" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Soporte</TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 mx-auto text-destructive" />
                    </TableCell>
                    <TableCell className="text-center">24/7 Prioritario</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Actualizaciones</TableCell>
                    <TableCell className="text-center">
                      <X className="h-5 w-5 mx-auto text-destructive" />
                    </TableCell>
                    <TableCell className="text-center">Mensuales</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold text-center">Detalles de Planes</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Free Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Gratuito</CardTitle>
                  <CardDescription>Acceso básico a patos argentinos</CardDescription>
                  <div className="mt-4 text-4xl font-bold">
                    €0<span className="text-sm font-normal text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Acceso a especies de patos argentinos</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Información básica de cada especie</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Galería de imágenes limitada</span>
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <X className="mr-2 h-4 w-4" />
                      <span>Sin simulación de comportamiento</span>
                    </li>
                    <li className="flex items-center text-muted-foreground">
                      <X className="mr-2 h-4 w-4" />
                      <span>Sin acceso a especies globales</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Comenzar Gratis
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="border-primary">
                <CardHeader className="bg-primary/10">
                  <div className="text-sm font-medium text-primary mb-2">Recomendado</div>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>Acceso completo a todas las funciones</CardDescription>
                  <div className="mt-4 text-4xl font-bold">
                    €29.99<span className="text-sm font-normal text-muted-foreground">/mes</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Acceso a todas las especies de patos (globales)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Simulación completa de comportamiento</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Información detallada de cada especie</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Soporte 24/7 prioritario</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Actualizaciones mensuales con nuevas especies</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="default">
                    Suscribirse
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  ¿Listo para explorar el mundo de los patos?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Elige entre nuestro plan gratuito para conocer los patos argentinos o nuestro plan premium para una
                  experiencia completa con simulación de comportamiento.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button variant="secondary" size="lg">
                  Ver Demostración
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contactar con Ventas
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold text-center">Preguntas Frecuentes</h2>
            <div className="mx-auto max-w-[800px]">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>¿Qué incluye exactamente el plan gratuito?</AccordionTrigger>
                  <AccordionContent>
                    El plan gratuito te da acceso a información básica sobre todas las especies de patos argentinos,
                    incluyendo imágenes, hábitat y características principales. Sin embargo, no incluye la simulación de
                    comportamiento ni acceso a especies de otras regiones del mundo.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>¿Qué métodos de pago aceptan?</AccordionTrigger>
                  <AccordionContent>
                    Aceptamos tarjetas de crédito (Visa, Mastercard, American Express), PayPal y transferencias
                    bancarias para planes anuales.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>¿Puedo cancelar mi suscripción en cualquier momento?</AccordionTrigger>
                  <AccordionContent>
                    Sí, puedes cancelar tu suscripción en cualquier momento. No hay contratos de permanencia. La
                    cancelación será efectiva al final del período de facturación actual.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>¿Ofrecen descuentos para organizaciones sin fines de lucro?</AccordionTrigger>
                  <AccordionContent>
                    Sí, ofrecemos descuentos especiales para organizaciones sin fines de lucro, instituciones educativas
                    y startups. Contacta con nuestro equipo de ventas para más información.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>¿Hay un período de prueba disponible?</AccordionTrigger>
                  <AccordionContent>
                    Ofrecemos un período de prueba gratuito de 14 días para los planes Freemium y Premium. No se
                    requiere tarjeta de crédito para comenzar la prueba.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
