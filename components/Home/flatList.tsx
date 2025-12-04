// CommunityScreen.js
import React from "react";
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

const COMMUNITY_DATA = [
  { id: "1", title: "Treks", icon: Feather, name: "trending-up" },
  { id: "2", title: "Biking", icon: MaterialCommunityIcons, name: "motorbike" },
  { id: "3", title: "Camping", icon: FontAwesome5, name: "campground" },
  { id: "4", title: "Racing", icon: FontAwesome, name: "flag-checkered" },
  { id: "5", title: "Retreats", icon: MaterialIcons, name: "celebration" },
  { id: "6", title: "Beach", icon: MaterialCommunityIcons, name: "beach" },
];

const HomeFlatList = () => {
  const onCategorySelect = (item) => {
    console.log("Community selected →", item.title);
  };

  return (
    <View>
      <UniversalCategoryList
        data={COMMUNITY_DATA}
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

        backgroundColor: '#f9c2ff',
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
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,

    }

});

export default HomeFlatList;
