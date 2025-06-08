import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text, Button } from "@/components"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BaseStackParamList } from "@/navigators/BaseNavigator"
import { useStores } from "../models"
import { ThemedStyle } from "../theme"
import { useAppTheme } from "../utils/useAppTheme"

interface HomeScreenProps extends NativeStackScreenProps<BaseStackParamList, "Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const { authStore } = useStores()
  const { themed } = useAppTheme()

  return (
    <Screen style={themed($root)} preset="scroll">
      <Text text="Home Screen" />
      <Button text="Logout" onPress={() => authStore.logout()} />
    </Screen>
  )
})

const $root: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
})
