// CommunityScreen.js
import React from "react";
import { View } from "react-native";
import UniversalCategoryList from "../../universal/UniversalCategoryList";
import { StyleSheet } from "react-native";

const COMMUNITY_DATA = [
  { cat_uid: "upcoming", cat_name: "Upcoming" },
  { cat_uid: "past", cat_name: "Past" },
  { cat_uid: "cancelled", cat_name: "Cancelled" },
];

const HomeFlatList = ({
  selectedCategory,
  setSelectedCategory,
  bookings,
  setFilteredBookings,
}) => {
  const onCategorySelect = (item) => {
    setSelectedCategory(item.cat_uid);
    setFilteredBookings(bookings[item.cat_uid] || []);
  };

  return (
    <View
      style={{
        backgroundColor: "#F6F6F6",
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginBottom: 15,
        borderRadius: 30,
      }}
    >
      <UniversalCategoryList
        data={COMMUNITY_DATA}
        showIcon={false}
        page="Booking"
        onSelect={onCategorySelect}
        styles={HomeFlatListstyles}
        selectedId={selectedCategory}
      />
    </View>
  );
};

const HomeFlatListstyles = StyleSheet.create({
  item: {
    backgroundColor: "#F6F6F6",
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeFlatList;
