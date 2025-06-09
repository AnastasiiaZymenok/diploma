import {
  Modal,
  View,
  ViewStyle,
  TextInput,
  ScrollView,
  TouchableOpacity,
  InteractionManager,
  TextStyle,
} from 'react-native';
import { useEffect, useState, type FC } from 'react';
import { ThemedStyle } from '../../../theme';
import { Button, Text } from '../../../components';
import { useAppTheme } from '../../../utils/useAppTheme';
import { CreateAnnouncementDto } from '../../../services/announcementService';

interface CreateAnnModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  onAnnouncementCreated?: (announcement: CreateAnnouncementDto) => void;
}

const CreateAnnModal: FC<CreateAnnModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  onAnnouncementCreated,
}) => {
  const { themed } = useAppTheme();

  const [announcement, setAnnouncement] = useState<CreateAnnouncementDto>({
    title: '',
    description: '',
    type: 'search',
    listOfRequirementsOrServices: [],
  });

  const [newRequirement, setNewRequirement] = useState('');

  const handleChangeAnnouncement = (
    key: keyof CreateAnnouncementDto,
    value: string | string[]
  ) => {
    setAnnouncement({ ...announcement, [key]: value });
  };

  const handleAddRequirement = () => {
    if (
      newRequirement.trim() &&
      announcement.listOfRequirementsOrServices.length < 5
    ) {
      const words = newRequirement.trim().split(/\s+/);
      if (words.length <= 20) {
        handleChangeAnnouncement('listOfRequirementsOrServices', [
          ...announcement.listOfRequirementsOrServices,
          newRequirement.trim(),
        ]);
        setNewRequirement('');
      }
    }
  };

  const handleRemoveRequirement = (index: number) => {
    const newList = announcement.listOfRequirementsOrServices.filter(
      (_, i) => i !== index
    );
    handleChangeAnnouncement('listOfRequirementsOrServices', newList);
  };

  const handleAddAnnouncement = () => {
    onAnnouncementCreated?.(announcement);
    setIsModalVisible(false);
    InteractionManager.runAfterInteractions(() => {
      clearAnnouncement();
    });
  };

  const clearAnnouncement = () => {
    setAnnouncement({
      title: '',
      description: '',
      type: 'search',
      listOfRequirementsOrServices: [],
    });
    setNewRequirement('');
  };

  useEffect(() => {
    if (!isModalVisible) {
      clearAnnouncement();
    }
  }, [isModalVisible]);

  return (
    <Modal
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
      presentationStyle='formSheet'
      style={themed($modalWrapper)}
    >
      <ScrollView style={themed($modalContainer)}>
        <Text
          text='Додати оголошення'
          preset='heading'
          style={themed($title)}
        />

        <Text text='Заголовок' preset='formLabel' style={themed($label)} />
        <TextInput
          style={themed($input)}
          value={announcement.title}
          onChangeText={(value) => handleChangeAnnouncement('title', value)}
          placeholder='Введіть заголовок'
        />

        <Text text='Опис' preset='formLabel' style={themed($label)} />
        <TextInput
          style={[themed($input), themed($multilineInput)]}
          value={announcement.description}
          onChangeText={(value) =>
            handleChangeAnnouncement('description', value)
          }
          placeholder='Введіть опис'
          multiline
          numberOfLines={4}
          maxLength={200}
        />

        <Text text='Тип оголошення' preset='formLabel' style={themed($label)} />
        <View style={themed($radioGroup)}>
          <TouchableOpacity
            style={themed($radioButton)}
            onPress={() => handleChangeAnnouncement('type', 'search')}
          >
            <View
              style={[
                themed($radioCircle),
                announcement.type === 'search' && themed($radioSelected),
              ]}
            />
            <Text text='Пошук' />
          </TouchableOpacity>

          <TouchableOpacity
            style={themed($radioButton)}
            onPress={() => handleChangeAnnouncement('type', 'offer')}
          >
            <View
              style={[
                themed($radioCircle),
                announcement.type === 'offer' && themed($radioSelected),
              ]}
            />
            <Text text='Пропозиція' />
          </TouchableOpacity>
        </View>

        <Text text='Вимоги/Послуги' preset='formLabel' style={themed($label)} />
        <View style={themed($requirementInputContainer)}>
          <TextInput
            style={[themed($input), themed($requirementInput)]}
            value={newRequirement}
            onChangeText={setNewRequirement}
            placeholder='Введіть вимогу або послугу (макс. 20 слів)'
          />
          <Button
            preset='default'
            text='Додати'
            onPress={handleAddRequirement}
            disabled={
              !newRequirement.trim() ||
              announcement.listOfRequirementsOrServices.length >= 5
            }
            style={
              !newRequirement.trim() ||
              announcement.listOfRequirementsOrServices.length >= 5
                ? themed($addRequirementButtonDisabled)
                : undefined
            }
          />
        </View>

        <View style={themed($requirementsList)}>
          {announcement.listOfRequirementsOrServices.map((req, index) => (
            <View key={index} style={themed($requirementItem)}>
              <Text text='•' style={themed($bulletPoint)} />
              <Text text={req} style={themed($requirementText)} />
              <TouchableOpacity
                onPress={() => handleRemoveRequirement(index)}
                style={themed($removeButton)}
              >
                <Text text='×' style={themed($removeButtonText)} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={themed($buttonContainer)}>
          <Button
            preset='default'
            text='Скасувати'
            onPress={() => setIsModalVisible(false)}
            style={themed($cancelButton)}
          />
          <Button
            preset='default'
            text='Додати'
            onPress={handleAddAnnouncement}
            disabled={
              !announcement.title.trim() || !announcement.description.trim()
            }
            style={themed($submitButton)}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default CreateAnnModal;

const $modalContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.md,
});

const $modalWrapper: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
});

const $title: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
});

const $label: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
});

const $input: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 8,
  padding: spacing.sm,
  marginBottom: spacing.md,
});

const $multilineInput: ThemedStyle<ViewStyle> = () => ({
  height: 100,
  textAlignVertical: 'top',
});

const $radioGroup: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  marginBottom: spacing.md,
});

const $radioButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: spacing.lg,
});

const $radioCircle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: colors.border,
  marginRight: spacing.xs,
});

const $radioSelected: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.accent500,
  borderColor: colors.palette.accent500,
});

const $requirementInputContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  gap: spacing.sm,
  marginBottom: spacing.md,
});

const $requirementInput: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  marginBottom: 0,
});

const $requirementsList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
});

const $requirementItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: spacing.xs,
});

const $bulletPoint: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginRight: spacing.xs,
});

const $requirementText: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
});

const $removeButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  padding: spacing.xs,
});

const $removeButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error,
  fontSize: 20,
});

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: spacing.lg,
  paddingBottom: spacing.xl,
});

const $cancelButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  marginRight: spacing.sm,
});

const $submitButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  marginLeft: spacing.sm,
});

const $addRequirementButtonDisabled: ThemedStyle<ViewStyle> = () => ({
  opacity: 0.5,
});
