import { useState } from 'react';
import { Button, FlatList, StyleSheet, TextInput, View } from 'react-native';
import ProductCard from '../components/ProductCard';

const products = [
  { id: '1', name: 'Lipstick', price: 10 },
  { id: '2', name: 'Foundation', price: 15 },
  { id: '3', name: 'Eyeliner', price: 8 },
  { id: '4', name: 'Mascara', price: 12 },
];

export default function Home({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => handleProductPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      {/* Button to New Rivals Screen */}
      <Button
        title="Explore New Rivals"
        onPress={() => navigation.navigate('NewRivals')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});
