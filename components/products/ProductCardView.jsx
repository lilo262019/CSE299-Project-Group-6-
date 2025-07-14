import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants';
import styles from './productCardView.style'; // Make sure the file name and import match exactly

const ProductCardView = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("")}>
      <View style={styles.container}> {/* ✅ Fixed casing */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://example.com/image.jpg' }}
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
