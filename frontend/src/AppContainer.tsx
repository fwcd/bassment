import { AppSidebar } from '@bassment/AppSidebar';
import { useRandom } from '@bassment/hooks/useRandom';
import { TracksScreen } from '@bassment/screens/Tracks';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import { Platform, useColorScheme, useWindowDimensions } from 'react-native';

const Drawer = createDrawerNavigator();

export function AppContainer() {
  const dimensions = useWindowDimensions();
  const scheme = useColorScheme();

  // usually, you would do something interesting with this
  const { value } = useRandom();
  console.log(value);
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer.Navigator
        initialRouteName="Test"
        drawerContent={AppSidebar}
        screenOptions={{
          drawerType:
            Platform.OS === 'web' || dimensions.width >= 600
              ? 'permanent'
              : 'slide',
          drawerStyle: {
            width: 220,
          },
        }}>
        <Drawer.Screen name="Tracks" component={TracksScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
