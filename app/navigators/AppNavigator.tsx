/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import * as Screens from '@/screens';
import Config from '../config';
import { navigationRef, useBackButtonHandler } from './navigationUtilities';
import { useAppTheme } from '@/utils/useAppTheme';
import { ComponentProps } from 'react';
import { AuthNavigator } from './AuthNavigator';
import { BaseNavigator } from './BaseNavigator';
import { useStores } from '@/models';
import { useEffect } from 'react';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Auth: undefined;
  Base: undefined;
  Welcome: undefined;
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
};

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  const { authStore } = useStores();
  const {
    theme: { colors },
  } = useAppTheme();

  useEffect(() => {
    console.log('restore auth useEffect');
    const restoreAuth = async () => {
      await authStore.restoreAuthState();
    };
    restoreAuth();
  }, []);

  console.log('authStore.isAuthenticated', authStore.isAuthenticated);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      {authStore.isAuthenticated ? (
        <Stack.Screen name='Base' component={BaseNavigator} />
      ) : (
        <>
          {/* <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} /> */}
          <Stack.Screen name='Auth' component={AuthNavigator} />
        </>
      )}

      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  );
});

export interface NavigationProps
  extends Partial<
    ComponentProps<typeof NavigationContainer<AppStackParamList>>
  > {}

export const AppNavigator = observer(function AppNavigator(
  props: NavigationProps
) {
  useBackButtonHandler(canExit);

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <Screens.ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </Screens.ErrorBoundary>
    </NavigationContainer>
  );
});

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */

/**
 * use this to navigate without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
export function canExit(routeName: string) {
  return exitRoutes.includes(routeName);
}
