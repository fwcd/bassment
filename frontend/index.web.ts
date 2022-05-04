import { AppRegistry } from 'react-native';
import { App } from './App';

// Use prebuilt version of icons
// Source: https://stackoverflow.com/a/64133374
// @ts-ignore
import iconFont from 'react-native-vector-icons/Fonts/Ionicons.ttf';

// Add CSS font-face for icons
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Ionicons;
}`;
const style = document.createElement('style');
style.innerText = iconFontStyles;
document.head.appendChild(style);

// Start app
const appName = 'Bassment';
AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
