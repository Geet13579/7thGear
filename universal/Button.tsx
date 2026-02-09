import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/Colors";
import CustomText from "./text";

export const Button = ({
  title,
  onClick,
  disabled,
}: {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onClick}
      style={styles.buttonContainer}
      disabled={disabled}
    >
      <LinearGradient
        colors={["#FF385C", "#EF3053"]}
        locations={[1, 1]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <CustomText style={styles.buttonText}>{title}</CustomText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const SignupButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onClick}>
      <View style={styles.SignupButton}>
        <CustomText style={{ color: "#FF385C" }}>{title}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    overflow: "hidden",
    minWidth: 120,
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  SignupButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: "center",
    borderColor: colors.primary,
    borderWidth: 1,
  },
});
