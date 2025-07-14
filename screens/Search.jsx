import { Feather, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from "../constants";
import styles from './Search.Style';

const Search = () => {
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
            <TouchableOpacity>
              <Ionicons name="camera-outline" size={SIZES.xLarge} style={styles.searchIcon}/>
            </TouchableOpacity>
           <View style={styles.searchWrapper}>
            <TextInput 
            style={styles.searchInput} 
            value=""
            onPressIn={()=> {}}
            placeholder="Look for your desired products..."/>       
            </View>
            <View>
            <TouchableOpacity style={styles.searchBtn}>
                <Feather name="search" size={24} color={COLORS.secondary} />
            </TouchableOpacity>
             </View>
         </View>
    </SafeAreaView>
  )
}

export default Search

