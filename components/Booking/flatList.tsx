// CommunityScreen.js
import React from "react";
import { View } from "react-native";
import UniversalCategoryList from "../../universal/UniversalCategoryList";
import { StyleSheet } from "react-native";

const COMMUNITY_DATA = [
  { cat_uid: "1", cat_name: "Upcoming" },
  { cat_uid: "2", cat_name: "Past" },
  { cat_uid: "3", cat_name: "Cancelled" }
];

const HomeFlatList = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("1");
  const onCategorySelect = (item) => {
    console.log("Community selected →", item.cat_name);
    setSelectedCategory(item.cat_uid);
  };

  return (
    <View style={{ backgroundColor: "#F6F6F6", paddingHorizontal:10,paddingVertical:4, marginBottom:15, borderRadius:30 }}>
      <UniversalCategoryList
        data={COMMUNITY_DATA}
        showIcon={false}
        page="Booking"
        onSelect={onCategorySelect}
        styles={HomeFlatListstyles}
      />
    </View>
  );
};



const HomeFlatListstyles = StyleSheet.create({

  item: {
    backgroundColor: '#F6F6F6',
    paddingRight: 0,
  },
  title: {
    fontSize: 16,
  },
  card: {
    height: 34,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 5,
    marginVertical: 5,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  }

});

export default HomeFlatList;
