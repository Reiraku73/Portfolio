import type { IconType } from 'react-icons'
import { MdPets } from 'react-icons/md'
import {
  SiExpo, SiExpress, SiMongodb, SiNextdotjs, SiNodedotjs, SiPostgresql,
  SiReact, SiSupabase, SiTypescript, SiVite,
} from 'react-icons/si'

// Technology logos come from Simple Icons (react-icons/si). Zustand has none,
// so it uses Material's paw (its mascot is a bear).
export const STACK: { name: string; Icon: IconType; bg: string; acc: string }[] = [
  { name: 'React Native', Icon: SiReact,      bg: '#0F1924', acc: '#61DAFB' },
  { name: 'Expo',         Icon: SiExpo,       bg: '#111111', acc: '#DDDDDD' },
  { name: 'TypeScript',   Icon: SiTypescript, bg: '#0F1C2E', acc: '#3178C6' },
  { name: 'React',        Icon: SiReact,      bg: '#0B1A20', acc: '#58C4DC' },
  { name: 'Next.js',      Icon: SiNextdotjs,  bg: '#0A0A0A', acc: '#EEEEEE' },
  { name: 'Vite',         Icon: SiVite,       bg: '#160A20', acc: '#BD34FE' },
  { name: 'Zustand',      Icon: MdPets,       bg: '#1A0B00', acc: '#F97316' },
  { name: 'Node.js',      Icon: SiNodedotjs,  bg: '#061206', acc: '#68A063' },
  { name: 'Express',      Icon: SiExpress,    bg: '#141414', acc: '#AAAAAA' },
  { name: 'Supabase',     Icon: SiSupabase,   bg: '#061A0F', acc: '#3ECF8E' },
  { name: 'PostgreSQL',   Icon: SiPostgresql, bg: '#051020', acc: '#4A90E2' },
  { name: 'MongoDB',      Icon: SiMongodb,    bg: '#071A0B', acc: '#47A248' },
]

export const HERO_CHIPS = ['React Native', 'TypeScript', 'React', 'Node.js', 'Supabase', 'MongoDB']
