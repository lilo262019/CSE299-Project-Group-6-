import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from "../../constants";
import styles from './Heading.style';

const Heading = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                New Arrivals
            </Text>
            <TouchableOpacity>
                <Ionicons name='grid' size={24} color={COLORS.primary}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Heading

