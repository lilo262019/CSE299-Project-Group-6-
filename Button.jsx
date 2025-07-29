import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants';

const Button = ({ title, onPress, style, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        disabled && styles.disabledButton,
        style, // custom style should come last to allow overrides
      ]}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.large,
    borderRadius: SIZES.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: COLORS.lightGray,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});

export default Button;