import { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  TextStyle,
  View,
  ViewStyle,
  Image,
  TouchableOpacity,
  ImageStyle,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Button, Screen, Text } from '@/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseStackParamList } from '@/navigators/BaseNavigator';
import { useAppTheme } from '@/utils/useAppTheme';
import { ThemedStyle } from '../theme';
import { useStores } from '../models';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from '@/components/Icon';
import {
  CompanyDataService,
  Company,
} from '../../src/services/companyDataService';
import { useFocusEffect } from '@react-navigation/native';

interface CompanyProfileScreenProps
  extends NativeStackScreenProps<BaseStackParamList, 'Main'> {}

export const CompanyProfileScreen: FC<CompanyProfileScreenProps> = observer(
  function CompanyProfileScreen({ navigation }) {
    const { themed, theme } = useAppTheme();
    const { authStore, companyStore } = useStores();
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
      useCallback(() => {
        fetchCompanyData();
      }, [])
    );

    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        const companyData =
          await CompanyDataService.getInstance().getMyCompany();
        companyStore.setCompanyInfo({
          name: companyData.name,
          email: companyData.email,
          industry: companyData.industry,
          description: companyData.description,
        });
        if (companyData.profilePhoto) {
          companyStore.updateProfilePhoto(companyData.profilePhoto);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
        // You might want to show an error message to the user here
      } finally {
        setIsLoading(false);
      }
    };

    const pickImage = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        companyStore.updateProfilePhoto(result.assets[0].uri);
      }
    };

    return (
      <Screen style={themed($root)} preset='scroll'>
        {isLoading ? (
          <View style={themed($loadingContainer)}>
            <ActivityIndicator
              size='large'
              color={theme.colors.palette.accent500}
            />
          </View>
        ) : (
          <>
            <View style={themed($headerContainer)}>
              <Text text='Профіль' preset='heading' />
              <Pressable
                onPress={() => {
                  navigation.navigate('EditCompany');
                }}
              >
                <Icon
                  icon='settings'
                  size={30}
                  color={theme.colors.palette.angry500}
                />
              </Pressable>
            </View>

            <View style={themed($profileContainer)}>
              <TouchableOpacity
                onPress={pickImage}
                style={themed($logoContainer)}
              >
                {companyStore.profilePhoto ? (
                  <Image
                    source={{ uri: companyStore.profilePhoto }}
                    style={themed($profileImage)}
                  />
                ) : (
                  <Icon
                    icon='settings'
                    size={40}
                    color={theme.colors.palette.accent500}
                  />
                )}
              </TouchableOpacity>
              <View style={themed($profileInfoContainer)}>
                <Text text={companyStore.name} preset='subheading' />
                <Text
                  text={companyStore.industry || 'Немає індустрії'}
                  preset='default'
                  style={themed($industryText)}
                />
                <Text
                  text={companyStore.email || 'Немає email'}
                  preset='formHelper'
                />
              </View>
            </View>
            <View style={themed($mainDataContainer)}>
              <Text preset={'subheading'}>Про компанію</Text>
              <Text preset={'default'} style={themed($companyDescription)}>
                {companyStore.description || 'Немає опису компанії'}
              </Text>
            </View>
            <View style={themed($buttonContainer)}>
              <Button
                text='Logout'
                onPress={() => authStore.logout()}
                style={themed($logoutButton)}
              />
            </View>
          </>
        )}
      </Screen>
    );
  }
);

const $root: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
  rowGap: spacing.md,
});

const $logoContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: spacing.md,
  width: 100,
  height: 100,
  borderRadius: 50,
  alignSelf: 'center',
  backgroundColor: colors.palette.neutral700,
  overflow: 'hidden',
});

const $profileImage: ThemedStyle<ImageStyle> = () => ({
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
});

const $profileContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  gap: spacing.sm,
  marginTop: spacing.lg,
});

const $profileInfoContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const $mainDataContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
});

const $companyDescription: ThemedStyle<TextStyle> = ({ spacing }) => ({
  fontSize: 16,
  lineHeight: 24,
  textAlign: 'justify',
  marginTop: spacing.xs,
});

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
});

const $logoutButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
});

const $industryText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral700,
  fontSize: 16,
  lineHeight: 24,
  textAlign: 'justify',
});

const $headerContainer: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const $loadingContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});
