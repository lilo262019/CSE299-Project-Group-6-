import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import { Cart } from './screens';


const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App component rendered");
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  // Use the useFonts hook properly:
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular-400.ttf"),
    light: require("./assets/fonts/Poppins-Light-300.ttf"),
    bold: require("./assets/fonts/Poppins-Bold-700.ttf"),
    medium: require("./assets/fonts/Poppins-Medium-500.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold-800.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold-600.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Bottom Navigation'
            component={BottomTabNavigation}
            options= {{headerShown:false}}
          />

          <Stack.Screen
            name='Cart'
            component={Cart}
            options= {{headerShown:false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
   
