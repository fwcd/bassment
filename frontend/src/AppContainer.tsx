import { AppSidebar } from '@bassment/AppSidebar';
import { envConstants } from '@bassment/constants/env';
import { AuthContext } from '@bassment/contexts/Auth';
import { LoginScreen } from '@bassment/screens/Login';
import { TracksScreen } from '@bassment/screens/Tracks';
import { useDerivedTheme } from '@bassment/styles/theme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { useWindowDimensions } from 'react-native';

const Drawer = createDrawerNavigator();

export function AppContainer() {
  const dimensions = useWindowDimensions();
  const theme = useDerivedTheme();
  const auth = useContext(AuthContext);

  return (
    <NavigationContainer theme={theme}>
      {auth.token ? (
        <Drawer.Navigator
          initialRouteName="Test"
          drawerContent={AppSidebar}
          screenOptions={{
            drawerType:
              envConstants.platform.os === 'web' || dimensions.width >= 600
                ? 'permanent'
                : 'slide',
            drawerStyle: {
              width: 220,
            },
          }}>
          <Drawer.Screen name="Tracks" component={TracksScreen} />
        </Drawer.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
}
