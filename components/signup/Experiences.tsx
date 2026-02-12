import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "../../universal/text";
import Label from "../../universal/Label";

const experiences = [
  "🚴 Biking",

  "🏕️ Camping",

  "🥾 Trekking",

  "🦁 Wildlife",

  "🎉 Retreat",

  "🏖️ Beach",

  "🧗 Adventure",

  "🧘 Wellness",
];

const Experiences = ({ interestedCategories, setInterestedCategories }) => {
  return (
    <View style={styles.fieldContainer}>
      <Label label="What type of experiences excite you the most? *"/>
      <View style={styles.genderContainer}>
        {experiences.map((g) => (
          <TouchableOpacity
            key={g}
            style={[
              styles.genderButton,
              interestedCategories.includes(g) && styles.genderButtonActive,
            ]}
            onPress={() => {
              if (interestedCategories.includes(g)) {
                setInterestedCategories(
                  interestedCategories.filter((i) => i !== g),
                );
              } else {
                setInterestedCategories([...interestedCategories, g]);
              }
            }}
          >
            <CustomText
              style={[
                styles.genderText,
                interestedCategories.includes(g) && styles.genderTextActive,
              ]}
            >
              {g}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  genderContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    flexWrap: "wrap",
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  genderButtonActive: {
    backgroundColor: "#EF3053",
    borderColor: "#EF3053",
  },
  genderText: {
    fontSize: 14,
    color: "#64748B",
  },
  genderTextActive: {
    color: "#FFFFFF",
    fontFamily: "Geist-Medium",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: "Geist-Medium",
    color: "#0F172A",
    marginBottom: 6,
  },
});

export default Experiences;
