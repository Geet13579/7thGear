// CommunityScreen.js
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import UniversalCategoryList from "../../universal/UniversalCategoryList";
import { StyleSheet } from "react-native";
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { getRequest } from "../../api/commonQuery";
import { GET_CATEGORY_LIST } from "../../constants/apiEndpoints";

interface Categories {
  id: string;
  cat_uid: string;
  cat_img: string;
  cat_name: string;
  cat_desc: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const COMMUNITY_DATA = [
  { id: "1", title: "Treks", icon: Feather, name: "trending-up" },
  { id: "2", title: "Biking", icon: MaterialCommunityIcons, name: "motorbike" },
  { id: "3", title: "Camping", icon: FontAwesome5, name: "campground" },
  { id: "4", title: "Racing", icon: FontAwesome, name: "flag-checkered" },
  { id: "5", title: "Retreats", icon: MaterialIcons, name: "celebration" },
  { id: "6", title: "Beach", icon: MaterialCommunityIcons, name: "beach" },
];

const HomeFlatList = () => {
  const [categories, setCategories] = useState<Categories[]>([]);

  const getCategories = async () => {
    const response = await getRequest<{ status: boolean; data: Categories[] }>(
      GET_CATEGORY_LIST
    );
    if (response.status) {
      setCategories(response.data);
    }
  };
  const onCategorySelect = (item) => {
    console.log("Community selected →", item.title);
  };

  useEffect(()=> {
    getCategories();
  }, [])

  return (
    <View>
      <UniversalCategoryList
        data={categories}
        showIcon={true}
        onSelect={onCategorySelect}
        styles={HomeFlatListstyles}
        page="Home"
      />
    </View>
  );
};

const HomeFlatListstyles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    paddingRight: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  },
  card: {
    height: 55,
    marginRight: 35,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});

export default HomeFlatList;
