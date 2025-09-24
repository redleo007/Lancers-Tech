import { useAuthStore } from '../store/authStore'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const login = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)
  const updateProfile = useAuthStore((s) => s.updateProfile)
  return { user, login, logout, updateProfile }
}
