// UniversalCategoryList.js
import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import CustomText from "../universal/lightText";

const UniversalCategoryList = ({ data, showIcon = false, onSelect, styles, page }) => {
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
        const Icon = item.icon;

        return (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View
              style={[styles.card, 
                
                
                isSelected && page === "Community" && { backgroundColor: 'black', borderColor: 'black' },
                isSelected && page === "Booking" && { backgroundColor: 'white', borderColor: 'black', borderRadius: 30 }
              ]}
            >
              {/* Optional Icon */}
              {showIcon && Icon && (
                <Icon
                  name={item.name}
                  size={24}
                  color={isSelected  ? "black" : "#94A3B8"}
                />
              )}

              <CustomText
                style={{
                  color: isSelected && showIcon ? "black" : isSelected && page === "Community" ? "white" : "#94A3B8",
                  fontSize: 14,
                  fontFamily: isSelected && page === "Community" ? "Geist-Regular" :"Geist-Bold" ,
                }}
              >
                {item.title}
              </CustomText>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};



export default UniversalCategoryList;
