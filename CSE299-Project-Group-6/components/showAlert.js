import { Platform, Alert as RNAlert } from 'react-native';

export function showAlert(title, message, buttons) {
  if (Platform.OS === 'web') {
    window.alert(title + (message ? ('\n' + message) : ''));
  } else {
    RNAlert.alert(title, message, buttons);
  }
}
