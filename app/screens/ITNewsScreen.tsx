import { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ActivityIndicator, RefreshControl, View, Pressable } from "react-native"
import { Screen, Text } from "@/components"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabParamList } from "@/navigators/BottomTabNavigator"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "../theme"
import { NewsCard } from "@/components/NewsCard"
import { useStores } from "@/models"
import { FlashList } from "@shopify/flash-list"
import { NewsArticle } from "@/services/newsService"

interface ITNewsScreenProps extends NativeStackScreenProps<BottomTabParamList, "ITNews"> {}

export const ITNewsScreen: FC<ITNewsScreenProps> = observer(function ITNewsScreen() {
  const { themed } = useAppTheme()
  const { newsStore } = useStores()
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  useEffect(() => {
    newsStore.fetchNews()
  }, [])

  const handleRefresh = () => {
    newsStore.fetchNews()
  }

  const sortedArticles = [...newsStore.articles].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime()
    const dateB = new Date(b.publishedAt).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  if (newsStore.isLoading && newsStore.articles.length === 0) {
    return (
      <Screen style={themed($root)} preset="fixed">
        <ActivityIndicator size="large" />
      </Screen>
    )
  }

  return (
    <Screen style={themed($root)} preset="scroll">
      <Text text="Новини в сфері IT" preset="heading" style={themed($title)} />
      <View style={themed($sortContainer)}>
        <Pressable
          style={[themed($sortButton), sortOrder === "newest" && themed($activeSortButton)]}
          onPress={() => setSortOrder("newest")}
        >
          <Text
            text="Від нових до старих"
            preset="default"
            style={[
              themed($sortButtonText),
              sortOrder === "newest" && themed($activeSortButtonText),
            ]}
          />
        </Pressable>
        <Pressable
          style={[themed($sortButton), sortOrder === "oldest" && themed($activeSortButton)]}
          onPress={() => setSortOrder("oldest")}
        >
          <Text
            text="Від старих до нових"
            preset="default"
            style={[
              themed($sortButtonText),
              sortOrder === "oldest" && themed($activeSortButtonText),
            ]}
          />
        </Pressable>
      </View>
      {newsStore.isLoading ? (
        <View style={themed($loading)}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlashList<NewsArticle>
          data={sortedArticles}
          renderItem={({ item }) => <NewsCard article={item} />}
          keyExtractor={(item) => item.url}
          contentContainerStyle={themed($list)}
          estimatedItemSize={100}
          refreshControl={
            <RefreshControl refreshing={newsStore.isLoading} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <Text
              text={newsStore.error || "No news available"}
              preset="default"
              style={themed($emptyText)}
            />
          }
        />
      )}
    </Screen>
  )
})

const $root: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
})

const $title: ThemedStyle<any> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $sortContainer: ThemedStyle<any> = ({ spacing }) => ({
  flexDirection: "row",
  marginBottom: spacing.md,
  gap: spacing.sm,
})

const $sortButton: ThemedStyle<any> = ({ colors, spacing }) => ({
  flex: 1,
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.md,
  borderRadius: 8,
  backgroundColor: colors.palette.neutral100,
  alignItems: "center",
})

const $activeSortButton: ThemedStyle<any> = ({ colors }) => ({
  backgroundColor: colors.palette.primary500,
})

const $sortButtonText: ThemedStyle<any> = ({ colors }) => ({
  color: colors.text,
})

const $activeSortButtonText: ThemedStyle<any> = ({ colors }) => ({
  color: colors.palette.neutral100,
})

const $list: ThemedStyle<any> = ({ spacing }) => ({
  paddingBottom: spacing.xl,
})

const $emptyText: ThemedStyle<any> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
  marginTop: 20,
})

const $loading: ThemedStyle<any> = () => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
})
