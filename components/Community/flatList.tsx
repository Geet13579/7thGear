// HomeScreen.js
import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import UniversalCategoryList from "../../universal/UniversalCategoryList";
import { StyleSheet } from "react-native";
import { getRequest } from "../../api/commonQuery";
import { GET_CATEGORY_LIST } from "../../constants/apiEndpoints";

const HOME_DATA = [
  { id: "1", cat_name: "ALL" },
  { id: "2", cat_name: "Trekking" },
  { id: "3", cat_name: "Camping" },
  { id: "4", cat_name: "Adventure" },
  { id: "5", cat_name: "Wellness" },
];

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

const CommunityFlatList = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const onCategorySelect = (item) => {
    setSelectedCategory(item.cat_uid);
  };

  const getCategories = async () => {
    try {
      const response = await getRequest<{
        status: boolean;
        data: Categories[];
      }>(GET_CATEGORY_LIST);
      if (response.status) {
        setCategories(response.data);
        setSelectedCategory(response.data[0].cat_uid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <FlatList
      horizontal
      data={categories}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.catBtn,
            selectedCategory === item.cat_uid && styles.selectedCatBtn,
          ]}
          onPress={() => onCategorySelect(item)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              selectedCategory === item.cat_uid && styles.selectedCatText,
            ]}
          >
            {item.cat_name}
          </Text>
        </TouchableOpacity>
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  catBtn: {
    borderRadius: 25,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#94A3B8",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  selectedCatBtn: {
    backgroundColor: "#000",
  },
  selectedCatText: {
    color: "#fff",
  },
});
export default CommunityFlatList;
