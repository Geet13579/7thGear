import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const filters = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Upcoming",
    value: "UPCOMING",
  },
  {
    label: "Past Dates",
    value: "PAST",
  },
];

const Filters = ({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}) => {
  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        const isSelected = selectedFilter === filter.value;

        return (
          <TouchableOpacity
            key={filter.value}
            style={[styles.filterItem, isSelected && styles.selectedFilterItem]}
            onPress={() => setSelectedFilter(filter.value)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.filterText,
                isSelected && styles.selectedFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    padding: 5,
    width: "100%", // 👈 CRITICAL
  },

  filterItem: {
    flex: 1, // 👈 equal width
    alignItems: "center", // 👈 text centered
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 50,
  },

  selectedFilterItem: {
    backgroundColor: "#fff",
  },

  filterText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },

  selectedFilterText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default Filters;
