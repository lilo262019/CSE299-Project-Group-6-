import { Text, View } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import styles from './welcome.style'

const Welcome = () => {
  return (
<View>
    <View style={styles.container}>
      <Text style={styles.welcomeTxt(COLORS.black,SIZES.SIZES.xSmall)}>{" "}Find The Most</Text>
        <Text style={styles.welcomeTxt(COLORS.primary,0)}>{" "}Authentic Cosmetics and Beauty Products</Text>
    </View>
</View>
  )
}

export default Welcome