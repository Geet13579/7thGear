import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

const wishlistStore = create(
  persist(
    (set) => ({
      wishlist: {},
      setWishlist: (wishlist: { [key: string]: boolean }) =>
        set({ wishlist: wishlist }),
    }),
    {
      name: "wishlist",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default wishlistStore;
