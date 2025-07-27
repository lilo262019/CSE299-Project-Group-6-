import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
import useFetch from '../../hooks/useFetch';
import React from 'react';
import styles from './productCardView.style';


const ProductRow = () => {
    const {data, isLoading, error}= useFetch();
    const products=[1,2,3,4];
  return (
   <View style={styles.container}>
    {isLoading ?(
      <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
    ): error ? (    
        <Text>Error loading products</Text>
    ):( 
      <FlatList
      data={data}
      keyExtractor={(item)=>item._id}
      renderItem={({item})=> <ProductCardView item={item}/>}
      horizontal
      contentContainerStyle={{columnGap: SIZES.medium}}
   />
   )}
   </View>
  );
};

export default ProductRow;

