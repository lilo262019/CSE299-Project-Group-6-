import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { COLORS } from '../constants';
import styles from './orders.style';
const Orders = ({ navigation }) => {
  const [orderData, setOrderData] = useState([]);
  
  let tabBarHeight = 0;
  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch (error) {
    console.log('Orders: Not in bottom tab navigator, using default padding');
    tabBarHeight = 0;
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const id = await AsyncStorage.getItem("id");
    const ordersId = `orders${JSON.parse(id)}`;

    try {
      const ordersObj = await AsyncStorage.getItem(ordersId);
      if (ordersObj !== null) {
        const orders = JSON.parse(ordersObj);
        const orderList = Object.values(orders);
        setOrderData(orderList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name='chevron-back-circle'
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.titleTxt}>
          Orders
        </Text>
      </View>

      <FlatList
        data={orderData}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 16,
            marginVertical: 8,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
            <Text style={{ color: '#888', marginTop: 4 }}>৳{item.price}</Text>
            <Text style={{ color: '#4caf50', marginTop: 4 }}>Paid</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
            <Text style={{ fontSize: 18, color: COLORS.gray, textAlign: 'center' }}>
              No orders yet
            </Text>
            <Text style={{ fontSize: 14, color: COLORS.gray2, textAlign: 'center', marginTop: 10 }}>
              Your order history will appear here
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default Orders;
