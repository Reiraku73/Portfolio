// Language-independent project data. Texts (title, description, case study,
// screenshot labels) live in dictionaries/<lang>.json under projects.<id>,
// in the same order as `screenshots`.

const EMAIL = 'mateo.orodaz4@gmail.com'
const repoRequest = (project: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(`Solicitud código ${project}`)}`

export type ProjectId = 'tsundoku' | 'jergario'
export type LinkKind = 'video' | 'apk' | 'repo' | 'email'

export type Project = {
  id: ProjectId
  // 'mobile' renders a phone frame, 'web' a browser frame.
  type: 'mobile' | 'web'
  screenshots: string[]
  // Shown in the browser frame's address bar (web projects only).
  url?: string
  links: { kind: LinkKind; href: string }[]
}

export const PROJECTS: Project[] = [
  {
    id: 'tsundoku',
    type: 'mobile',
    screenshots: [
      '/screenshots/MuestraApp1.png',
      '/screenshots/MuestraApp2.png',
      '/screenshots/MuestraApp3.png',
    ],
    links: [
      { kind: 'video', href: 'https://youtu.be/MQcM05u0m4A' },
      { kind: 'apk',   href: 'https://github.com/Reiraku73/Tsundoku-app/releases/latest' },
      { kind: 'repo',  href: repoRequest('Tsundoku') },
      { kind: 'email', href: `mailto:${EMAIL}` },
    ],
  },
  {
    id: 'jergario',
    type: 'web',
    // Not deployed yet: no public domain to show.
    url: 'localhost:5173',
    screenshots: [
      '/screenshots/PaginaPrincipalDU.png',
      '/screenshots/BuscadorDU.png',
      '/screenshots/AgregraDefinicionDU.png',
    ],
    links: [
      { kind: 'repo',  href: repoRequest('Jergario') },
      { kind: 'email', href: `mailto:${EMAIL}` },
    ],
  },
]

export const CONTACT = {
  email: EMAIL,
  github: 'https://github.com/Reiraku73',
}
