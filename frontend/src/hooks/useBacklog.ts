// src/hooks/useBacklog.ts
import { useBacklogStore } from '../store/backlogStore'

export const useBacklog = () => {
  const items = useBacklogStore((s) => s.items)
  const addItem = useBacklogStore((s) => s.addItem)
  const updateItem = useBacklogStore((s) => s.updateItem)
  const removeItem = useBacklogStore((s) => s.removeItem)
  const prioritize = useBacklogStore((s) => s.prioritize)

  return { items, addItem, updateItem, removeItem, prioritize }
}
