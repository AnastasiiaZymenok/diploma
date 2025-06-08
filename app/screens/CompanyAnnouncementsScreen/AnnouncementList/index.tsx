import { View, ViewStyle, FlatList } from "react-native"
import { FC } from "react"
import { ThemedStyle } from "../../../theme"
import { Text } from "../../../components"
import { useAppTheme } from "../../../utils/useAppTheme"
import { Announcement } from "../types"

interface AnnouncementListProps {
  announcements?: Announcement[]
}

const AnnouncementList: FC<AnnouncementListProps> = ({ announcements }) => {
  const { themed } = useAppTheme()

  const renderAnnouncement = ({ item }: { item: Announcement }) => (
    <View style={themed($announcementCard)}>
      <View style={themed($announcementHeader)}>
        <Text text={item.title} preset="heading" style={themed($title)} />
        <View style={themed($typeBadge)}>
          <Text text={item.type === "search" ? "Пошук" : "Пропозиція"} style={themed($typeText)} />
        </View>
      </View>
      <Text text={item.description} style={themed($description)} />
      <View style={themed($requirementsList)}>
        {item.listOfRequirementsOrServices.map((req, index) => (
          <View key={index} style={themed($requirementItem)}>
            <Text text="•" style={themed($bulletPoint)} />
            <Text text={req} style={themed($requirementText)} />
          </View>
        ))}
      </View>
      <Text text={new Date(item.createdAt).toLocaleDateString("uk-UA")} style={themed($date)} />
    </View>
  )

  return (
    <FlatList
      data={announcements}
      renderItem={renderAnnouncement}
      keyExtractor={(item) => item.id}
      contentContainerStyle={themed($listContainer)}
      ListFooterComponent={<View style={themed($footer)} />}
    />
  )
}

export default AnnouncementList

const $listContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  //   padding: spacing.md,
})

const $announcementCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral100,
  borderRadius: 12,
  padding: spacing.md,
  marginBottom: spacing.md,
  borderWidth: 1,
  borderColor: colors.border,
})

const $announcementHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: spacing.sm,
})

const $title: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  marginRight: spacing.sm,
})

const $typeBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.accent500,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  borderRadius: 6,
})

const $typeText: ThemedStyle<ViewStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontSize: 12,
  fontWeight: "600",
})

const $description: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $requirementsList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $requirementItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.xs,
})

const $bulletPoint: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginRight: spacing.xs,
})

const $requirementText: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
})

const $date: ThemedStyle<ViewStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 12,
})

const $footer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: 150,
})
