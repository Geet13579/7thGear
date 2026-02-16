// CommunityScreen.js
import React from "react";
import { View } from "react-native";
import UniversalCategoryList from "../../universal/UniversalCategoryList";
import { StyleSheet } from "react-native";

const ParticipantDetailsFlatList = ({ filters, filter, setFilter }) => {

  const onCategorySelect = (item) => {
    setFilter(item.cat_uid);
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
        data={filters}
        showIcon={false}
        page="Booking"
        onSelect={onCategorySelect}
        styles={HomeFlatListstyles}
        selectedId={filter}
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
    paddingHorizontal: 23,
    borderRadius: 30,
    gap: 5,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ParticipantDetailsFlatList;
