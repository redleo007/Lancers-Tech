// src/store/backlogStore.ts
import { create } from 'zustand'
import { BacklogItem } from '../types'

type BacklogState = {
  items: BacklogItem[]
  addItem: (i: BacklogItem) => void
  updateItem: (id: string, patch: Partial<BacklogItem>) => void
  removeItem: (id: string) => void
  prioritize: (id: string, priority: number) => void
}

export const useBacklogStore = create<BacklogState>((set) => ({
  items: [
    { id: 'b1', title: 'User auth', description: 'Login, register', priority: 1, projectId: 'p1' },
  ],
  addItem: (i) => set((s) => ({ items: [...s.items, i] })),
  updateItem: (id, patch) => set((s) => ({ items: s.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) })),
  removeItem: (id) => set((s) => ({ items: s.items.filter((it) => it.id !== id) })),
  prioritize: (id, priority) => set((s) => ({ items: s.items.map((it) => (it.id === id ? { ...it, priority } : it)) })),
}))
