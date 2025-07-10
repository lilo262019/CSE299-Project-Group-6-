import { Fontisto, Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Welcome from '../components/home/Welcome';
import style from './home.style';

const Home = () => {
  return (
    <View>
      <View style={style.appBarWrapper}>
        <View style={style.appBar}>
          <Ionicons name='location-outline' size={24} />
          <Text style={style.location}> Dhaka Bangladesh</Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={style.cartCount}>
              <Text style={style.cartNumber}>0</Text>
            </View>
            <Fontisto name='shopping-bag' size={24} />
          </View>
        </View>
      </View>
      <SafeAreaView>
        { <Welcome /> }
        <Text>Test Content</Text>
      </SafeAreaView>
    </View>
  )
}

export default Home

