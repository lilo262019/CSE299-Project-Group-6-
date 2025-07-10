import { StyleSheet, Text, View } from 'react-native';

export default function NewRivalsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New Rivals Collection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold' },
});
