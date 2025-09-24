// frontend/src/store/sprintStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Sprint } from '../types'

type SprintState = {
  sprints: Sprint[]
  addSprint: (s: Sprint) => void
  updateSprint: (id: string, patch: Partial<Sprint>) => void
  removeSprint: (id: string) => void
  addTaskToSprint: (sprintId: string, taskId: string) => void
  removeTaskFromSprint: (sprintId: string, taskId: string) => void
  reset: () => void
}

export const useSprintStore = create<SprintState>()(
  persist(
    (set) => ({
      sprints: [
        { id: 's1', name: 'Sprint 1', taskIds: ['t1'], goal: 'Kickoff', status: 'Active' },
      ],
      addSprint: (s) => set((st) => ({ sprints: [...st.sprints, s] })),
      updateSprint: (id, patch) => set((st) => ({ sprints: st.sprints.map((s) => (s.id === id ? { ...s, ...patch } : s)) })),
      removeSprint: (id) => set((st) => ({ sprints: st.sprints.filter((s) => s.id !== id) })),
      addTaskToSprint: (sprintId, taskId) =>
        set((st) => ({ sprints: st.sprints.map((s) => (s.id === sprintId && !s.taskIds.includes(taskId) ? { ...s, taskIds: [...s.taskIds, taskId] } : s)) })),
      removeTaskFromSprint: (sprintId, taskId) =>
        set((st) => ({ sprints: st.sprints.map((s) => (s.id === sprintId ? { ...s, taskIds: s.taskIds.filter((id) => id !== taskId) } : s)) })),
      reset: () => set({ sprints: [] }),
    }),
    { name: 'sprints-storage' }
  )
)
