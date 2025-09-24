// frontend/src/store/projectStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project } from '../types'

type ProjectState = {
  projects: Project[]
  addProject: (p: Project) => void
  updateProject: (id: string, patch: Partial<Project>) => void
  removeProject: (id: string) => void
  reset: () => void
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      projects: [
        { id: 'p1', name: 'Demo Project', description: 'Example project', status: 'In Progress' },
      ],
      addProject: (p) => set((s) => ({ projects: [...s.projects, p] })),
      updateProject: (id, patch) =>
        set((s) => ({ projects: s.projects.map((proj) => (proj.id === id ? { ...proj, ...patch } : proj)) })),
      removeProject: (id) => set((s) => ({ projects: s.projects.filter((proj) => proj.id !== id) })),
      reset: () => set({ projects: [] }),
    }),
    { name: 'projects-storage' }
  )
)
