import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('Bassment', () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('Bassment', {
    rootTag: document.getElementById('app'),
  });
}
