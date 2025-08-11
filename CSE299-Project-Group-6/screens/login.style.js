import { StyleSheet } from "react-native";
import {COLORS, SIZES} from "../constants/index";

const styles = StyleSheet.create({
    cover:{
        height: SIZES.height/3,
        width: SIZES.width-20,
        resizeMode: "contain",
        marginBottom: SIZES.xLarge
    },
    title:{
        fontFamily: "bold",
        fontSize: SIZES.xLarge+5,
        color: COLORS.primary,
        alignItems: "center",
        marginBottom: SIZES.xLarge
    },
    wrapper: {
        marginBottom: 20
    },
    label: {
        fontFamily: "regular",
        fontSize: SIZES.xsmall,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: "right"
    },
    inputWrapper: (borderColor) => ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: "center"
    }),
    iconStyle:{
        marginRight: 10
    },
    errorMessage:{
        color: COLORS.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xsmall
    },
    registration:{
        marginTop: 20,
        textAlign: "center",
        fontFamily: "semibold",

    },
    
    
})



export default styles;
