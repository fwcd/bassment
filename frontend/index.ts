import { AppRegistry, Platform } from 'react-native';
import { App } from './App';

const appName = 'Bassment';

AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('app-root'),
  });
}
