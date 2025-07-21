import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants';
import styles from './productCardView.style';

const ProductCardView = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetails")} style={styles.card}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri:     "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }}
            style={styles.image}
          />

          <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>
              Product Title
            </Text>
            <Text style={styles.supplier} numberOfLines={1}>
              Supplier Name
            </Text>
            <Text style={styles.price}>$99.99</Text>
          </View>

          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add-circle" size={35} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
