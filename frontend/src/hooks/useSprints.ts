// src/hooks/useSprints.ts
import { useSprintStore } from '../store/sprintStore'

export const useSprints = () => {
  const sprints = useSprintStore((s) => s.sprints)
  const addSprint = useSprintStore((s) => s.addSprint)
  const updateSprint = useSprintStore((s) => s.updateSprint)
  const removeSprint = useSprintStore((s) => s.removeSprint)
  const addTaskToSprint = useSprintStore((s) => s.addTaskToSprint)
  const removeTaskFromSprint = useSprintStore((s) => s.removeTaskFromSprint)

  return { sprints, addSprint, updateSprint, removeSprint, addTaskToSprint, removeTaskFromSprint }
}
