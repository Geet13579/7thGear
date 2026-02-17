import React from "react";
import CustomText from "./text";
import { StyleSheet, View } from "react-native";
import { colors } from "../constants/Colors";

const NoDataText = ({ message }: { message: string }) => {
  return (
    <View style={styles.container}>
      <CustomText
        style={{
          fontSize: 14,
          fontFamily: "Geist-Regular",
          color: colors.textSecondary,
        }}
      >
        {message}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    padding: 12,
    gap: 10,
  },
});

export default NoDataText;
