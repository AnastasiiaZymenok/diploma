import {
  View,
  ViewStyle,
  FlatList,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import { FC } from 'react';
import { ThemedStyle } from '../../../theme';
import { Text } from '../../../components';
import { useAppTheme } from '../../../utils/useAppTheme';
import { Announcement } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BaseStackParamList } from '../../../navigators/BaseNavigator';

interface AnnouncementListProps {
  announcements?: Announcement[];
  onDelete?: (id: string) => void;
}

const AnnouncementList: FC<AnnouncementListProps> = ({
  announcements,
  onDelete,
}) => {
  const { themed, theme } = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<BaseStackParamList>>();

  const handlePress = (announcement: Announcement) => {
    navigation.navigate('AnnouncementDetails', { announcement });
  };

  const renderAnnouncement = ({ item }: { item: Announcement }) => (
    <TouchableOpacity
      style={themed($announcementCard)}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <View style={themed($announcementHeader)}>
        <Text text={item.title} preset='heading' style={themed($title)} />
        <View style={themed($headerRight)}>
          <View style={themed($typeBadge)}>
            <Text
              text={item.type === 'search' ? 'Пошук' : 'Пропозиція'}
              style={themed($typeText)}
            />
          </View>
        </View>
      </View>
      <Text
        text={item.description}
        style={themed($description)}
        numberOfLines={2}
      />
      <View style={themed($requirementsList)}>
        {item.listOfRequirementsOrServices.slice(0, 2).map((req, index) => (
          <View key={index} style={themed($requirementItem)}>
            <Text text='•' style={themed($bulletPoint)} />
            <Text
              text={req}
              style={themed($requirementText)}
              numberOfLines={1}
            />
          </View>
        ))}
        {item.listOfRequirementsOrServices.length > 2 && (
          <Text
            text={`+${item.listOfRequirementsOrServices.length - 2} більше`}
            style={themed($moreText)}
          />
        )}
      </View>
      <Text
        text={new Date(item.createdAt).toLocaleDateString('uk-UA')}
        style={themed($date)}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={announcements}
      renderItem={renderAnnouncement}
      keyExtractor={(item) => item.id}
      contentContainerStyle={themed($listContainer)}
      ListFooterComponent={<View style={themed($footer)} />}
    />
  );
};

export default AnnouncementList;

const $listContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  // padding: spacing.md,
});

const $announcementCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.neutral100,
  borderRadius: 12,
  padding: spacing.md,
  marginBottom: spacing.md,
  borderWidth: 1,
  borderColor: colors.border,
});

const $announcementHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing.sm,
});

const $headerRight: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.sm,
});

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  flex: 1,
  marginRight: spacing.sm,
});

const $typeBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.accent500,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  borderRadius: 6,
});

const $typeText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
  fontSize: 12,
  fontWeight: '600',
});

const $deleteButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
});

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
});

const $requirementsList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
});

const $requirementItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: spacing.xs,
});

const $bulletPoint: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginRight: spacing.xs,
});

const $requirementText: ThemedStyle<TextStyle> = () => ({
  flex: 1,
});

const $moreText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 12,
  marginTop: 4,
});

const $date: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 12,
});

const $footer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: 200,
});
