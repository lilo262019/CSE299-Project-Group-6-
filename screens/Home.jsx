import { Fontisto, Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Welcome from '../components/home/Welcome';
import style from './home.style';

const Home = () => {
  return (
    <View>
      <View style={style.appBarWrapper}>
        <View style={style.appBar}>
          <Ionicons name='location-outline' size={24} />

          <Text style={style.location}> Dhaka Bangladesh</Text>
          
             <TouchableOpacity></TouchableOpacity><View style={{ alignItems: "flex-end" }}>
            <View style={style.cartCount}>
              <Text style={style.cartNumber}>0</Text>
            </View>
              <TouchableOpacity>
            <Fontisto name='shopping-bag' size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    
      <ScrollView>
         <Welcome /> 
      </ScrollView>
      
    </View>
  )
}

export default Home

