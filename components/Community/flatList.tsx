// HomeScreen.js
import React from "react";
import { View } from "react-native";
import UniversalCategoryList from "../../universal/UniversalCategoryList";
import { StyleSheet } from "react-native";

const HOME_DATA = [
  { id: "1", cat_name: "ALL" },
  { id: "2", cat_name: "Trekking" },
  { id: "3", cat_name: "Camping" },
  { id: "4", cat_name: "Adventure" },
  { id: "5", cat_name: "Wellness" },
];

const CommunityFlatList = () => {
  const onCategorySelect = (item) => {
    console.log("Home selected →", item.cat_name);
  };

  return (
    <View>
      <UniversalCategoryList
        data={HOME_DATA}
        showIcon={false}         // 👈 Text only for Home
        onSelect={onCategorySelect}
        styles={styles}
        page="Community"
      />
    </View>
  );


 
};

 const styles = StyleSheet.create({
  card: {
    marginRight: 8,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#94A3B8',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5
  }
});
export default CommunityFlatList;
