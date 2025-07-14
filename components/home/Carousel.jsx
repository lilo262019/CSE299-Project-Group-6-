import { StyleSheet, View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";


//<Text style={styles.title}>Your heading</Text>


const Carousel =()=>{
const slides=[
    "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661596300676-6be9821b86bc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1739980213756-753aea153bb8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];
    return(
<View style={cstyles.carouselContainer}>
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
const cstyles=StyleSheet.create({
    carouselContainer:{
    flex:1,
    alignItems:"center"
}


})