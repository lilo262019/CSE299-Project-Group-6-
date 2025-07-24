import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  container: {
    borderRadius: 12,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  addBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 2,
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.black,
  },
  supplier: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginVertical: 2,
  },
  price: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
    marginTop: 5,
  },
});

export default styles;