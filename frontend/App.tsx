import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Text, useWindowDimensions } from 'react-native';

const Drawer = createDrawerNavigator();

export function App() {
  const dimensions = useWindowDimensions();
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Test"
        screenOptions={{
          drawerType: dimensions.width >= 600 ? 'permanent' : 'slide',
        }}>
        <Drawer.Screen name="Home" component={() => <Text>Home</Text>} />
        <Drawer.Screen name="Test" component={() => <Text>Test 123</Text>} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
