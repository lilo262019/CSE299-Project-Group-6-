import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
const styles = StyleSheet.create({

    container:{
      marginTop : SIZES.medium,
      marginBottom: SIZES.medium,
      marginHorizontal:12
    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:SIZES.medium
    },
    headerTitle:{
        fontSize:SIZES.large,
        fontWeight:"bold",
        color:COLORS.primary
    },
})
export default styles;