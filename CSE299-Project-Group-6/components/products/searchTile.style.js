import {StyleSheet} from 'react-native';
import {COLORS,SIZES,SHADOWS} from '../../constants/index';

const styles= StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:SIZES.small,
        flexDirection:"row",
        padding:SIZES.medium,
        borderRadius:SIZES.small,
        backgroundColor:"#fff",
        ...SHADOWS.medium,
        shadowColor: COLORS.lightwhite,

    },
    image:{
        width: 70,
        backgroundColor: COLORS.secondary,
        borderRadius:SIZES.medium,
        justifyContent:"center",
        alignContent:"center",
    },
    productImg:{
        width:"100%",
        height:70,
        borderRadius: SIZES.small,
        resizeMode: 'cover',
    },
    textContainer:{
        flex:1,
        marginHorizontal: SIZES.medium,
    },
    productTitle:{
        fontFamily:"bold",
        fontSize:SIZES.medium,
        color: COLORS.primary,
    },
    supplier:{
        fontFamily:"regular",
        fontSize:SIZES.small+2,
        color: COLORS.gray,
        marginTop:3,
    },
})

export default styles;