import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, SIZES } from '../constants'
import styles from './productDetails.style'

const ProductDetails = ({navigation}) => {
  const [count,setCount]=useState(1)
  
  const increment = () => {
    setCount(count + 1)
  }
  
  const decrement = () => {
    if(count > 1) {
      setCount(count - 1)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
    <TouchableOpacity onPress={() =>{navigation.goBack()}}>
    <Ionicons name= "chevron-back-circle" size={30} />
    </TouchableOpacity>

    <TouchableOpacity onPress={() =>{}}>
    <Ionicons name= "heart" size={30} color={COLORS.primary} />
    </TouchableOpacity>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
    <Image 
    source={{uri:"https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} 
    style={styles.image}/>
    
    <View style={styles.details}>
    <View style={styles.titleRow}>
      <Text style={styles.title}>Product</Text>
      <View style={styles.priceWrapper}>
      <Text style={styles.price}>$99.99</Text>
      </View>
    </View>

    <View style={styles.ratingRow}>
      <View style={styles.rating}>
        {[1,2,3,4,5].map((index)=>(
        <Ionicons
        key={index}
        name='star'
        size={24}
        color="gold"
        />
        ))}
        <Text style={styles.ratingText}>4.5</Text>
      </View>
      
      <View style={styles.rating}>
        <TouchableOpacity onPress={decrement}>
          <SimpleLineIcons
          name='minus' size={20}/>
        </TouchableOpacity>
          <Text style={styles.ratingText}> {count} </Text>
        <TouchableOpacity onPress={increment}>
          <SimpleLineIcons
          name='plus' size={20}/>
        </TouchableOpacity>
      </View>
      
    </View>
    <View style={styles.discriptionWrapper}>
      <Text style={styles.discription}>Description</Text>
      <Text style={styles.discriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel condimentum lorem. Curabitur auctor, lorem sed iaculis aliquam, diam quam facilisis lectus, at posuere dolor lectus ut urna. Vestibulum ultrices urna sed pulvinar fermentum. Nullam posuere sit amet diam nec imperdiet. Donec est nunc, malesuada nec viverra quis, malesuada a elit. Pellentesque sapien erat, dapibus ac eros et, tristique dignissim dolor. Aliquam blandit quis lorem in volutpat. Ut ullamcorper elit quam, et consectetur quam mollis consectetur. Praesent eu sapien pretium, placerat leo et, facilisis nisi. Integer sed est feugiat, porta dui nec, lobortis quam. Ut orci sem, ultrices vel leo quis, tempor efficitur orci. Praesent sollicitudin id odio vitae tempor.</Text>
    </View>
    <View style={{marginBottom:SIZES.small}}>
      <View style={styles.location}>
    <Ionicons name="location-outline" size={20} />
      </View>
    </View>
    </View>
    </ScrollView>
    </View>
    
  )
}

export default ProductDetails
