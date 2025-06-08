import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import {
  saveSecureData,
  removeSecureData,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  getSecureData,
} from "@/utils/validation"

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    isAuthenticated: types.optional(types.boolean, false),
    authToken: types.maybe(types.string),
    userId: types.maybe(types.string),
    email: types.maybe(types.string),
    isLoading: types.optional(types.boolean, false),
    error: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    setAuthToken(token: string | undefined) {
      store.authToken = token
      store.isAuthenticated = !!token
      if (token) {
        saveSecureData("authToken", token)
        saveSecureData("isAuthenticated", "true")
      } else {
        removeSecureData("authToken")
        removeSecureData("isAuthenticated")
      }
    },
    setUserId(id: string | undefined) {
      store.userId = id
      if (id) {
        saveSecureData("userId", id)
      } else {
        removeSecureData("userId")
      }
    },
    setEmail(email: string | undefined) {
      store.email = email
      if (email) {
        saveSecureData("email", email)
      } else {
        removeSecureData("email")
      }
    },
    setError(error: string | undefined) {
      store.error = error
    },
    setLoading(loading: boolean) {
      store.isLoading = loading
    },
    async restoreAuthState() {
      try {
        const token = await getSecureData("authToken")
        const userId = await getSecureData("userId")
        const email = await getSecureData("email")
        const isAuthenticated = await getSecureData("isAuthenticated")

        if (token && isAuthenticated === "true") {
          store.setAuthToken(token)
          store.setUserId(userId || undefined)
          store.setEmail(email || undefined)
          return true
        }
        return false
      } catch (error) {
        console.log("Error restoring auth state:", error)
        return false
      }
    },
    async login(email: string, password: string) {
      try {
        store.setLoading(true)
        store.setError(undefined)

        if (!validateEmail(email)) {
          store.setError("Invalid email format")
          return false
        }

        if (!validatePassword(password)) {
          store.setError(
            "Password must be at least 8 characters long and contain both letters and numbers",
          )
          return false
        }

        // TODO: Здесь будет реальный API запрос
        // Имитация успешного логина
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("login")

        const mockToken = "mock-token-" + Date.now()
        const mockUserId = "user-" + Date.now()

        store.setAuthToken(mockToken)
        store.setUserId(mockUserId)
        store.setEmail(email)
        store.isAuthenticated = true
        saveSecureData("isAuthenticated", "true")

        return true
      } catch (error) {
        store.setError(error instanceof Error ? error.message : "An error occurred during login")
        return false
      } finally {
        store.setLoading(false)
      }
    },
    async register(email: string, password: string, confirmPassword: string) {
      try {
        store.setLoading(true)
        store.setError(undefined)

        if (!validateEmail(email)) {
          store.setError("Invalid email format")
          return false
        }

        if (!validatePassword(password)) {
          store.setError(
            "Password must be at least 8 characters long and contain both letters and numbers",
          )
          return false
        }

        if (!validatePasswordMatch(password, confirmPassword)) {
          store.setError("Passwords do not match")
          return false
        }

        // TODO: Здесь будет реальный API запрос
        // Имитация успешной регистрации
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockToken = "mock-token-" + Date.now()
        const mockUserId = "user-" + Date.now()

        store.setAuthToken(mockToken)
        store.setUserId(mockUserId)
        store.setEmail(email)

        return true
      } catch (error) {
        store.setError(
          error instanceof Error ? error.message : "An error occurred during registration",
        )
        return false
      } finally {
        store.setLoading(false)
      }
    },
    logout() {
      store.authToken = undefined
      store.userId = undefined
      store.email = undefined
      store.isAuthenticated = false
      store.error = undefined

      removeSecureData("authToken")
      removeSecureData("userId")
      removeSecureData("email")
      removeSecureData("isAuthenticated")
    },
  }))

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStoreModel> {}
