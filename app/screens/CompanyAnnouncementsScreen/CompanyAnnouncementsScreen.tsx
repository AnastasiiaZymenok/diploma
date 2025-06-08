import { View, ViewStyle } from "react-native"
import { FC, useState } from "react"
import { ThemedStyle } from "../../theme"
import { Button, Screen, Text } from "../../components"
import { useAppTheme } from "../../utils/useAppTheme"
import CreateAnnModal from "./CreateAnnModal"
import AnnouncementList from "./AnnouncementList"
import { Announcement } from "./types"
import { mockAnnouncements } from "./mockData"

export const CompanyAnnouncementsScreen: FC = () => {
  const { themed } = useAppTheme()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  const handleAnnouncementCreated = (newAnnouncement: Announcement) => {
    setAnnouncements((prev) => [newAnnouncement, ...prev])
  }

  return (
    <Screen preset="scroll" style={themed($container)}>
      <View style={themed($container)}>
        <Text text="Оголошення" preset="heading" />
        <View style={themed($header)}>
          <Button
            text="Додати оголошення"
            onPress={() => setIsModalVisible(true)}
            preset="default"
          />
        </View>

        <AnnouncementList announcements={[...announcements, ...mockAnnouncements]} />

        <CreateAnnModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onAnnouncementCreated={handleAnnouncementCreated}
        />
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.sm,
})

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.md,
})
