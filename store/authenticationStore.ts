import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Platform, Alert } from "react-native";

// Debug function to check storage
const checkStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    console.log("All storage keys:", keys);
    console.log("All storage values:", result);

    if (Platform.OS === "ios") {
      const authStorage = await AsyncStorage.getItem("auth-storage");
      console.log("Auth storage content:", authStorage);
    }

    return true;
  } catch (error) {
    console.error("Error checking storage:", error);
    return false;
  }
};

// Helper function to clear storage
const clearStorage = async () => {
  try {
    // First check what's in storage
    await checkStorage();

    // Try multiple approaches to clear the auth storage
    await AsyncStorage.removeItem("auth-storage");

    // Verify it was cleared
    const authStorage = await AsyncStorage.getItem("auth-storage");
    console.log("Auth storage after clearing:", authStorage);

    if (Platform.OS === "ios" && authStorage) {
      console.log("First attempt to clear storage failed, trying again");
      // If first attempt failed, try again with a different approach
      await AsyncStorage.clear();
      const authStorageAfterClear = await AsyncStorage.getItem("auth-storage");
      console.log("Auth storage after full clear:", authStorageAfterClear);
    }

    console.log("Auth storage cleared successfully");
    return true;
  } catch (error) {
    console.error("Error clearing auth storage:", error);
    if (Platform.OS === "ios") {
      Alert.alert("Storage Error", `Error clearing storage: ${error.message}`);
    }
    return false;
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      loginStatus: false,
      token: null,

      // Log in and set loginStatus and token
      logIn: (authToken) => {
        console.log("Login called with token:", authToken);
        set({ loginStatus: true, token: authToken });
      },

      // Log out and clear loginStatus and token
      logOut: async () => {
        try {
          console.log("Logout called, current state:", get());

          // First clear the state
          set({ loginStatus: false, token: null });
          console.log("State cleared, now clearing storage");

          // Then manually clear the storage for iOS compatibility
          const storageCleared = await clearStorage();

          console.log(
            "Logout completed in store, storage cleared:",
            storageCleared
          );

          if (Platform.OS === "ios") {
            // Force a reload of the store from storage
            setTimeout(async () => {
              await checkStorage();
            }, 500);
          }

          return true;
        } catch (error) {
          console.error("Error in store logout:", error);

          if (Platform.OS === "ios") {
            Alert.alert("Logout Error", `Error in store: ${error.message}`);
          }

          // Still set the state to logged out even if storage clearing fails
          set({ loginStatus: false, token: null });
          return false;
        }
      },

      // Debug function to check current state
      debugState: () => {
        const state = get();
        console.log("Current auth state:", state);
        return state;
      },
    }),
    {
      name: "auth-storage", // Name of the storage entry
      storage: createJSONStorage(() => AsyncStorage), // Storage mechanism
      partialize: (state) => ({
        loginStatus: state.loginStatus,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        console.log("Storage rehydrated with state:", state);
      },
    }
  )
);

export default useAuthStore;
