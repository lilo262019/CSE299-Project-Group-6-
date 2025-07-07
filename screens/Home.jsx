import { Fontisto, Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-web';
import { Welcome } from "../components";
import Carousel from '../components/home/Carousel';
import Heading from '../components/home/Heading';
import styles from "./Home.style";
const Home = () => {
  return (
<SafeAreaView>
    <View style={styles.appBarWrapper}>
      <View style={styles.appBar}>
        <Ionicons name="location-outline" size={24}/>
        <Text style={styles.location}> Dhaka, Bangladesh </Text>
        <View style={{alignItems:"flex-end"}}>
          <View style={styles.cartCount}>
            <Text style={styles.cartNumber}> 1 </Text>
          </View>
          <TouchableOpacity>
            <Fontisto name="shopping-bag" size={24}/>
          </TouchableOpacity>
        </View>
      </View>
      </View>


      <ScrollView>
        <Welcome/>
        <Carousel/>
        <Heading/>
      </ScrollView>
  </SafeAreaView>
  );
};

export default Home

