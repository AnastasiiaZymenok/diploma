import { FC, useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Screen, Text, TextField, Button } from '@/components';
import { useStores } from '@/models';
import { useAppTheme } from '@/utils/useAppTheme';
import { ThemedStyle } from '../../theme';

interface RegisterFormProps {
  onSuccess?: (props: {
    email: string;
    password: string;
    confirmPassword: string;
    companyName: string;
    description: string;
    industry: string;
    foundedYear: string;
    services: string[];
  }) => void;
  style?: ViewStyle;
}

export const RegisterForm: FC<RegisterFormProps> = observer(
  function RegisterForm({ onSuccess, style }) {
    const { authStore, companyStore } = useStores();
    const { themed } = useAppTheme();
    const [step, setStep] = useState(1);

    // Step 1: Auth data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Step 2: Company data
    const [companyName, setCompanyName] = useState('');
    const [industry, setIndustry] = useState('');
    const [description, setDescription] = useState('');
    const [foundedYear, setFoundedYear] = useState(
      new Date().getFullYear().toString()
    );
    const [services, setServices] = useState<string[]>([]);

    const handleNextStep = async () => {
      if (step === 1) {
        // Validate first step data
        if (!email || !password || !confirmPassword) {
          authStore.setError('Please fill in all fields');
          return;
        }

        if (password !== confirmPassword) {
          authStore.setError('Passwords do not match');
          return;
        }

        setStep(2);
      } else {
        // Complete registration with company data
        try {
          // const success = await authStore.register(
          //   email,
          //   password,
          //   confirmPassword,
          //   {
          //     name: companyName,
          //     email,
          //     description,
          //     industry,
          //     foundedYear: parseInt(foundedYear, 10),
          //     services,
          //   }
          // );

          // console.log(success);

          // if (success) {
          onSuccess?.({
            email,
            password,
            confirmPassword,
            companyName,
            description,
            industry,
            foundedYear,
            services,
          });
          // }
        } catch (error) {
          console.error('Registration failed:', error);
        }
      }
    };

    const isStep1Valid =
      email.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '';
    const isStep2Valid =
      companyName.trim() !== '' &&
      industry.trim() !== '' &&
      description.trim() !== '';

    useEffect(() => {
      return () => {
        authStore.setError(undefined);
      };
    }, []);

    return (
      <>
        {step === 1 ? (
          <>
            <Text
              text='Step 1: Create Account'
              preset='heading'
              style={themed($stepTitle)}
            />
            <TextField
              value={email}
              onChangeText={setEmail}
              containerStyle={themed($textField)}
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect={false}
              keyboardType='email-address'
              label='Email'
              placeholder='Enter your email'
            />

            <TextField
              value={password}
              onChangeText={setPassword}
              containerStyle={themed($textField)}
              autoCapitalize='none'
              autoComplete='password'
              autoCorrect={false}
              secureTextEntry
              label='Password'
              placeholder='Enter your password'
            />

            <TextField
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              containerStyle={themed($textField)}
              autoCapitalize='none'
              autoComplete='password'
              autoCorrect={false}
              secureTextEntry
              label='Confirm Password'
              placeholder='Confirm your password'
            />
          </>
        ) : (
          <>
            <Text
              text='Step 2: Company Information'
              preset='heading'
              style={themed($stepTitle)}
            />
            <TextField
              value={companyName}
              onChangeText={setCompanyName}
              containerStyle={themed($textField)}
              label='Company Name'
              placeholder='Enter company name'
            />

            <TextField
              value={industry}
              onChangeText={setIndustry}
              containerStyle={themed($textField)}
              label='Industry'
              placeholder='Enter company industry'
            />

            <TextField
              value={description}
              onChangeText={setDescription}
              containerStyle={themed($textField)}
              label='Company Description'
              placeholder='Enter company description'
              multiline
              numberOfLines={4}
            />

            <TextField
              value={foundedYear}
              onChangeText={setFoundedYear}
              containerStyle={themed($textField)}
              label='Founded Year'
              placeholder='Enter founding year'
              keyboardType='numeric'
            />
          </>
        )}

        {authStore.error && (
          <Text
            text={authStore.error}
            style={themed($errorText)}
            preset='formHelper'
          />
        )}

        <Button
          text={step === 1 ? 'Next' : 'Complete Registration'}
          onPress={handleNextStep}
          style={themed($button)}
          preset='default'
          disabled={
            authStore.isLoading || (step === 1 ? !isStep1Valid : !isStep2Valid)
          }
        />
        {step === 2 && (
          <Button
            text='Back'
            onPress={() => setStep(1)}
            style={themed($button)}
            preset='reversed'
            disabled={authStore.isLoading}
          />
        )}
      </>
    );
  }
);

const $stepTitle: ViewStyle = {
  marginBottom: 24,
};

const $textField: ViewStyle = {
  marginBottom: 16,
};

const $button: ViewStyle = {
  marginTop: 16,
};

const $errorText: ThemedStyle<ViewStyle> = ({ colors }) => ({
  marginTop: 8,
  color: colors.error,
});
