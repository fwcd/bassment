import { AppSidebar } from '@bassment/AppSidebar';
import { useRandom } from '@bassment/hooks/useRandom';
import { TracksScreen } from '@bassment/screens/Tracks';
import { useDerivedTheme } from '@bassment/styles/theme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';

const Drawer = createDrawerNavigator();

export function AppContainer() {
  const dimensions = useWindowDimensions();
  const theme = useDerivedTheme();

  // FIXME: Remove this context and replace it with something proper
  const { value } = useRandom();
  console.log(value);

  return (
    <NavigationContainer theme={theme}>
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
