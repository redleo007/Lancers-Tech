import { create } from "zustand"

interface Project {
  id: string
  name: string
  status: string
}

interface ProjectState {
  [x: string]: any
  projects: Project[]
  addProject: (project: Project) => void
  removeProject: (id: string) => void
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  removeProject: (id) =>
    set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
}))
