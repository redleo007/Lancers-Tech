// frontend/src/store/taskStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task, TaskStatus } from '../types'

type TaskState = {
  tasks: Task[]
  addTask: (t: Task) => void
  updateTask: (id: string, patch: Partial<Task>) => void
  moveTask: (id: string, status: TaskStatus) => void
  assignToSprint: (taskId: string, sprintId: string | null) => void
  removeTask: (id: string) => void
  reset: () => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [
        { id: 't1', title: 'Initial setup', description: 'Set up repo & CI', status: 'todo', projectId: 'p1', sprintId: null, estimate: 3 },
      ],
      addTask: (t) => set((s) => ({ tasks: [...s.tasks, t] })),
      updateTask: (id, patch) => set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)) })),
      moveTask: (id, status) => set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, status } : t)) })),
      assignToSprint: (taskId, sprintId) => set((s) => ({ tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, sprintId } : t)) })),
      removeTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      reset: () => set({ tasks: [] }),
    }),
    { name: 'tasks-storage' }
  )
)
