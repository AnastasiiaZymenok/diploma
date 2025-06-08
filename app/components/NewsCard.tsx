import { FC } from "react"
import { View, Image, Pressable, Linking } from "react-native"
import { Text } from "./Text"
import { NewsArticle } from "@/services/newsService"
import { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

interface NewsCardProps {
  article: NewsArticle
}

export const NewsCard: FC<NewsCardProps> = ({ article }) => {
  const { themed } = useAppTheme()

  const handlePress = () => {
    Linking.openURL(article.url)
  }

  return (
    <Pressable onPress={handlePress} style={themed($card)}>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={themed($image)} resizeMode="cover" />
      )}
      <View style={themed($content)}>
        <Text text={article.title} preset="subheading" numberOfLines={2} />
        {article.description && (
          <Text
            text={article.description}
            preset="default"
            numberOfLines={3}
            style={themed($description)}
          />
        )}
        <View style={themed($footer)}>
          <Text text={article.source.name} preset="formHelper" style={themed($source)} />
          <Text text={new Date(article.publishedAt).toLocaleDateString()} preset="formHelper" />
        </View>
      </View>
    </Pressable>
  )
}

const $card: ThemedStyle<any> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral100,
  borderRadius: 12,
  marginBottom: spacing.md,
  overflow: "hidden",
  shadowColor: colors.palette.neutral900,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
})

const $image: ThemedStyle<any> = () => ({
  width: "100%",
  height: 200,
})

const $content: ThemedStyle<any> = ({ spacing }) => ({
  padding: spacing.md,
})

const $description: ThemedStyle<any> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginTop: spacing.xs,
})

const $footer: ThemedStyle<any> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: spacing.sm,
})

const $source: ThemedStyle<any> = ({ colors }) => ({
  color: colors.palette.primary500,
})
