import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { observer } from "mobx-react-lite"
import { useAppTheme } from "@/utils/useAppTheme"
import * as Screens from "@/screens"
import { Ionicons } from "@expo/vector-icons"

export type BottomTabParamList = {
  CompanyAnnouncements: undefined
  ITNews: undefined
  CompanyProjects: undefined
  CompanyProfile: undefined
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

export const BottomTabNavigator = observer(function BottomTabNavigator() {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.palette.accent500,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.palette.neutral100,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 30,
          left: 20,
          right: 20,
          width: "90%",
          shadowColor: colors.palette.neutral900,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 80,
          paddingBottom: 10,
          paddingTop: 15,
          borderRadius: 100,
          alignSelf: "center",
          marginLeft: "5%",
          marginRight: "5%",
        },
      }}
    >
      <Tab.Screen
        name="CompanyAnnouncements"
        component={Screens.CompanyAnnouncementsScreen}
        options={{
          tabBarLabel: "Оголошення",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="megaphone-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ITNews"
        component={Screens.ITNewsScreen}
        options={{
          tabBarLabel: "Новини",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CompanyProjects"
        component={Screens.CompanyProjectsScreen}
        options={{
          tabBarLabel: "Проєкти",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="folder-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CompanyProfile"
        component={Screens.CompanyProfileScreen}
        options={{
          tabBarLabel: "Профіль",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="business-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
})
