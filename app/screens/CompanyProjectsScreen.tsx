import { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { ViewStyle, FlatList, ActivityIndicator } from 'react-native';
import { Screen, Text, Card } from '@/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabParamList } from '@/navigators/BottomTabNavigator';
import { useAppTheme } from '@/utils/useAppTheme';
import { ThemedStyle } from '../theme';
import { Project } from '@/models/Project';
import { FlashList } from '@shopify/flash-list';
import {
  CompaniesServiceData,
  Project as ApiProject,
} from '../../src/services/companiesServiceData';
import { useFocusEffect } from '@react-navigation/native';

interface CompanyProjectsScreenProps
  extends NativeStackScreenProps<BottomTabParamList, 'CompanyProjects'> {}

export const CompanyProjectsScreen: FC<CompanyProjectsScreenProps> = observer(
  function CompanyProjectsScreen() {
    const { themed } = useAppTheme();
    const [projects, setProjects] = useState<ApiProject[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useFocusEffect(
      useCallback(() => {
        fetchProjects();
        console.log('fetchProjects');
      }, [])
    );

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const companiesService = CompaniesServiceData.getInstance();
        const fetchedProjects = await companiesService.getCompanyProjects();
        setProjects(fetchedProjects);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch projects'
        );
      } finally {
        setIsLoading(false);
      }
    };

    const renderProject = ({ item }: { item: ApiProject }) => (
      <Card
        style={themed($projectCard)}
        content={`${item.name}\nСтатус: ${item.status}\nЕтап: ${item.stage}`}
      />
    );

    if (isLoading) {
      return (
        <Screen style={themed($root)} preset='fixed'>
          <ActivityIndicator size='large' />
        </Screen>
      );
    }

    if (error) {
      return (
        <Screen style={themed($root)} preset='fixed'>
          <Text text={`Error: ${error}`} preset='default' />
        </Screen>
      );
    }

    return (
      <Screen style={themed($root)} preset='scroll'>
        <Text
          text='Проекти моєї компанії'
          preset='heading'
          style={themed($title)}
        />
        <FlashList
          data={projects}
          renderItem={renderProject}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={themed($listContent)}
          estimatedItemSize={100}
        />
      </Screen>
    );
  }
);

const $root: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
});

const $title: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
});

const $listContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xl,
});

const $projectCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
});
