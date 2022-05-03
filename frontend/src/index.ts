import { AppRegistry, Platform } from 'react-native';
import App from './App';
import './gestureHandler';

AppRegistry.registerComponent('Bassment', () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('Bassment', {
    rootTag: document.getElementById('app'),
  });
}
