import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FilterButton = () => {
  return (
    <>
      {/* Filter Button */}
      <TouchableOpacity activeOpacity={0.7} style={styles.filterButton}>
        <Ionicons name="filter" size={20} color="#fff" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: "#FF4D5A", // pink-red from your design
    padding: 8,
    borderRadius: 50,
  },
});

export default FilterButton;
