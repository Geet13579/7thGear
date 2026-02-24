import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface CommunityPostState {
    posts: any[];
    setPosts: (posts: any[]) => void;
}

export const useCommunityPostStore = create<CommunityPostState>()(
    persist(
        (set) => ({
            posts: [],
            setPosts: (posts: any[]) => set({ posts }),
        }),
        {
            name: "community-post",
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);