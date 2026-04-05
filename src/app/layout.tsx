import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Miriam Benali | Portfolio Anti-Gravité',
  description: 'Portfolio professionnel de Miriam Benali - Innovation et technologies avant-gardistes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>

        {children}
      </body>
    </html>
  )
}
