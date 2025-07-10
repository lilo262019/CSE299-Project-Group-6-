import { Text, View } from 'react-native';
import ChildComponent from '../components/ChildComponent';

export default function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
      <ChildComponent />
    </View>
  );
}
