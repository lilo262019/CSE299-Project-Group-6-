import {
    Fontisto,
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../constants";
import styles from "./productDetails.style";

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
      />

      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={decrement} style={styles.qtyBtn}>
            <SimpleLineIcons name="minus" size={20} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{count}</Text>
          <TouchableOpacity onPress={increment} style={styles.qtyBtn}>
            <SimpleLineIcons name="plus" size={20} />
          </TouchableOpacity>
        </View>
        {/* End Quantity Selector */}

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>
            {item.description}
          </Text>
        </View>

        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location-outline" size={20} />
              <Text>{item.product_location}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
              <Text> Free Delivery </Text>
            </View>
          </View>

          <View style={styles.cartRow}>
            <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
              <Text style={styles.cartTitle}>BUY NOW</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={styles.addCart}>
              <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
