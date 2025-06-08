import { useStores } from "@/models"

export function useAuth() {
  const { authStore } = useStores()

  return {
    isAuthenticated: authStore.isAuthenticated,
    authToken: authStore.authToken,
    userId: authStore.userId,
    setAuthToken: authStore.setAuthToken,
    setUserId: authStore.setUserId,
    logout: authStore.logout,
  }
}
