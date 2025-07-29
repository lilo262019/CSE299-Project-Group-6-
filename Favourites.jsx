import { StyleSheet, Text, View } from 'react-native';

const Favourites = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favourites</Text>
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
