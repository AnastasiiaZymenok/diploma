import { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, FlatList } from "react-native"
import { Screen, Text, Card } from "@/components"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { BottomTabParamList } from "@/navigators/BottomTabNavigator"
import { useAppTheme } from "@/utils/useAppTheme"
import { ThemedStyle } from "../theme"
import { Project, createProject, ProjectStage } from "@/models/Project"
import { FlashList } from "@shopify/flash-list"

interface CompanyProjectsScreenProps
  extends NativeStackScreenProps<BottomTabParamList, "CompanyProjects"> {}

export const CompanyProjectsScreen: FC<CompanyProjectsScreenProps> = observer(
  function CompanyProjectsScreen() {
    const { themed } = useAppTheme()

    // TODO: Replace with actual data from store
    const mockProjects = [
      createProject({
        name: "Проект 1",
        status: "Активний",
        description: "Опис проекту 1",
        stage: ProjectStage.PLANNING,
        customerCompany: "Компанія 1",
        executorCompany: "Моя компанія",
        functions: ["Функція 1", "Функція 2"],
        expectedResult: "Очікуваний результат 1",
      }),
    ]

    const renderProject = ({ item }: { item: Project }) => (
      <Card
        style={themed($projectCard)}
        content={`${item.name}\nСтатус: ${item.status}\nЕтап: ${item.stage}`}
      />
    )

    return (
      <Screen style={themed($root)} preset="scroll">
        <Text text="Проекти моєї компанії" preset="heading" style={themed($title)} />
        <FlashList
          data={mockProjects}
          renderItem={renderProject}
          keyExtractor={(item) => item.id}
          contentContainerStyle={themed($listContent)}
          estimatedItemSize={100}
        />
      </Screen>
    )
  },
)

const $root: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
})

const $title: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $listContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xl,
})

const $projectCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})
