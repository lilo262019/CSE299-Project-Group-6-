import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.gray,
  },
  username: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginTop: 10,
  },
  optionContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  optionButton: {
    paddingVertical: 15,
    borderBottomColor: COLORS.lightGray ? COLORS.lightGray : "#eee",
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
});

export default styles;