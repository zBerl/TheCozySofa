import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Script from 'next/script'
import Logo from '../components/Logo'
import { Analytics } from '@vercel/analytics/react'
import Navigation from './components/Navigation'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://thecozysofa.com'),
  title: 'The Cozy Sofa - Your Guide to Comfortable Living',
  description: 'Discover the perfect sofa for your home. Expert reviews, buying guides, and inspiration for creating your ideal living space.',
  keywords: 'sofa, furniture, home decor, living room, comfort, interior design',
  authors: [{ name: 'The Cozy Sofa Team' }],
  creator: 'The Cozy Sofa',
  publisher: 'The Cozy Sofa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thecozysofa.com',
    siteName: 'The Cozy Sofa',
    title: 'The Cozy Sofa - Your Guide to Comfortable Living',
    description: 'Discover the perfect sofa for your home. Expert reviews, buying guides, and inspiration for creating your ideal living space.',
    images: [
      {
        url: 'https://thecozysofa.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Cozy Sofa - Your Guide to Comfortable Living'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Cozy Sofa - Your Guide to Comfortable Living',
    description: 'Discover the perfect sofa for your home. Expert reviews, buying guides, and inspiration for creating your ideal living space.',
    images: ['https://thecozysofa.com/og-image.jpg'],
    creator: '@thecozysofa',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {isProduction && (
          <>
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
              strategy="afterInteractive"
              crossOrigin="anonymous"
            />
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${playfair.className}`} role="main">
          {children}
        </main>
        <footer className="bg-gray-50 border-t" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <Link href="/" className="block">
                  <Logo variant="footer" />
                </Link>
                <p className="text-gray-600 text-sm">
                  Your guide to comfortable living and stylish home decor.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                  Navigation
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/products" className="text-gray-600 hover:text-gray-900">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-gray-600 hover:text-gray-900">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                  Legal
                </h3>
                <ul className="space-y-4">
                  <li>
                    <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-400 text-sm text-center">
                © {new Date().getFullYear()} The Cozy Sofa. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        {isProduction && <Analytics />}
      </body>
    </html>
  )
} 