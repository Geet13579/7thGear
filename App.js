import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import Routes from "./router/Routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient";

// Load fonts
const loadFonts = async () => {
  await Font.loadAsync({
    "Geist-Regular": require("./assets/fonts/Geist-Regular.ttf"),
    "Geist-Medium": require("./assets/fonts/Geist-Medium.ttf"),
    "Geist-SemiBold": require("./assets/fonts/Geist-SemiBold.ttf"),
    "Geist-Bold": require("./assets/fonts/Geist-Bold.ttf"),
    "Geist-Black": require("./assets/fonts/Geist-Black.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn("Error loading fonts", e);
      } finally {
        setFontsLoaded(true);
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </QueryClientProvider>
  );
}


