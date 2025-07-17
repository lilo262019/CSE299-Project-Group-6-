import { StyleSheet, Text, View } from 'react-native';

const SearchResults = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Results</Text>
      {/* Filtered product list will go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'bold',
    marginBottom: 10,
  },
});

export default SearchResults;
