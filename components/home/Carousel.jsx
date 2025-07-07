import { StyleSheet,Text,View } from "react-native";
Import React from "react";
Import {SliderBox} from "react-native-image-slider-box";
const Carousel =()=>{
const slides=[

]
    return(
<View style={styles.carouselContainer}>
    <SliderBox images={slides}
dotColor={COLORS.primary}
inactiveDotColor={COLORS.secondary}
ImageComponentStyle={{borderRadius: 15, width:"95%",marginTop: 15}}
autoplay
circleLoop
/>
    
</View>

    )
}
export default Carousel
const styles=StyleSheet.create({
carouselContainer:{
    flex:1,
    alignItems:"center"
}


})