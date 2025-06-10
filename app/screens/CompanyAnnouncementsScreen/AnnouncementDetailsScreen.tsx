import { View, ViewStyle, ScrollView, TextStyle } from 'react-native';
import { FC } from 'react';
import { ThemedStyle } from '../../theme';
import { Header, Screen, Text } from '../../components';
import { useAppTheme } from '../../utils/useAppTheme';
import { Announcement } from './types';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseStackParamList } from '../../navigators/BaseNavigator';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<BaseStackParamList, 'AnnouncementDetails'>;

export const AnnouncementDetailsScreen: FC<Props> = ({ route }) => {
  const { announcement } = route.params;
  const { themed, theme } = useAppTheme();
  const navigation = useNavigation();

  console.log(announcement);

  return (
    <Screen preset='scroll' style={themed($container)}>
      <ScrollView style={themed($scrollContainer)}>
        <Header
          title='Оголошення'
          onLeftPress={() => navigation.goBack()}
          leftIcon='back'
        />
        <View style={themed($header)}>
          <View style={themed($typeContainer)}>
            <Text
              text={format(new Date(announcement.createdAt), 'd MMMM yyyy', {
                locale: uk,
              })}
              style={themed($date)}
            />
            <View style={themed($typeBadge)}>
              <Text
                text={announcement.type === 'search' ? 'Пошук' : 'Пропозиція'}
                style={themed($typeText)}
              />
            </View>
          </View>
          <Text
            text={announcement.title}
            preset='heading'
            style={themed($title)}
          />
        </View>

        <View style={themed($content)}>
          {announcement.description && (
            <>
              <View style={themed($descriptionContainer)}>
                <Text
                  text='Опис'
                  preset='subheading'
                  style={themed($sectionTitle)}
                />
                <Text
                  text={announcement.description}
                  style={themed($description)}
                />
              </View>
              <View style={themed($divider)} />
            </>
          )}
          <View style={themed($descriptionContainer)}>
            <Text
              text={announcement.type === 'search' ? 'Вимоги' : 'Послуги'}
              preset='subheading'
              style={themed($sectionTitle)}
            />
            <View style={themed($requirementsList)}>
              {announcement.listOfRequirementsOrServices.map((item, index) => (
                <View key={index} style={themed($requirementItem)}>
                  <Ionicons
                    name='checkmark-circle'
                    size={20}
                    color={theme.colors.palette.accent500}
                    style={themed($checkIcon)}
                  />
                  <Text text={item} style={themed($requirementText)} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background,
});

const $scrollContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  padding: spacing.md,
});

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
  marginTop: spacing.md,
});

const $typeContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing.sm,
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

const $date: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  fontSize: 14,
});

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 24,
  marginTop: spacing.xs,
});

const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.lg,
});

const $descriptionContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  //   gap: spacing.sm,
});

const $sectionTitle: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
});

const $description: ThemedStyle<TextStyle> = ({ spacing }) => ({
  lineHeight: 24,
});

const $requirementsList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
});

const $requirementItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.sm,
});

const $checkIcon: ThemedStyle<ViewStyle> = () => ({
  marginTop: 2,
});

const $requirementText: ThemedStyle<TextStyle> = () => ({
  flex: 1,
  lineHeight: 20,
});

const $divider: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: 1,
  backgroundColor: colors.border,
  marginVertical: spacing.md,
});
