// ProductCardView.js
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants";
import styles from "./ProductCardView.style";

const ProductCardView = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { item })}
      style={styles.card}
      activeOpacity={0.8}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.imageUrl || "https://via.placeholder.com/150",
            }}
            style={styles.image}
          />
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.7}>
            <Ionicons name="add-circle" size={35} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title || "No Title"}
          </Text>
          {item.supplier ? (
            <Text style={styles.supplier} numberOfLines={1}>
              {item.supplier}
            </Text>
          ) : null}
          <Text style={styles.price}>
            ${item.price != null ? item.price : "N/A"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;

// ProductCardView.style.js
import { StyleSheet } from "react-native";
import { SIZES } from "../../constants";

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  container: {
    borderRadius: 12,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  addBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 2,
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.black,
  },
  supplier: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginVertical: 2,
  },
  price: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginTop: 5,
  },
});

export default styles;
