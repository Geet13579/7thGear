// UniversalCategoryList.js
import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import CustomText from "../universal/lightText";
import { IMAGE_URL } from "../constants/apiEndpoints";

const UniversalCategoryList = ({
  data,
  showIcon = false,
  onSelect,
  styles,
  page,
}) => {
  const [selectedId, setSelectedId] = useState("1");

  const handlePress = (item) => {
    setSelectedId(item.id);
    onSelect && onSelect(item);
  };

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const isSelected = selectedId === item.id;
        const Icon = item.cat_img;

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handlePress(item)}
          >
            <View
              style={[
                styles.card,

                isSelected &&
                  page === "Community" && {
                    backgroundColor: "black",
                    borderColor: "black",
                  },
                isSelected &&
                  page === "Booking" && {
                    backgroundColor: "white",
                    borderColor: "black",
                    borderRadius: 30,
                  },
              ]}
            >
              <Image
                source={{ uri: IMAGE_URL + Icon }}
                style={{ width: 24, height: 24 }}
              />

              <CustomText
                style={{
                  color:
                    isSelected && showIcon
                      ? "black"
                      : isSelected && page === "Community"
                      ? "white"
                      : "#94A3B8",
                  fontSize: 14,
                  fontFamily:
                    isSelected && page === "Community"
                      ? "Geist-Regular"
                      : "Geist-Bold",
                }}
              >
                {item.cat_name.length > 10 ? item.cat_name.slice(0, 10) + "..." : item.cat_name}
              </CustomText>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default UniversalCategoryList;
