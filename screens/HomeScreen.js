import { Button, FlatList, View } from 'react-native';
import ProductCard from '../components/ProductCard';

<Button
  title="Explore New Rivals"
  onPress={() => navigation.navigate('NewRivals')}
/>


const products = [
  { id: '1', name: 'Lipstick', price: 10 },
  { id: '2', name: 'Foundation', price: 15 },
];

export default function HomeScreen({ navigation }) {
  const goToDetail = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={goToDetail} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
