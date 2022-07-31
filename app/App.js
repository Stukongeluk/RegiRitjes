/**
 *
 * @format
 * @flow strict-local
 */
import * as React from 'react';
import { View, Text, useColorScheme, ActivityIndicator } from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from './src/screens/OnboardingScreen';
import Home from './src/HomeScreen';
import {storage} from './src/services/StorageProvider';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const scheme = useColorScheme();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOnboarded, setIsOnboarded] = React.useState(false);

  React.useEffect(() => {
    const onboarded = storage.getBoolean('onboarded');
    if (onboarded === undefined || onboarded === null || onboarded === false) {
      storage.set('onboarded', false);
      setIsOnboarded(false);
    } else {
      setIsOnboarded(true);
    }
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {
        <Stack.Navigator initialRouteName={isOnboarded ? 'Home' : 'Onboarding'}>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Onboarding"
            component={OnboardingScreen}
          />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
};

export default App;
