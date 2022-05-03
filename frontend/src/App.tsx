import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Test" component={() => <Text>Hello</Text>} />
        <Drawer.Screen name="Test 2" component={() => <Text>ABC</Text>} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
