import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const COLORS = {
  primary: "#8a3749",
  secondary: "#f0eaeeff",
  background: "#fff",
  black: "#000000",
  gray1: "#e6e6e6",
  gray2: "#9BA1A6",
  gray: "#888888",
  pink1: "#ebe0e6ff",
  pink4: "#cc3d6c",
  pink3: "#dc748c",
  text: "#11181C",
  lightWhite: "#F9F9F9",
};

const SIZES = {
  xsmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44,
  height,
  width,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};


export { COLORS, SIZES, SHADOWS };
