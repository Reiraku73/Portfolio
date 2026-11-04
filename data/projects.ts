// Language-independent project data. Texts (title, description, case study,
// screenshot labels) live in dictionaries/<lang>.json under projects.<id>.
// Each project lists the platforms it has (web, mobile app or both); the
// showcase opens on `primary` and shows one tab per platform.
// To add screenshots: put the files in public/screenshots/, list their paths
// in the platform's `screenshots` and add one label per image, in the same
// order, to projects.<id>.screens.<platform> in both dictionaries. An empty
// list shows the frame with a "screenshots coming soon" message.

const EMAIL = 'mateo.orodaz4@gmail.com'
const repoRequest = (project: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(`Solicitud código ${project}`)}`

export type ProjectId = 'jergario' | 'tsundoku' | 'tsundenki'
export type LinkKind = 'video' | 'apk' | 'repo' | 'email'
// 'web' renders a browser frame, 'mobile' a phone frame.
export type Platform = 'web' | 'mobile'
// live: public; demo: downloadable demo build; dev: being built; planned: not started.
export type PlatformStatus = 'live' | 'demo' | 'dev' | 'planned'

export type PlatformInfo = {
  status: PlatformStatus
  screenshots: string[]
  // Shown in the browser frame's address bar (web only).
  url?: string
}

export type Project = {
  id: ProjectId
  primary: Platform
  platforms: Partial<Record<Platform, PlatformInfo>>
  links: { kind: LinkKind; href: string }[]
}

// Carousel order: Jergario first, it's the first one to launch.
export const PROJECTS: Project[] = [
  {
    id: 'jergario',
    primary: 'web',
    platforms: {
      // Not deployed yet: no public domain to show.
      web: { status: 'dev', url: 'localhost:5173', screenshots: [] },
      mobile: { status: 'planned', screenshots: [] },
    },
    links: [
      { kind: 'repo',  href: repoRequest('Jergario') },
      { kind: 'email', href: `mailto:${EMAIL}` },
    ],
  },
  {
    id: 'tsundoku',
    primary: 'mobile',
    platforms: {
      mobile: { status: 'demo', screenshots: [] },
      web: { status: 'dev', url: 'localhost:5173', screenshots: [] },
    },
    links: [
      { kind: 'video', href: 'https://youtu.be/MQcM05u0m4A' },
      { kind: 'apk',   href: 'https://github.com/Reiraku73/Tsundoku-showcase/releases/latest' },
      { kind: 'repo',  href: repoRequest('Tsundoku') },
      { kind: 'email', href: `mailto:${EMAIL}` },
    ],
  },
  {
    id: 'tsundenki',
    primary: 'web',
    platforms: {
      web: { status: 'dev', url: 'localhost:5173', screenshots: [] },
      mobile: { status: 'planned', screenshots: [] },
    },
    links: [
      { kind: 'repo',  href: repoRequest('Tsundenki') },
      { kind: 'email', href: `mailto:${EMAIL}` },
    ],
  },
]

export const CONTACT = {
  email: EMAIL,
  github: 'https://github.com/Reiraku73',
}
