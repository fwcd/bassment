import { AppRegistry } from 'react-native';
import { App } from './App';

const appName = 'Bassment';

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
