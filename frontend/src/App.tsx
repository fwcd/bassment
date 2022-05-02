import { Hello } from '@bassment/components/Hello';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

function App() {
  return (
    <SafeAreaView>
      <StatusBar />
      <Hello />
    </SafeAreaView>
  );
}

export default App;
