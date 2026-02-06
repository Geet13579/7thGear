import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

const selectedCategoryStore = create(
    persist(
        (set) => ({
            selectedCategory: null,
            setSelectedCategory: (category: string) => set({ selectedCategory: category }),
        }),
        {
            name: "selected-category",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default selectedCategoryStore;