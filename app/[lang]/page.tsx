import { notFound } from 'next/navigation'
import { PROJECTS } from '@/data/projects'
import { hasLocale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Hero } from '@/components/Hero'
import { Nav } from '@/components/Nav'
import { Stack } from '@/components/Stack'
import { ProjectCarousel } from '@/components/projects/ProjectCarousel'
import { Divider, Section } from '@/components/ui/Section'

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const projects = PROJECTS.map((p) => ({ ...p, ...dict.projects[p.id] }))

  return (
    <main className="min-h-screen bg-bg text-ink">
      <Nav lang={lang} dict={dict.nav} />
      <Hero dict={dict.hero} />
      <Divider />

      <Section id="projects" label={`01 / ${dict.nav.projects}`}>
        <ProjectCarousel projects={projects} labels={dict.projectsSection} />
      </Section>
      <Divider />

      <Stack label={`02 / ${dict.nav.stack}`} dict={dict.stack} />
      <Divider />

      <About label={`03 / ${dict.nav.about}`} dict={dict.about} />
      <Divider />

      <Contact label={`04 / ${dict.nav.contact}`} dict={dict.contact} />

      <footer className="flex flex-col items-center gap-2 border-t border-line p-5 text-center md:flex-row md:justify-between md:px-10 md:py-6">
        <span className="font-mono text-xs text-[#444]">© 2026 Mateo Orodaz</span>
        <span className="font-mono text-xs text-white/15">{dict.footer.builtWith}</span>
      </footer>
    </main>
  )
}
