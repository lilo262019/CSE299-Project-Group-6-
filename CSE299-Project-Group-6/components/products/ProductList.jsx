import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import React from 'react';
import { COLORS, SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
import useFetch from '../../hooks/useFetch';
import styles from './productList.style';

const ProductList = () => {
  const { data, isLoading, error } = useFetch();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No products found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <ProductCardView item={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
      />
    </View>
  );
};

export default ProductList;
