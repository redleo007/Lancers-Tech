import { useProjectStore } from '../store/projectStore'

export function useProjects() {
  const projects = useProjectStore((s) => s.projects)
  const addProject = useProjectStore((s) => s.addProject)
  const updateProject = useProjectStore((s) => s.updateProject)
  const removeProject = useProjectStore((s) => s.removeProject)
  return { projects, addProject, updateProject, removeProject }
}
