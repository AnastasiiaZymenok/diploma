import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "@/components"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabParamList } from "@/navigators/BottomTabNavigator"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "../theme"

interface SettingsScreenProps extends NativeStackScreenProps<BottomTabParamList, "Settings"> {}

export const SettingsScreen: FC<SettingsScreenProps> = observer(function SettingsScreen() {
  const { themed } = useAppTheme()

  return (
    <Screen style={themed($root)} preset="scroll">
      <Text text="Settings Screen" />
    </Screen>
  )
})

const $root: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
})
