import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useAppTheme } from '@/utils/useAppTheme';
import { BottomTabNavigator } from './BottomTabNavigator';
import { EditCompanyScreen } from '@/screens/EditCompanyScreen';
import { AnnouncementDetailsScreen } from '@/screens/CompanyAnnouncementsScreen/AnnouncementDetailsScreen';
import { Announcement } from '@/screens/CompanyAnnouncementsScreen/types';

export type BaseStackParamList = {
  Main: undefined;
  EditCompany: undefined;
  AnnouncementDetails: { announcement: Announcement };
  // Add more screens as needed
};

const Stack = createNativeStackNavigator<BaseStackParamList>();

export const BaseNavigator = observer(function BaseNavigator() {
  const {
    theme: { colors },
  } = useAppTheme();

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
      <Stack.Screen name='Main' component={BottomTabNavigator} />
      <Stack.Screen name='EditCompany' component={EditCompanyScreen} />
      <Stack.Screen
        name='AnnouncementDetails'
        component={AnnouncementDetailsScreen}
      />
    </Stack.Navigator>
  );
});
