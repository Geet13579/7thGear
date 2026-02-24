import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FilterButton from "./filter";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <Ionicons name="search" size={22} />

      {/* Input */}
      <TextInput
        placeholder="Where to?"
        placeholderTextColor="#A7A7A7"
        style={styles.input}
      />

      <FilterButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },

 
});

export default SearchBar;
