import { create }from 'zustand'
import { Task } from '../types'


type TaskState = {
tasks: Task[]
addTask: (t: Task) => void
moveTask: (id: string, status: Task['status']) => void
}


const useTaskStore = create<TaskState>((set) => ({
tasks: [
{ id: 't1', title: 'Set up repo', status: 'todo', projectId: 'p1' }
],
addTask: (t) => set((s) => ({ tasks: [t, ...s.tasks] })),
moveTask: (id, status) => set((s) => ({ tasks: s.tasks.map((t) => t.id === id ? { ...t, status } : t) }))
}))


export default useTaskStore