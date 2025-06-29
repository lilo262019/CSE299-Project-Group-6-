import 'react-native-reanimated'; // Must be the very first line

import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/PoppinsLight-l4Zw.otf'),
    'Poppins-Medium': require('../assets/fonts/PoppinsMedium-1JPv.otf'),
    'Poppins-SemiBold': require('../assets/fonts/PoppinsSemibold-8l8n.otf'),
    'Poppins-Bold': require('../assets/fonts/PoppinsBold-GdJA.otf'),
    'Poppins-ExtraBold': require('../assets/fonts/PoppinsExtrabold-zDdL.otf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
