import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'

const cairo = Cairo({ 
  subsets: ['arabic'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Leaf Cafe | ليف كافيه - بحرة',
  description: 'تجربة القهوة المختصة في قلب بحرة',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>{children}</body>
    </html>
  )
}
