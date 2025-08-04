import { View, Text, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
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
  const [user, setUser] = useState(null);
  const [userData] = useState(null);
  const [userLogin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');

      try {
        const res = await axios.get(`http://192.168.0.101:3000/api/users/find/${JSON.parse(id)}`, {
          headers: {
            token: `Bearer ${JSON.parse(token)}`
          }
        });
        setUser(res.data);
      } catch (error) {
        console.log("Fetching user failed", error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace("LoginPage");
  };

  const handleClearCache = async () => {
    await AsyncStorage.clear();
    navigation.replace("Bottom Navigation");
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => handleDeleteAccount() }
      ]
    );
  };

  const handleDeleteAccount = async () => {
    const id = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/api/users/${JSON.parse(id)}`, {
        headers: {
          token: `Bearer ${JSON.parse(token)}`
        }
      });

      await AsyncStorage.multiRemove(['id', 'token']);
      navigation.replace("LoginPage");
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

  return (
    <ScrollView>
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


              {userLogin === false ? (
                <TouchableOpacity onPress={()=>navigation.navigate('LoginPage')}>
                  <View style={styles.loginBtn}>
                    <Text style={styles.menuText}>LOG IN </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={styles.loginBtn}>
                  <Text style={styles.menuText}>{userData.email}  </Text>
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

                    <TouchableOpacity onPress={() => confirmDeleteAccount()}>
                        <View style={styles.menuItem(0.5)}>
                            <AntDesign 
                            name="deleteuser"
                            color={COLORS.primary}
                            size={24}
                            />
                            <Text style={styles.menuText}>Delete Account</Text>
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
