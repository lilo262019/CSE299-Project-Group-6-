import { Feather, Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View ,TextInput, Image,Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from "../constants";
import React, {useState} from 'react';
import styles from './Search.Style';
import axios from 'axios';
import SearchTile from '../components/products/SearchTile';

const Search = () => {
  const [searchKey, setSearchKey] =useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults)
  const handleSearch=async()=>{

    try {
      const response= await axios.get('http://localhost:300/api/products/search/${searchKey}')
      setSearchResults(response.data);
    } catch (error) {
      console.log('Error fetching search results', error);
    }
  }
  
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
            <TouchableOpacity>
              <Ionicons 
              name="camera-outline" 
              size={SIZES.xLarge} 
              style={styles.searchIcon}
              />
            </TouchableOpacity>
           <View style={styles.searchWrapper}>
            <TextInput 
              style={styles.searchInput} 
              value={searchKey}
              onChangeText={setSearchKey}
              placeholder="Look for your desired products..."/>   
              
            </View>
            <View>
              <TouchableOpacity style={styles.searchBtn} onPress={()=>handleSearch()}>
                <Feather name="search" size={24} color={COLORS.lightWhite} />
              </TouchableOpacity>
           </View>
         </View>
         {searchResults.length===0 ?(
          <View style={{flex:1}}> 
            <Image
            source={require('../assets/images/search.png')}
            style={styles.searchImage}
            />
          </View>
         ) : (
          <FlatList
          data={searchResults}
          keyExtractor={(item)=> item._id}
          renderItem={({item})=>(<SearchTile item={item}/>)}
          style={{marginHorizontal:12}}
          />
         )}
    </SafeAreaView>
  )
}

export default Search

