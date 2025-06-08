import { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { Screen, Text, Button } from "@/components"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "@/navigators/AuthNavigator"
import { useAppTheme } from "@/utils/useAppTheme"

interface AuthChoiceScreenProps extends NativeStackScreenProps<AuthStackParamList, "AuthChoice"> {}

export const AuthChoiceScreen: FC<AuthChoiceScreenProps> = observer(function AuthChoiceScreen({
  navigation,
}) {
  const { themed } = useAppTheme()

  return (
    <Screen style={$root} preset="fixed">
      <Text text="Welcome" preset="heading" style={themed($title)} />

      <Button
        text="Login"
        preset="default"
        style={themed($button)}
        onPress={() => navigation.navigate("Login")}
      />

      <Button
        text="Register"
        preset="reversed"
        style={themed($button)}
        onPress={() => navigation.navigate("Register")}
      />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  padding: 20,
  justifyContent: "center",
}

const $title: TextStyle = {
  marginBottom: 40,
  textAlign: "center",
}

const $button: ViewStyle = {
  marginVertical: 10,
}
