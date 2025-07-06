import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles =StyleSheet.create({
    textStyle: {
        fontFamily: "bold",
        fontSize: 40
    },
    appBarWrapper:{
        marginHorizontal: 22,
        marginTop:SIZES.small
    },
    appBar:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    location:{
    fontFamily: "semibold",
    fontSize:SIZES.medium,
    color: COLORS.gray
    },
    cartCount:{
        position:"absolute",
        bottom: 16,
        width:16,
        height: 16,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor:"pink4",
        justifyContent:"center",
        zIndex:999
    }
})

export default styles