import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import Routes from "./router/Routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";

// Load fonts
const loadFonts = async () => {
  await Font.loadAsync({
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

  // FIXED THEME (no more error)
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
      border: "transparent",
    },
    fonts: {
      medium: { fontFamily: "Geist-Medium" },
      semibold: { fontFamily: "Geist-SemiBold" },
      regular: { fontFamily: "Geist-Regular" },
      



      bold: { fontFamily: "Geist-Bold" },
      heavy: { fontFamily: "Geist-Black" },
    },
  };

  
  const linking = {
    prefixes: ["7thgear://", "https://7thgear.in"],
    config: {
      screens: {
        MainTabs: {
          screens: {
            HomeStack: {
              screens: {
                eventDetail: "event/:eventId",
              },
            },
          },
        },
      },
    },
  };

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" backgroundColor="#fff" />
        <NavigationContainer theme={navTheme} linking={linking}>
          <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Routes />
          </View>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
