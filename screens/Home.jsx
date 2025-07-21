import { Fontisto, Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from '../components/home/Carousel';
import Heading from '../components/home/Heading';
import Welcome from '../components/home/Welcome';
import ProductRow from '../components/products/ProductRow';
import styles from './home.style';

const Home = () => {
  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name='location-outline' size={24} />

          <Text style={styles.location}> Dhaka Bangladesh</Text>
          
             <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>0</Text>
            </View>
              <TouchableOpacity>
            <Fontisto name='shopping-bag' size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}       
      >
         
  <Welcome /> 
  <Carousel />
  <Heading />
  <ProductRow />
  </ScrollView>
        </SafeAreaView>
    </ScrollView>
  )
}

export default Home

