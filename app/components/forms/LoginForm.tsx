import { FC, useState, useEffect } from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Text, TextField, Button } from '@/components';
import { useStores } from '@/models';
import { useAppTheme } from '@/utils/useAppTheme';
import { ThemedStyle } from '../../theme';

interface LoginFormProps {
  onSuccess?: (email: string, password: string) => void;
}

export const LoginForm: FC<LoginFormProps> = observer(function LoginForm({
  onSuccess,
}) {
  const { authStore } = useStores();
  const { themed } = useAppTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      authStore.setError(undefined);
    };
  }, []);

  // Clear error when email or password changes
  useEffect(() => {
    if (authStore.error) {
      authStore.setError(undefined);
    }
  }, [email, password]);

  const handleLogin = async () => {
    const success = await authStore.login(email, password);
    if (success && onSuccess) {
      onSuccess(email, password);
    }
  };

  return (
    <>
      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={themed($textField)}
        autoCapitalize='none'
        autoComplete='email'
        autoCorrect={false}
        keyboardType='email-address'
        labelTx='loginScreen:emailFieldLabel'
        placeholderTx='loginScreen:emailFieldPlaceholder'
      />

      <TextField
        value={password}
        onChangeText={setPassword}
        containerStyle={themed($textField)}
        autoCapitalize='none'
        autoComplete='password'
        autoCorrect={false}
        secureTextEntry
        labelTx='loginScreen:passwordFieldLabel'
        placeholderTx='loginScreen:passwordFieldPlaceholder'
      />

      {authStore.error && (
        <Text
          text={authStore.error}
          style={themed($errorText)}
          preset='formHelper'
        />
      )}

      <Button
        text='Login'
        onPress={handleLogin}
        style={themed($button)}
        preset='default'
        disabled={authStore.isLoading}
      />
    </>
  );
});

const $textField: ViewStyle = {
  marginBottom: 16,
};

const $button: ViewStyle = {
  marginTop: 16,
};

const $errorText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  marginTop: spacing.xs,
  color: colors.palette.angry500,
});
