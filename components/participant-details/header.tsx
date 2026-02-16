import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Title from "../../universal/Title";
import { colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.7} style={styles.backButton}>
        <Feather
          name="chevron-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      <Title title="Participant Details" color={colors.black} />
      <TouchableOpacity activeOpacity={0.7} style={styles.menuButton}>
        <Feather name="more-vertical" size={24} color={colors.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
  },
});

export default Header;
