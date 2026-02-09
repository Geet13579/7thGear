import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "./text";

const Badge = ({
  icon,
  label,
  backgroundColor,
}: {
  icon?: any;
  label?: string;
  backgroundColor: string;
}) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      backgroundColor: backgroundColor,
      padding: 5,
      borderRadius: 5,
    },
    text: {
      color: "#fff",
      fontSize: 12,
    },
  });

  return (
    <View style={styles.container}>
      {icon}
      {label && <CustomText style={styles.text}>{label}</CustomText>}
    </View>
  );
};

export default Badge;