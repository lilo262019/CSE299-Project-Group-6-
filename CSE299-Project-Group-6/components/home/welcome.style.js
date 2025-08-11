// welcome.style.js
import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants'

export const WelcomeTxt = (color, top) => ({
  fontFamily: 'bold',
  fontSize: SIZES.xxLarge - 8,
  marginTop: top,
  marginHorizontal: SIZES.small,
  color,
  lineHeight: SIZES.large + 27,
})

const styles = StyleSheet.create({
  container: { width: '100%' },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.pink1,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    marginHorizontal: 22,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.pink1,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: 'regular',
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
})

export default styles

