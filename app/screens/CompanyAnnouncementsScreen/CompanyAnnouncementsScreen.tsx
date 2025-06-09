import { View, ViewStyle } from 'react-native';
import { FC, useState, useEffect, useCallback } from 'react';
import { ThemedStyle } from '../../theme';
import { Button, Screen, Text } from '../../components';
import { useAppTheme } from '../../utils/useAppTheme';
import CreateAnnModal from './CreateAnnModal';
import AnnouncementList from './AnnouncementList';
import {
  Announcement as ApiAnnouncement,
  CreateAnnouncementDto,
} from '../../services/announcementService';
import { announcementService } from '../../services/announcementService';
import { ActivityIndicator } from 'react-native';
import { Announcement } from './types';
import { useFocusEffect } from '@react-navigation/native';

export const CompanyAnnouncementsScreen: FC = () => {
  const { themed } = useAppTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mapApiAnnouncement = (
    apiAnnouncement: ApiAnnouncement
  ): Announcement => ({
    id: apiAnnouncement?.id?.toString() ?? '',
    title: apiAnnouncement?.title ?? '',
    description: apiAnnouncement?.description ?? '',
    type: apiAnnouncement?.type ?? '',
    listOfRequirementsOrServices:
      apiAnnouncement?.listOfRequirementsOrServices ?? [],
    createdAt: apiAnnouncement.createdAt,
    companyId: apiAnnouncement?.company?.id?.toString() ?? '',
  });

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await announcementService.getAnnouncements();
      if (response.ok && response.data) {
        console.log('response.data', response.data);
        setAnnouncements(response?.data?.data?.announcements);
      } else {
        setError('Failed to fetch announcements');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch announcements'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('fetchAnnouncements');

      fetchAnnouncements();
    }, [])
  );

  const handleAnnouncementCreated = async (
    newAnnouncement: CreateAnnouncementDto
  ) => {
    try {
      // const created =
      await announcementService.createAnnouncement(newAnnouncement);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to create announcement'
      );
    } finally {
      setIsModalVisible(false);
      fetchAnnouncements();
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await announcementService.deleteAnnouncement(parseInt(id, 10));
      setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete announcement'
      );
    }
  };

  return (
    <Screen preset='scroll' style={themed($container)}>
      <View style={themed($container)}>
        <Text text='Оголошення' preset='heading' />
        <View style={themed($header)}>
          <Button
            text='Додати оголошення'
            onPress={() => setIsModalVisible(true)}
            preset='default'
          />
        </View>

        {isLoading ? (
          <ActivityIndicator size='large' />
        ) : error ? (
          <Text text={error} preset='default' style={{ color: 'red' }} />
        ) : (
          <AnnouncementList
            announcements={announcements}
            onDelete={handleDeleteAnnouncement}
          />
        )}

        <CreateAnnModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onAnnouncementCreated={handleAnnouncementCreated}
        />
      </View>
    </Screen>
  );
};

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.sm,
});

const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.md,
});
