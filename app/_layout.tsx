import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import * as Battery from "expo-battery";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ClickCountProvider } from "./appContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isSplashVisible, setSplashVisible] = useState(true);
  const [batteryPercentage, setBatteryPercentage] = useState<number | null>(null);

  const backgroundColor = batteryPercentage !== null && batteryPercentage > 50 ? "lightblue" : "salmon";

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        setSplashVisible(false);
        SplashScreen.hideAsync();
      }, 3000); // Show the splash screen for 3 seconds
    }
  }, [loaded]);

  useEffect(() => {
    // Fetch battery level on mount
    const fetchBatteryLevel = async () => {
      const batteryLevel = await Battery.getBatteryLevelAsync();
      setBatteryPercentage(batteryLevel * 100); // Battery level is returned as a fraction (0.0 - 1.0)
    };

    fetchBatteryLevel();

    // Set up battery level listener for updates
    const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryPercentage(batteryLevel * 100);
    });

    return () => {
      subscription.remove(); // Clean up listener
    };
  }, []);

  if (!loaded || isSplashVisible) {
    return (
      <View style={[styles.splashContainer, { backgroundColor }]}>
        <Text style={styles.splashText}>Bienvenue sur Chat is my best friend</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <View style={styles.appContainer}>
        <ClickCountProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" backgroundColor={backgroundColor} />
        </ClickCountProvider>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  splashText: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "SpaceMono", // Use the loaded font
  },
  safeArea: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
  },
});
