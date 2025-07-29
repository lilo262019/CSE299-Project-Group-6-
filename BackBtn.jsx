import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

const BackBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backbtn}>
      <Ionicons
        name="chevron-back-circle"
        size={30}
        color={COLORS.primary}
      />
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  backbtn: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    top: 40,
  },
});
