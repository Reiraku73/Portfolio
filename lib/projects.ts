import type { Platform, Project } from '../data/projects'

const ALL_PLATFORMS: Platform[] = ['web', 'mobile']

// The platforms a project has, with its primary one first (that's the tab the
// showcase opens on).
export function orderedPlatforms(project: Pick<Project, 'primary' | 'platforms'>): Platform[] {
  const present = ALL_PLATFORMS.filter((platform) => project.platforms[platform])
  return [project.primary, ...present.filter((platform) => platform !== project.primary)]
    .filter((platform) => project.platforms[platform])
}
