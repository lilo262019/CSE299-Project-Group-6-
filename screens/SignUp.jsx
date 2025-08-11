import { ScrollView, Text, View, TouchableOpacity, Image, TextInput, Platform } from 'react-native'
import { showAlert } from '../components/showAlert';
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './login.style';
import {Button, BackBtn} from '../components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons, Ionicons} from "@expo/vector-icons"
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Required'),
    email: Yup.string().email('Provide a valid email address').required('Required'),
    location: Yup.string().min(3, 'Provide a valid location').required('Required'),
    username: Yup.string().min(3, 'Provide a valid username').required('Required'),
  });
const SignUp = ({navigation}) => {

    const [loader, setLoader] = useState(false);
    const [obsecureText, setObsecureText] = useState(true);

    

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
            {defaultIndex: 1}
          ]
        )
      };

      const registerUser = async(values) => {
        setLoader(true);
        try {
            const baseUrl = Platform.OS === 'web' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';
            const endpoint = `${baseUrl}/api/register`;
            const data = values;

            console.log('Registering user with data:', { ...data, password: '***' });
            console.log('Making request to:', endpoint);
            console.log('Full request data:', data);

            const response = await axios.post(endpoint, data);
            console.log('Registration response:', response.status, response.data);
            
            if(response.status === 201){
                setLoader(false);
                
                try {
                    console.log('Auto-login after registration...');
                    const loginData = {
                        email: data.email,
                        password: data.password
                    };
                    
                    const loginResponse = await axios.post(`${baseUrl}/api/login`, loginData);
                    console.log('Auto-login successful:', loginResponse.data);
                    
                    if (loginResponse.status === 200) {
                        const user = loginResponse.data;

                        await AsyncStorage.setItem(`user${user._id}`, JSON.stringify(user));
                        await AsyncStorage.setItem("id", JSON.stringify(user._id));
                        await AsyncStorage.setItem("token", JSON.stringify(user.token));
                        
                        console.log('User data stored in AsyncStorage');
 
                                                navigation.reset({
                                                    index: 0,
                                                    routes: [{ name: 'Profile' }],
                                                });
                    }
                } catch (loginError) {
                    console.log('Auto-login failed:', loginError);

                    navigation.replace('LoginPage');
                }
            }
        } catch (error) {
            setLoader(false);
            console.log('Registration error:', error);
            console.log('Error response:', error.response?.data);
            console.log('Error status:', error.response?.status);
            
            if (error.response) {

                const errorMessage = error.response.data?.message || "Registration failed. Please try again.";
                console.log('Server error message:', errorMessage);
                
     
                let alertTitle = "Registration Error";
                let userFriendlyMessage = errorMessage;
                
                if (error.response.status === 400) {
                    alertTitle = "Invalid Data";
                    if (errorMessage.includes("Email already exists")) {
                        userFriendlyMessage = "This email is already registered. Please use a different email address or try logging in instead.";
                    } else if (errorMessage.includes("required fields")) {
                        userFriendlyMessage = "Please fill in all required fields correctly.";
                    }
                } else if (error.response.status === 500) {
                    alertTitle = "Server Error";
                    userFriendlyMessage = "Something went wrong on our end. Please try again later.";
                }
                
                showAlert(
                    alertTitle,
                    userFriendlyMessage,
                    [
                        {
                            text: "OK", 
                            onPress: () => {}
                        }
                    ]
                );
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
                );
            } else {
                // Other errors
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
                );
            }
        }
      } 

  return (
    <ScrollView>
    <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
            <BackBtn onPress={() => navigation.goBack()}/>
            <Image 
            source={require('../assets/images/loginpg.png')}
            style={{ height: SIZES.height/3,
            width: SIZES.width-30,
            resizeMode: "contain",
            marginBottom: SIZES.xxLarge}}
            />

            <Text style={styles.title}>Welcome to Aureva!</Text>
            
            <Formik
            initialValues={{email: '', password: '', location: "", username: ""}}
            validationSchema={validationSchema}
            onSubmit={values => registerUser(values)}
            >

            {({ handleChange, handleBlur,touched,handleSubmit, values, errors, isValid, setFieldTouched }) => (
            <View>

                <View style={styles.wrapper}>
                    <Text style={styles.label}>Username</Text>
                    <View style={styles.inputWrapper(touched.username ? COLORS.secondary : COLORS.offwhite)}>
                        <MaterialCommunityIcons 
                            name='face-man-profile'
                            size={20}
                            color={COLORS.gray}
                            style={styles.iconStyle}
                        />
                        <TextInput 
                            placeholder='Choose Your Username'
                            onFocus={() => {setFieldTouched('username')}}
                            onBlur={() => {handleBlur('username')}}
                            value={values.username}
                            onChangeText={handleChange('username')}
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={{flex:1}}
                            id="signup-username"
                            name="username"
                            autoComplete="username"
                        />
                    </View>

                        {touched.username && errors.username && (
                            <Text style={styles.errorMessage}>{errors.username}</Text>
                        )}

                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
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
                            id="signup-email"
                            name="email"
                            autoComplete="email"
                        />
                    </View>

                        {touched.email && errors.email && (
                            <Text style={styles.errorMessage}>{errors.email}</Text>
                        )}

                </View>

                <View style={styles.wrapper}>
                    <Text style={styles.label}>Location</Text>
                    <View style={styles.inputWrapper(touched.location ? COLORS.secondary : COLORS.offwhite)}>
                        <Ionicons 
                            name='location-outline'
                            size={20}
                            color={COLORS.gray}
                            style={styles.iconStyle}
                        />
                        <TextInput 
                            placeholder='Enter Your Location'
                            onFocus={() => {setFieldTouched('location')}}
                            onBlur={() => {handleBlur('location')}}
                            value={values.location}
                            onChangeText={handleChange('location')}
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={{flex:1}}
                            id="signup-location"
                            name="location"
                            autoComplete="address-level2"
                        />
                    </View>

                        {touched.location && errors.location && (
                            <Text style={styles.errorMessage}>{errors.location}</Text>
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
                            secureTextEntry={!obsecureText}
                            placeholder='Password'
                            onFocus={() => {setFieldTouched('password')}}
                            onBlur={() => {handleBlur('password')}}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            autoCapitalize='none'
                            autoCorrect={false}
                            style={{flex:1}}
                            id="signup-password"
                            name="password"
                            autoComplete="new-password"
                        />

                        <TouchableOpacity onPress={() => {setObsecureText(!obsecureText)}}>
                            <MaterialCommunityIcons 
                            name={obsecureText ? "eye-off-outline" : "eye-outline"} 
                            size={18}
                            />
                        </TouchableOpacity>

                    </View>

                        {touched.password && errors.password && (
                            <Text style={styles.errorMessage}>{errors.password}</Text>
                        )}

                </View>


                 <Button 
                 title={"S I G N U P"} 
                 onPress={isValid ? handleSubmit: inValidForm } 
                 loader={loader}
                 isValid={isValid}/>
            
            
            </View>
                )}


            </Formik>

        </View>
    </SafeAreaView>
</ScrollView>
  )
}

export default SignUp