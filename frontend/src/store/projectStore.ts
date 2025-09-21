import { create }from 'zustand'
import { Project } from '../types'


type ProjectState = {
projects: Project[]
addProject: (p: Project) => void
}


const useProjectStore = create<ProjectState>((set) => ({
projects: [
{ id: 'p1', name: 'Alpha', description: 'First project' }
],
addProject: (p) => set((s) => ({ projects: [p, ...s.projects] }))
}))


export default useProjectStore