// src/hooks/useTasks.ts
import { useTaskStore } from '../store/taskstore'

export const useTasks = () => {
  const tasks = useTaskStore((s) => s.tasks)
  const addTask = useTaskStore((s) => s.addTask)
  const updateTask = useTaskStore((s) => s.updateTask)
  const moveTask = useTaskStore((s) => s.moveTask)
  const assignToSprint = useTaskStore((s) => s.assignToSprint)
  const removeTask = useTaskStore((s) => s.removeTask)

  return { tasks, addTask, updateTask, moveTask, assignToSprint, removeTask }
}
