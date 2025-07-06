import { Fontisto } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native-web';
import styles from './home.style';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <IonIcons name= 'location outline' size={24}/>
          
          <Text style={styles.location}> Dhaka Bangladesh</Text>
        
          <View style={{alignItems: "flex-end"}}>
            <View styles={styles.cartCount}>
              <Text style={styles.cartNumber}>8</Text>
            </View>
            <Fontisto name='shopping-bag' size={24}/>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

