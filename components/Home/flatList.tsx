// CommunityScreen.js
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import UniversalCategoryList from "../../universal/UniversalCategoryList";
import { StyleSheet } from "react-native";
import { getRequest } from "../../api/commonQuery";
import { GET_CATEGORY_LIST } from "../../constants/apiEndpoints";
import selectedCategoryStore from "../../store/selectedCategory";

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

const HomeFlatList = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(false);
  const setSelectedCategory = selectedCategoryStore(
    (state) => state.setSelectedCategory,
  );

  const getCategories = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const onCategorySelect = (item) => {
    setSelectedCategory(item.cat_uid);
  };

  useEffect(() => {
    getCategories();
  }, []);

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
