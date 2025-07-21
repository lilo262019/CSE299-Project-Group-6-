import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';

const styles = StyleSheet.create({
   container:{
    flex:1
   } ,
   upperRow:{
    marginHorizontal:20,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    position:"absolute",
    top:SIZES.xxLarge,
    width:SIZES.width-44,
    zIndex:999
   },
   image:{
    aspectRatio:1,
    resizeMode:"cover"
   },
   details:{
    flex: 1,
    backgroundColor:COLORS.lightWhite,
    width:SIZES.width,
    borderTopLeftRadius:SIZES.medium,
    borderTopRightRadius:SIZES.medium,
    paddingTop: SIZES.large,
    paddingHorizontal: SIZES.medium,
   },
   titleRow:{
    paddingHorizontal:20,
    flexDirection:"row",
    alignItems:"flex-start",
    justifyContent:"space-between",
    width:SIZES.width-44,
    top:20,
    
   },
   title:{
    fontFamily:"bold",
    fontSize:SIZES.large,
   },
   price:{
      paddingHorizontal:6,
      fontFamily:"semibold",
    fontSize:SIZES.large,
    marginLeft:8
    },
   priceWrapper:{
   backgroundColor:COLORS.secondary,
   borderRadius:SIZES.large
   },
   ratingRow:{
      paddingBottom:SIZES.small,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      width:SIZES.width-10,
      top: 5
   },
   rating:{
      top:SIZES.large, 
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"flex-start",
      marginHorizontal:SIZES.large,
   },
   ratingText:{
      color:COLORS.gray,
      fontFamily:"medium",
      marginLeft:5
   },
   discriptionWrapper:{
      marginTop:SIZES.large*2,
      marginHorizontal:SIZES.large,
   },
   discription:{
      fontFamily:"medium",
      fontSize:SIZES.large-2,
   },
   discriptionText:{
      fontFamily:"regular",
      fontSize:SIZES.small,
      textAlign:"justify",
      marginBottom:SIZES.small
   },
   location:{
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
      backgroundColor:COLORS.secondary,
      padding:5,
      borderRadius:SIZES.large,
      marginHorizontal:12
   }
})


export default styles;