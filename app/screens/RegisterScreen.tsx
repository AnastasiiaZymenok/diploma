import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Header, Screen } from "@/components"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "@/navigators/AuthNavigator"
import { RegisterForm } from "@/components/forms/RegisterForm"
import { useAppTheme } from "@/utils/useAppTheme"
import { CommonActions } from "@react-navigation/native"
import { ThemedStyle } from "../theme"
import { useStores } from "../models"

interface RegisterScreenProps extends NativeStackScreenProps<AuthStackParamList, "Register"> {}

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen({
  navigation,
}) {
  const { themed } = useAppTheme()
  const { authStore } = useStores()

  const handleRegisterSuccess = () => {
    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: "Base" }],
    //   }),
    // )
  }

  return (
    <Screen style={themed($root)} preset="scroll">
      <Header
        title="Register"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        containerStyle={themed($header)}
      />
      <RegisterForm onSuccess={handleRegisterSuccess} style={themed($form)} />
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

const $form: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
})
