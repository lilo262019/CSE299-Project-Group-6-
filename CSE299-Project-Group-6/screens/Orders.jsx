import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { COLORS } from '../constants';
import styles from './orders.style';
const Orders = (props) => {
  const navigation = props.navigation || useNavigation();
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

  const clearOrders = async () => {
    Alert.alert(
      'Clear All Orders',
      'Are you sure you want to delete all orders?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear', style: 'destructive', onPress: async () => {
            try {
              const id = await AsyncStorage.getItem('id');
              if (!id) throw new Error('User ID not found');
              const ordersId = `orders${JSON.parse(id)}`;
              await AsyncStorage.removeItem(ordersId);
              setOrderData([]);
            } catch (e) {
              Alert.alert('Error', 'Could not clear orders.');
            }
          }
        }
      ]
    );
  };

  const deleteOrder = async (orderId) => {
    try {
      const id = await AsyncStorage.getItem('id');
      if (!id) throw new Error('User ID not found');
      const ordersKey = `orders${JSON.parse(id)}`;
      const ordersObj = await AsyncStorage.getItem(ordersKey);
      let orders = ordersObj ? JSON.parse(ordersObj) : {};
      delete orders[orderId];
      await AsyncStorage.setItem(ordersKey, JSON.stringify(orders));
      setOrderData(Object.values(orders));
    } catch (e) {
      Alert.alert('Error', 'Could not delete order.');
    }
  };

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
  <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
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
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
              <Text style={{ color: '#888', marginTop: 4 }}>৳{item.price}</Text>
              <Text style={{ color: '#4caf50', marginTop: 4 }}>Paid</Text>
            </View>
            <TouchableOpacity onPress={() => deleteOrder(item.id)} style={{ marginLeft: 12 }}>
              <Ionicons name="trash" size={22} color={COLORS.danger || 'red'} />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
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
