import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import { showAlert } from '../components/showAlert';
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './login.style';
import {Button, BackBtn} from '../components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { COLORS } from '../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    email: Yup.string().email('Provide a valid email address').required('Required'),
  });


const LoginPage = ({navigation}) => {

    const [loader, setLoader] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [obsecureText, setObsecureText] = useState(false);

  
    const testBackendConnection = async () => {
        try {
            const baseUrl = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
            const testEndpoint = `${baseUrl}/api/products`;
            console.log('Testing backend connection to:', testEndpoint);
            const response = await axios.get(testEndpoint);
            console.log('Backend connection successful:', response.status);
            return true;
        } catch (error) {
            console.log('Backend connection failed:', error.message);
            return false;
        }
    };

    const inValidForm = () => {
    showAlert(
          "Invalid Form",
          "Please provide all required fields",
          [
            {
              text: "Cancel", onPress: ()=> {}
            },
            {
              text: "Continue", onPress: ()=> {}
            },
          
          ]
        )
      };

      const login = async(values) => {
        setLoader(true)
        console.log('Login attempt with:', { email: values.email, password: values.password ? '***' : 'empty' });
        
        try {
            const isBackendConnected = await testBackendConnection();
            if (!isBackendConnected) {
                setLoader(false);
                showAlert(
                    "Connection Error",
                    "Cannot connect to the server. Please ensure the backend server is running on port 3000.",
                    [
                        {
                            text: "OK", 
                            onPress: () => {}
                        }
                    ]
                )
                return;
            }
            
            const baseUrl = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
            const endpoint = `${baseUrl}/api/login`
            const data = values;
            
            console.log('Making request to:', endpoint);

            const response = await axios.post(endpoint, data)
            console.log('Response received:', response.status, response.data);
            
            if(response.status === 200){
                setLoader(false);
                const user = response.data;
                console.log('Login successful, user data:', user);

                                await AsyncStorage.setItem(`user${user._id}`, JSON.stringify(user))
                                await AsyncStorage.setItem("id", JSON.stringify(user._id))
                                await AsyncStorage.setItem("token", JSON.stringify(user.token))
                
                                console.log('User data stored in AsyncStorage');
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Bottom Navigation' }],
                                });
                                setTimeout(() => {
                                    navigation.navigate('Profile');
                                }, 0);
            }
        } catch (error) {
            setLoader(false);
            console.log('Login error:', error);
          
            if (error.response) {
                console.log('Server error response:', error.response.status, error.response.data);
                let errorMessage = error.response.data?.message || "Login failed. Please check your credentials.";
                if (error.response.status === 401) {
                    if (errorMessage.includes("Wrong Credential")) {
                        errorMessage = "Email not found. Please check your email address or create a new account.";
                    } else if (errorMessage.includes("Wrong Password")) {
                        errorMessage = "Incorrect password. Please try again.";
                    }
                }
                
                Alert.alert(
                    "Login Error",
                    errorMessage,
                    [
                        {
                            text: "OK", 
                            onPress: () => {}
                        }
                    ]
                )
            } else if (error.request) {
                console.log('Network error - no response received');
                Alert.alert(
                    "Network Error",
                    "Unable to connect to server. Please check your internet connection and ensure the backend server is running.",
                    [
                        {
                            text: "OK", 
                            onPress: () => {}
                        }
                    ]
                )
            } else {
                console.log('Other error:', error.message);
                Alert.alert(
                    "Error",
                    "An unexpected error occurred. Please try again.",
                    [
                        {
                            text: "OK", 
                            onPress: () => {}
                        }
                    ]
                )
            }
        }
      };



  return (
    <ScrollView>
        <SafeAreaView style={{marginHorizontal: 20}}>
            <View>
                <BackBtn onPress={() => navigation.goBack()}/>
                <Image 
                source={require('../assets/images/loginpg.png')}
                style={styles.cover}
                />

                <Text style={styles.title}>#1 Cosmetic App in Bangladesh</Text>
                
                <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={validationSchema}
                onSubmit={values => login(values)}
                >

                {({ handleChange, handleBlur,touched,handleSubmit, values, errors, isValid, setFieldTouched }) => (
                <View>
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.lightWhite)}>
                            <MaterialCommunityIcons 
                                name='email-outline'
                                size={20}
                                color={COLORS.gray}
                                style={styles.iconStyle}
                            />
                            <TextInput 
                                placeholder='Enter Email'
                                onFocus={() => {setFieldTouched('email')}}
                                onBlur={() => {handleBlur('email')}}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={{flex:1}}
                                id="login-email"
                                name="email"
                                autoComplete="email"
                            />
                        </View>

                            {touched.email && errors.email && (
                                <Text style={styles.errorMessage}>{errors.email}</Text>
                            )}

                    </View>

                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputWrapper(touched.password ? COLORS.secondary : COLORS.offwhite)}>
                            <MaterialCommunityIcons 
                                name='lock-outline'
                                size={20}
                                color={COLORS.gray}
                                style={styles.iconStyle}
                            />
                            <TextInput 
                                secureTextEntry={obsecureText}
                                placeholder='Password'
                                onFocus={() => {setFieldTouched('password')}}
                                onBlur={() => {handleBlur('password')}}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={{flex:1}}
                                id="login-password"
                                name="password"
                                autoComplete="current-password"
                            />

                            <TouchableOpacity onPress={() => {setObsecureText(!obsecureText)}}>
                                <MaterialCommunityIcons 
                                name={obsecureText ? "eye-outline" : "eye-off-outline"} 
                                size={18}
                                />
                            </TouchableOpacity>

                        </View>

                            {touched.password && errors.password && (
                                <Text style={styles.errorMessage}>{errors.password}</Text>
                            )}

                    </View>


                     <Button 
                     loader={loader} 
                     title={"L O G I N"} 
                     onPress={isValid ? handleSubmit: inValidForm } 
                     isValid={isValid}
                     />
                
                    <Text 
                    style={styles.registration} 
                    onPress={() =>{navigation.navigate('SignUp')}}
                    >Register
                    </Text>
                
                </View>
                    )}


                </Formik>

            </View>
        </SafeAreaView>
    </ScrollView>
  )
}

export default LoginPage
