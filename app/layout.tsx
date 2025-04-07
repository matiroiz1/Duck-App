import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Duck App',
  description: 'Created by E-Crafters',
  generator: 'E-Crafters',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
