import { Anton, DM_Mono, DM_Sans } from 'next/font/google'

// Shared by app/[lang]/layout.tsx and app/global-not-found.tsx, which renders
// outside every layout and has to load the fonts itself.
const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const dmMono = DM_Mono({ weight: ['400', '500'], subsets: ['latin'], variable: '--font-dm-mono' })

// CSS variables read by the @theme in app/globals.css
export const fontVariables = `${anton.variable} ${dmSans.variable} ${dmMono.variable}`
