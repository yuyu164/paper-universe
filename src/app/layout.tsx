import type { Metadata } from 'next'
import { Noto_Serif_SC, Noto_Sans_SC } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-serif',
  display: 'swap',
})

const notoSans = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '纸间万象 | 中国剪纸数字体验',
  description: '以中国剪纸为核心主题的沉浸式数字体验网站，通过视觉叙事与互动体验，带你走进剪纸的世界。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
