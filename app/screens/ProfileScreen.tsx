import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Button, Screen, Text } from "@/components"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabParamList } from "@/navigators/BottomTabNavigator"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "../theme"
import { useStores } from "../models"

interface ProfileScreenProps extends NativeStackScreenProps<BottomTabParamList, "Profile"> {}

export const ProfileScreen: FC<ProfileScreenProps> = observer(function ProfileScreen() {
  const { themed } = useAppTheme()
  const { authStore } = useStores()

  return (
    <Screen style={themed($root)} preset="scroll">
      <Text text="Profile Screen" />
      <Button text="Logout" onPress={() => authStore.logout()} />
    </Screen>
  )
})

const $root: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
})
