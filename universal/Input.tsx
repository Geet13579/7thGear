import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  label,
  maxLength,
  style
}) => {

  return (
    <View style={style}>
      <Text
        allowFontScaling={false}
        maxFontSizeMultiplier={1}
        style={styles.label}>{label}</Text>
      <TextInput
      
        style={styles.input}
        placeholder={placeholder}
        allowFontScaling={false}
        maxFontSizeMultiplier={1}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType || "default"}
        placeholderTextColor={"#B7B7B7"}
        maxLength={maxLength}
        numberOfLines={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: "#0F172A",
    fontSize: 13,
    marginBottom: 3,
    fontFamily: 'Geist-Medium'

  },
  input: {
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#F5F5F5",
  },
});

export default Input;
