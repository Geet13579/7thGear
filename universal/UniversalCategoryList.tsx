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
  selectedId: controlledSelectedId,
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState("1");

  const selectedId =
    controlledSelectedId !== undefined
      ? controlledSelectedId
      : internalSelectedId;

  const handlePress = (item) => {
    setInternalSelectedId(item.cat_uid);
    onSelect && onSelect(item);
  };

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.cat_uid}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const isSelected = selectedId === item.cat_uid;
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
              {showIcon && Icon && (
                <Image
                  source={{ uri: IMAGE_URL + Icon }}
                  style={{ width: 24, height: 24 }}
                />
              )}

              <CustomText
                style={{
                  color: isSelected ? "#000" : "#94A3B8",
                  fontSize: 14,
                  fontFamily:
                    isSelected && page === "Community"
                      ? "Geist-Regular"
                      : "Geist-Bold",
                }}
              >
                {item.length > 10
                  ? item.cat_name.slice(0, 10) + "..."
                  : item.cat_name}
              </CustomText>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default UniversalCategoryList;
