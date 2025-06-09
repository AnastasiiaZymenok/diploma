import { MMKV } from "react-native-mmkv"

// Создаем отдельный экземпляр MMKV для хранения чувствительных данных
export const secureStorage = new MMKV({
  id: "secure-storage",
  encryptionKey: "your-encryption-key", // В продакшене используйте более безопасный ключ
})

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  // Минимум 8 символов, минимум 1 буква и 1 цифра
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return passwordRegex.test(password)
}

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword
}

export const saveSecureData = (key: string, value: string): void => {
  secureStorage.set(key, value)
}

export const getSecureData = (key: string): string | null => {
  return secureStorage.getString(key) ?? null
}

export const removeSecureData = (key: string): void => {
  secureStorage.delete(key)
}
