import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import Routes from "./router/Routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform, Alert } from "react-native";

/**
 * IMPORTANT: how notifications behave when app is foreground
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert("Must use physical device");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Notification permission denied");
    return null;
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

  console.log("Expo Push Token:", token);

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

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

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        // 🔥 SEND TOKEN TO YOUR BACKEND
        console.log(token);
      }
    });
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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
