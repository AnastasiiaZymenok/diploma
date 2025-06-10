import { FC, useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { View, ViewStyle } from 'react-native';
import { Button, Header, Screen, Text, TextField } from '@/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseStackParamList } from '@/navigators/BaseNavigator';
import { useAppTheme } from '@/utils/useAppTheme';
import { ThemedStyle } from '../theme';
import { useStores } from '../models';
import { CompanyDataService } from '../../src/services/companyDataService';
import { showMessage } from 'react-native-flash-message';

interface EditCompanyScreenProps
  extends NativeStackScreenProps<BaseStackParamList, 'EditCompany'> {}

export const EditCompanyScreen: FC<EditCompanyScreenProps> = observer(
  function EditCompanyScreen({ navigation }) {
    const { themed } = useAppTheme();
    const { companyStore } = useStores();
    const [name, setName] = useState(companyStore.name);
    const [industry, setIndustry] = useState(companyStore.industry || '');
    const [email, setEmail] = useState(companyStore.email || '');
    const [description, setDescription] = useState(
      companyStore.description || ''
    );
    const [isLoading, setIsLoading] = useState(false);

    const isFormValid = useMemo(() => {
      return (
        name.trim() !== '' &&
        industry.trim() !== '' &&
        email.trim() !== '' &&
        description.trim() !== ''
      );
    }, [name, industry, email, description]);

    const getErrorMessage = () => {
      if (name.trim() === '') return 'Введіть назву компанії';
      if (industry.trim() === '') return 'Введіть галузь';
      if (email.trim() === '') return 'Введіть email';
      if (description.trim() === '') return 'Введіть опис компанії';
      return '';
    };

    const handleSave = async () => {
      setIsLoading(true);
      console.log('handleSave1');
      if (!isFormValid) return;
      console.log('handleSave2');
      try {
        console.log('handleSave2.1');
        const companyService = CompanyDataService.getInstance();
        console.log('handleSave2.2');
        const updatedCompany = await companyService.updateMyCompany({
          name,
          industry,
          email,
          description,
        });
        console.log('handleSave3');
        // Update local store with new data
        companyStore.setCompanyInfo({
          name: updatedCompany.name,
          email: updatedCompany.email,
          industry: updatedCompany.industry,
          description: updatedCompany.description,
        });
        console.log('handleSave4');
        showMessage({
          message: 'Успішно оновлено',
          type: 'success',
          duration: 2000,
        });

        navigation.goBack();
      } catch (error) {
        showMessage({
          message: 'Помилка при оновленні',
          description:
            error instanceof Error ? error.message : 'Невідома помилка',
          type: 'danger',
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Screen style={themed($root)} preset='scroll'>
        <View style={themed($container)}>
          <View style={themed($formContainer)}>
            <Header
              title='Редагування профілю'
              onLeftPress={() => navigation.goBack()}
              leftIcon='back'
            />
            <View style={themed($errorContainer)}>
              {!isFormValid && (
                <Text
                  text={getErrorMessage()}
                  style={themed($errorText)}
                  preset='default'
                />
              )}
            </View>
            <TextField
              label='Назва компанії'
              value={name}
              onChangeText={setName}
              containerStyle={themed($inputContainer)}
            />
            <TextField
              label='Галузь'
              value={industry}
              onChangeText={setIndustry}
              containerStyle={themed($inputContainer)}
            />
            <TextField
              label='Email'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
              containerStyle={themed($inputContainer)}
            />
            <TextField
              label='Опис компанії'
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              containerStyle={themed($inputContainer)}
            />
          </View>

          <View style={themed($buttonContainer)}>
            <Button
              text='Зберегти'
              onPress={handleSave}
              style={themed($saveButton)}
              preset='reversed'
              disabled={!isFormValid}
              loading={isLoading}
            />
            <Button
              text='Скасувати'
              onPress={() => navigation.goBack()}
              style={themed($cancelButton)}
            />
          </View>
        </View>
      </Screen>
    );
  }
);

const $root: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  paddingHorizontal: spacing.md,
});

const $errorContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  height: 30,
  justifyContent: 'center',
});

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  minHeight: '100%',
  justifyContent: 'space-between',
  paddingBottom: spacing.xxl,
});

const $formContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.md,
  marginTop: spacing.md,
});

const $inputContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
});

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
  gap: spacing.sm,
});

const $errorText: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  marginBottom: spacing.sm,
  color: colors.error,
});

const $saveButton: ThemedStyle<ViewStyle> = () => ({});

const $cancelButton: ThemedStyle<ViewStyle> = () => ({});
