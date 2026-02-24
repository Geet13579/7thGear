import React from "react";
import { StyleSheet, Text } from "react-native";

const Label = ({ label, style, ...props }: { label: string; style?: any }) => {
  return (
    <Text
      allowFontScaling={false}
      maxFontSizeMultiplier={1}
      textBreakStrategy="simple"
      style={[styles.label, style]}
      {...props}
    >
      {label.split("*").map((part, index, array) => (
        <Text key={index}>
          {part}
          {index < array.length - 1 && <Text style={{ color: "red" }}>*</Text>}
        </Text>
      ))}
    </Text>
  );
};

const styles = StyleSheet.create({
    label: {
    fontSize: 13,
    fontFamily: "Geist-Medium",
    color: "#0F172A",
    marginBottom: 8,
    marginTop: 12,
  },
})

export default Label;
