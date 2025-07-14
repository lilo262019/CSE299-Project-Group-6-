import { FlatList, View } from 'react-native';
import { SIZES } from '../../constants';
import ProductCardView from './ProductCardView';

const ProductRow = () => {
    const products=[1,2,3,4];
  return (
   <View style={{marginTop: SIZES.medium}}>
    <FlatList
   data={products}
   renderItem={({item})=>(<ProductCardView/>)}
   horizontal
   contentContainerStyle={{columnGap: SIZES.medium}}
   
   />
   </View>
  )
}

export default ProductRow

