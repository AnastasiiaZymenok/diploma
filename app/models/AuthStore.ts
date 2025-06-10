import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
  flow,
  getRoot,
} from 'mobx-state-tree';
import { withSetPropAction } from './helpers/withSetPropAction';
import {
  saveSecureData,
  removeSecureData,
  validateEmail,
  validatePassword,
  validatePasswordMatch,
  getSecureData,
} from '@/utils/validation';
import { RootStoreModel } from './RootStore';

export const AuthStoreModel = types
  .model('AuthStore')
  .props({
    isAuthenticated: types.optional(types.boolean, false),
    authToken: types.maybe(types.string),
    userId: types.maybe(types.string),
    email: types.maybe(types.string),
    isLoading: types.optional(types.boolean, false),
    error: types.maybe(types.string),
  })
  .actions((self) => {
    const setAuthToken = (token: string | undefined) => {
      self.authToken = token;
      self.isAuthenticated = !!token;

      console.log('setAuthToken', token);
      if (token) {
        saveSecureData('authToken', token);
        saveSecureData('isAuthenticated', 'true');
      } else {
        removeSecureData('authToken');
        removeSecureData('isAuthenticated');
      }
    };

    const setUserId = (id: string | undefined) => {
      self.userId = id;
      if (id) {
        saveSecureData('userId', id);
      } else {
        removeSecureData('userId');
      }
    };

    const setEmail = (email: string | undefined) => {
      self.email = email;
      if (email) {
        saveSecureData('email', email);
      } else {
        removeSecureData('email');
      }
    };

    const setError = (error: string | undefined) => {
      self.error = error;
    };

    const setLoading = (loading: boolean) => {
      self.isLoading = loading;
    };

    const setAuthenticated = (value: boolean) => {
      self.isAuthenticated = value;
      if (value) {
        saveSecureData('isAuthenticated', 'true');
      } else {
        removeSecureData('isAuthenticated');
      }
    };

    return {
      setAuthToken,
      setUserId,
      setEmail,
      setError,
      setLoading,
      setAuthenticated,
      restoreAuthState: flow(function* () {
        try {
          const token = yield getSecureData('authToken');
          const userId = yield getSecureData('userId');
          const email = yield getSecureData('email');
          const isAuthenticated = yield getSecureData('isAuthenticated');

          if (token && isAuthenticated === 'true') {
            console.log(
              'restoreAuthState',
              token,
              userId,
              email,
              isAuthenticated
            );
            setAuthToken(token);
            setUserId(userId || undefined);
            setEmail(email || undefined);
            return true;
          }
          return false;
        } catch (error) {
          console.log('Error restoring auth state:', error);
          return false;
        }
      }),
      login: flow(function* (email: string, password: string) {
        try {
          setLoading(true);
          setError(undefined);

          if (!validateEmail(email)) {
            setError('Invalid email format');
            return false;
          }

          if (!validatePassword(password)) {
            setError(
              'Password must be at least 8 characters long and contain both letters and numbers'
            );
            return false;
          }

          const response = yield fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = yield response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Login failed');
          }

          if (data.status === 'success' && data.token) {
            setAuthToken(data.token);
            setUserId(data.data.company.id.toString());
            setEmail(data.data.company.email);
            setAuthenticated(true);

            // Set company info from response data
            const root = getRoot<Instance<typeof RootStoreModel>>(self);
            root.companyStore.setCompanyInfo({
              name: data.data.company.name,
              email: data.data.company.email,
              industry: data.data.company.industry,
              description: data.data.company.description,
            });

            return true;
          }

          throw new Error('Invalid response format');
        } catch (error) {
          console.warn(error);
          setError(
            error instanceof Error
              ? error.message
              : 'An error occurred during login'
          );
          return false;
        } finally {
          setLoading(false);
        }
      }),
      register: flow(function* (
        email: string,
        password: string,
        confirmPassword: string,
        companyData?: {
          name: string;
          description: string;
          industry: string;
          foundedYear: number;
          services: string[];
        }
      ) {
        try {
          setLoading(true);
          setError(undefined);

          if (!validateEmail(email)) {
            setError('Invalid email format');
            return false;
          }

          if (!validatePassword(password)) {
            setError(
              'Password must be at least 8 characters long and contain both letters and numbers'
            );
            return false;
          }

          if (!validatePasswordMatch(password, confirmPassword)) {
            setError('Passwords do not match');
            return false;
          }

          const response = yield fetch(
            'http://localhost:3000/api/auth/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                password,
                name: companyData?.name || '',
                description: companyData?.description || '',
                industry: companyData?.industry || '',
                foundedYear:
                  companyData?.foundedYear || new Date().getFullYear(),
                services: companyData?.services || [],
              }),
            }
          );

          const data = yield response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
          }

          if (data.status === 'success' && data.token) {
            setAuthToken(data.token);
            setUserId(data.data.company.id.toString());
            setEmail(data.data.company.email);
            setAuthenticated(true);

            // Set company info from response data
            const root = getRoot<Instance<typeof RootStoreModel>>(self);
            root.companyStore.setCompanyInfo({
              name: data.data.company.name,
              email: data.data.company.email,
              industry: data.data.company.industry,
              description: data.data.company.description,
            });

            return true;
          }

          throw new Error('Invalid response format');
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : 'An error occurred during registration'
          );
          return false;
        } finally {
          setLoading(false);
        }
      }),
      logout() {
        setAuthToken(undefined);
        setUserId(undefined);
        setEmail(undefined);
        setAuthenticated(false);
        setError(undefined);
      },
    };
  });

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotOut
  extends SnapshotOut<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotIn
  extends SnapshotIn<typeof AuthStoreModel> {}
