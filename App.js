import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import BottomTabNavigation from './navigation/BottomTabNavigation';

const Stack = createNativeStackNavigator();


export default function App(){
    const [fontsLoaded] = useFonts({
        regular: require("./assets/fonts/Poppins Regular 400.ttf"),
        light: require("./assets/fonts/Poppins Light 300.ttf"),
        bold: require("./assets/fonts/Poppins Bold 700.ttf"),
        medium: require("./assets/fonts/Poppins Medium 500.ttf"),
        extrabold: require("./assets/fonts/Poppins ExtraBold 800.ttf"),
        semibold: require("./assets/fonts/Poppins SemiBold 600.ttf"),
    })

    const onLayoutRootView = useCallback(async() =>{

        if (fontsLoaded){
            await SplashScreen.hideAsync();
        }
    },[fontsLoaded] );

    if(!fontsLoaded){
        return null;
    }

    return (
       <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name='Bottom Navigation'
            component={BottomTabNavigation}
            options={{headerShown:false}}
            />
        </Stack.Navigator>
       </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontFamily: "regular",
        fontSize: 20,
    }
});