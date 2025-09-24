// frontend/src/types/index.ts
export type Project = {
  id: string
  name: string
  description?: string
  status?: 'Planned' | 'In Progress' | 'Completed'
}

export type TaskStatus = 'todo' | 'inprogress' | 'done'

export type Task = {
  id: string
  title: string
  description?: string
  status: TaskStatus
  projectId?: string | null
  sprintId?: string | null
  estimate?: number
  assigneeId?: string | null
}

export type Sprint = {
  id: string
  name: string
  startDate?: string
  endDate?: string
  goal?: string
  taskIds: string[]
  status?: 'Planned' | 'Active' | 'Completed'
}

export type BacklogItem = {
  id: string
  title: string
  description?: string
  priority?: number
  projectId?: string | null
}

export type User = {
  id: string
  name: string
  email: string
}
