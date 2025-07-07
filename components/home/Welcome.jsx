import { View, Text , TouchableOpacity, TextInput} from "react-native";
import React from "react";
import styles from "./Welcome.style";
import { COLORS , SIZES } from "../../constants";
import { Feather , Ionicons} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
    const navigation = useNavigation();
  return (
    <View>
      
      <View style={styles.container}>
        <Text style={styles.WelcomeTxt(Colors.black, SIZES.xSmall)}>Aureva</Text>
        <Text style={styles.WelcomeTxt(Colors.primary, 0)}>
          {" "}
          Glow Begins With Grace
        </Text>
      </View>


      <View style={styles.searchContainer}>
            <TouchableOpacity>
              <Feather name "Search" size={24} style={styles.searchIcon}/>
            </TouchableOpacity>
           <View style={styles.searchWrapper}>
            <TextInput 
            style={styles.searchInput} 
            value=""
            onPressIn={()=>navigation.navigate("Search")}
            placeholder="Look for your desired products..."/>       
            </View>
            <View>
            <TouchableOpacity style={styles.searchBtn}>
                <Ionicons name="camera-outlone" size={SIZES.xLarge} color={COLORS.secondary} />
            </TouchableOpacity>
             </View>
         </View>
            
        
  </View>);
};

export default Welcome;
