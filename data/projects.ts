// Language-independent project data. Texts (title, description, case study,
// screenshot labels) live in dictionaries/<lang>.json under projects.<id>.
// To add screenshots: put the files in public/screenshots/, list their paths
// in `screenshots` and add one label per image, in the same order, to
// projects.<id>.screens in both dictionaries. An empty list shows the frame
// with a "screenshots coming soon" message.

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
    screenshots: [],
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
    screenshots: [],
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
