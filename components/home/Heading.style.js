import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container:{
        marginTop: SIZES.xsmall,
        justifyContent: "space-between",
    },
    header: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
    headerTitle:{
        fontFamily:"semibold",
        fontSize: SIZES.xLarge-2,
    }
})
export default styles;