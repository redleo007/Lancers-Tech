// frontend/src/store/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types'

type AuthState = {
  user: User | null
  login: (u: User) => void
  logout: () => void
  updateProfile: (patch: Partial<User>) => void
  reset: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (u) => set({ user: u }),
      logout: () => set({ user: null }),
      updateProfile: (patch) => set((s) => ({ user: s.user ? { ...s.user, ...patch } : s.user })),
      reset: () => set({ user: null }),
    }),
    { name: 'auth-storage' }
  )
)
