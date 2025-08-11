import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { showAlert } from '../components/showAlert';
import { Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context' 
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import styles from './cart.style'
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons"
import { COLORS } from '../constants';
import fetchCart from '../hooks/fetchCart'
import { Button, CartTile } from '../components'
import axios from 'axios' 

import { useNavigation } from '@react-navigation/native';

const Cart = (props) => {
  const navigation = props.navigation || useNavigation();
  const baseUrl = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
  const { data, loading, error, refetch } = fetchCart();
  const [selectedItems, setSelectedItems] = useState([]); 

  let tabBarHeight = 0;
  try {
    tabBarHeight = useBottomTabBarHeight();
  } catch (error) {
    console.log('Cart: Not in bottom tab navigator, using default padding');
    tabBarHeight = 0;
  }

  const toggleSelectItem = (item) => {
    if (selectedItems.some((selected) => selected._id === item._id)) {
        setSelectedItems(selectedItems.filter((selected) => selected._id !== item._id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };


  const [token, setToken] = useState(null);
  useEffect(() => {
    const getToken = async () => {
      let storedToken = await AsyncStorage.getItem('token');
          <Button 
            title={`Checkout (${selectedItems.length} items)`} 
            isValid={selectedItems.length > 0}
            onPress={() => {
              navigation.navigate('Checkout', {
                items: selectedItems,
                onCheckoutSuccess: () => setSelectedItems([])
              });
            }}
          />
      if (storedToken) {
        storedToken = storedToken.replace(/(^"|"$)/g, '');
        setToken(storedToken);
      }
    };
    getToken();
  }, []);

  const deleteSelectedItems = async () => {
    if (selectedItems.length === 0) {
      showAlert("No items selected", "Please select items to delete.");
      return;
    }
    if (!token) {
      showAlert("Error", "User not authenticated.");
      return;
    }
    showAlert(
      "Remove items",
      "Are you sure you want to delete the selected items?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              for (let item of selectedItems) {
                const baseUrl = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
                const endpoint = `${baseUrl}/api/carts/${item._id}`;
                console.log('[Cart Delete] Attempting to delete cart subdocument id:', item._id, 'Endpoint:', endpoint);
                await axios.delete(endpoint, {
                  headers: { token: `Bearer ${token}` }
                });
              }
              setSelectedItems([]);
              refetch();
            } catch (error) {
              console.error('[Cart Delete] Error:', error, 'Selected items:', selectedItems);
              let errorMsg = 'Failed to delete items from the cart.';
              if (error.response) {
                errorMsg += `\nServer: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
              } else if (error.request) {
                errorMsg += '\nNo response from server.';
              } else {
                errorMsg += `\n${error.message}`;
              }
              showAlert("Error", errorMsg);
            }
          },
        },
      ]
    );
  };
  const handleDeleteItem = async (item) => {
    try {
      if (!token) {
        showAlert("Error", "User not authenticated.");
        return;
      }
      console.log('[Cart Delete] Deleting item:', item);
      const baseUrl = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
      const endpoint = `${baseUrl}/api/carts/${item._id}`;
      console.log('[Cart Delete] Token used for delete:', token, 'Endpoint:', endpoint, 'Cart subdocument id:', item._id);
      await axios.delete(endpoint, {
        headers: { token: `Bearer ${token}` }
      });
      setSelectedItems(selectedItems.filter((selected) => selected._id !== item._id));
      refetch();
    } catch (error) {
      console.error('[Cart Delete] Error:', error, 'Item:', item);
      let errorMsg = 'Failed to delete item from the cart.';
      if (error.response) {
        errorMsg += `\nServer: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
      } else if (error.request) {
        errorMsg += '\nNo response from server.';
      } else {
        errorMsg += `\n${error.message}`;
      }
      showAlert("Error", errorMsg);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
  <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Bottom Navigation', { screen: 'Home' })}>
          <Ionicons 
            name='chevron-back-circle'
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.titleTxt}>
          My Cart
        </Text>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 10, color: COLORS.gray }}>Loading cart...</Text>
        </View>
      ) : Array.isArray(data) && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CartTile
              item={item}
              onPress={() => toggleSelectItem(item)}
              select={selectedItems.some((selected) => selected._id === item._id)}
              onDelete={() => handleDeleteItem(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
        />
      ) : data && data.products && data.products.length > 0 ? (
        <FlatList
          data={data.products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CartTile
              item={item}
              onPress={() => toggleSelectItem(item)}
              select={selectedItems.some((selected) => selected._id === item._id)}
              onDelete={() => handleDeleteItem(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: COLORS.gray, textAlign: 'center' }}>
            Your cart is empty
          </Text>
          <Text style={{ fontSize: 14, color: COLORS.gray2, textAlign: 'center', marginTop: 10 }}>
            Add some products to your cart to see them here
          </Text>
        </View>
      )}

      {selectedItems.length > 0 && (
        <>
          <Button 
            title={`Checkout (${selectedItems.length} items)`} 
            isValid={selectedItems.length > 0}
            onPress={() => {
              navigation.navigate('Checkout', { items: selectedItems });
            }}
          />
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 16,
            marginTop: 10,
            marginHorizontal: 10,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Order Info</Text>
            <Text style={{ fontSize: 15 }}>
              Items: {selectedItems.length}
            </Text>
            <Text style={{ fontSize: 15, marginTop: 4 }}>
              Total: ৳{
          selectedItems
    .reduce((sum, item) => {
      const price = Number(item.cartItem?.price || 0);
      const quantity = Number(item.quantity || 1);
      return sum + price * quantity;
    }, 0)
    .toFixed(2)
}
            </Text>
          </View>
        </>
      )}
      
    </SafeAreaView>
  );
};

export default Cart;
