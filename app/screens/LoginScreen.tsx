import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Header, Screen } from "@/components"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "@/navigators/AuthNavigator"
import { LoginForm } from "@/components/forms/LoginForm"
import { useAppTheme } from "@/utils/useAppTheme"
import { CommonActions } from "@react-navigation/native"
import { ThemedStyle } from "../theme"
import { useStores } from "@/models"

interface LoginScreenProps extends NativeStackScreenProps<AuthStackParamList, "Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ navigation }) {
  const { themed } = useAppTheme()
  const { authStore } = useStores()

  const handleLoginSuccess = async (email: string, password: string) => {
    try {
      const success = await authStore.login(email, password)

      if (success) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Base" }],
          }),
        )
      }
    } catch (error) {
      // Ошибка уже обработана в AuthStore
      console.log("Login failed:", error)
    }
  }

  return (
    <Screen style={themed($root)} preset="scroll">
      <Header
        title="Login"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        containerStyle={themed($header)}
      />
      <LoginForm onSuccess={handleLoginSuccess} />
    </Screen>
  )
})

const $root: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.md,
})
