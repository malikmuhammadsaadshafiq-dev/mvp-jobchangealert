import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JobChangeAlert - Monitor LinkedIn Job Changes',
  description: 'Monitor LinkedIn for job changes to trigger timely sales outreach when new decision makers arrive',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}