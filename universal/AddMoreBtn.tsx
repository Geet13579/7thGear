import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "./text";

const AddMoreBtn = ({ onPress }) => (
  <TouchableOpacity
    style={styles.addMoreButton}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Feather name="plus" size={16} color="#FF385C" />
    <CustomText style={styles.addMoreText}>Add More</CustomText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  addMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "#FF385C",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  addMoreText: {
    color: "#FF385C",
    fontSize: 14,
    fontWeight: "600",
  },
});
export default AddMoreBtn;
