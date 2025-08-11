import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { showAlert } from '../components/showAlert';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import styles from './profile.style';
import { COLORS } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Profile = () => {
  const navigation = useNavigation();
  const tabBarHeight = Platform.OS === 'web' ? 0 : useBottomTabBarHeight();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        try {
          console.log('Profile: Fetching user data...');
          const id = await AsyncStorage.getItem('id');
          const token = await AsyncStorage.getItem('token');
          console.log('Profile: ID from storage:', id);
          console.log('Profile: Token from storage:', token ? 'exists' : 'missing');

          if (!id || !token) {
            console.log("Profile: Missing ID or token");
            setUserLogin(false);
            return;
          }

          const userDataString = await AsyncStorage.getItem('user' + JSON.parse(id));
          console.log('Profile: User data from storage:', userDataString ? 'exists' : 'missing');

          if (userDataString) {
            const userFromStorage = JSON.parse(userDataString);
            console.log('Profile: User data from storage:', userFromStorage);
            setUser(userFromStorage);
            setUserData(userFromStorage);
            setUserLogin(true);
            return;
          }

          console.log('Profile: Fetching user data from API...');
          const baseUrl = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
          const res = await axios.get(`${baseUrl}/api/users/${JSON.parse(id)}`, {
            headers: {
              token: `Bearer ${JSON.parse(token)}`
            }
          });
          console.log('Profile: User data from API:', res.data);
          setUser(res.data);
          setUserData(res.data);
          setUserLogin(true);
        } catch (error) {
          console.log("Profile: Fetching user failed", error);
          setUserLogin(false);
        }
      };
      fetchUserData();
    }, [])
  );

  const handleLogout = async () => {
    try {
      // Clear all user-related data
      const id = await AsyncStorage.getItem('id');
      if (id) {
        await AsyncStorage.removeItem(`user${JSON.parse(id)}`);
      }
      await AsyncStorage.multiRemove(['id', 'token']);
      console.log('User logged out successfully');
      navigation.replace("LoginPage");
    } catch (error) {
      console.log('Logout error:', error);
      navigation.replace("LoginPage");
    }
  };

  const handleClearCache = async () => {
    await AsyncStorage.clear();
    navigation.replace("Bottom Navigation");
  };


  return (
    <ScrollView contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}>
      <View style={styles.container}>
       <View style={styles.container}>
          <StatusBar backgroundColor={COLORS.lightWhite}/>
          <View style={{width: '100%'}}>
            <Image 
              source={require('../assets/images/background.png')}
              style={styles.cover}
            />
          </View>
          <View style={styles.profileContainer}>
            <Image 
                source={require('../assets/images/profile.png')}
                style={styles.profile}
              />
              <Text style={styles.name}>
                {userLogin === true ? userData.username : "Please Log In Into Your Account"}
              </Text>

              {userLogin === true && (
                <Text style={styles.location}>
                  {userData.location || "Location not set"}
                </Text>
              )}

              {userLogin === false ? (
                <TouchableOpacity onPress={()=>navigation.navigate('LoginPage')}>
                  <View style={styles.loginBtn}>
                    <Text style={styles.menuText}> LOG IN </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.loginBtn}>
                  <Text style={styles.menuText}> {userData.email} </Text>
                </View>
              )}

              {userLogin === false ? (
                  <View></View>
              ) : (
                  <View style={styles.menuWrapper}>
                    <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
                        <View style={styles.menuItem(0.2)}>
                            <MaterialCommunityIcons 
                            name="heart-outline"
                            color={COLORS.primary}
                            size={24}
                            />
                            <Text style={styles.menuText}>Favorites</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                        <View style={styles.menuItem(0.5)}>
                            <MaterialCommunityIcons 
                            name="truck-delivery-outline"
                            color={COLORS.primary}
                            size={24}
                            />
                            <Text style={styles.menuText}>Orders</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <View style={styles.menuItem(0.5)}>
                            <SimpleLineIcons 
                            name="bag"
                            color={COLORS.primary}
                            size={24}
                            />
                            <Text style={styles.menuText}>Cart</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() =>handleClearCache()}>
                        <View style={styles.menuItem(0.5)}>
                            <MaterialCommunityIcons 
                            name="cached"
                            color={COLORS.primary}
                            size={24}
                            />
                            <Text style={styles.menuText}>Clear Cache</Text>
                        </View>
                    </TouchableOpacity>




                    <TouchableOpacity onPress={() => handleLogout()}>
                        <View style={styles.menuItem(0.5)}>
                            <AntDesign 
                            name="logout"
                            color={COLORS.primary}
                            size={24}
                            />
                            <Text style={styles.menuText}>Log Out</Text>
                        </View>
                    </TouchableOpacity>

                  </View>               
              )}  
          </View>
       </View>
    </View>
    </ScrollView>
  );
};

export default Profile;
