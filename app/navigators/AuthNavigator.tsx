import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { useAppTheme } from "@/utils/useAppTheme"
import * as Screens from "@/screens"

export type AuthStackParamList = {
  AuthChoice: undefined
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthNavigator = observer(function AuthNavigator() {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="AuthChoice" component={Screens.AuthChoiceScreen} />
      <Stack.Screen name="Login" component={Screens.LoginScreen} />
      <Stack.Screen name="Register" component={Screens.RegisterScreen} />
    </Stack.Navigator>
  )
})
