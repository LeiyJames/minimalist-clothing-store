import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers/Providers'
import { CartButton } from '@/components/cart/CartButton'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/navigation/Navbar'
import { BackToTop } from '@/components/ui/BackToTop'
import '../styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Minimalist Clothing Store',
  description: 'Minimalism in Motion - Modern Fashion Experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <Providers>
          <Navbar />
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <BackToTop />
        </Providers>
      </body>
    </html>
  )
}