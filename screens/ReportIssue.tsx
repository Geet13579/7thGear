import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Container from "../universal/Container";
import Title from "../universal/Title";
import CustomText from "../universal/lightText";
import { colors } from "../constants/Colors";

const REPORT_REASONS = [
  "Spam / Scam",
  "Inappropriate Content",
  "False or Misleading Information",
  "Fake Event / Host Misconduct",
  "Safety Concern",
  "Copyright Violation",
  "Other",
];

const ReportIssue = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);


  const handleSelect = (index) => {
  setSelected(index);

  const selectedReason = REPORT_REASONS[index];

  if (selectedReason === "Other") {
    navigation.navigate("ReportOtherReason");
  }
};

  const handleSubmit = () => {
    if (selected === null) return;

    const selectedReason = REPORT_REASONS[selected];

    console.log("Reported reason:", selectedReason);

    // API call can go here

    navigation.goBack();
  };

  return (
    <Container>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color={colors.black} />
          </TouchableOpacity>
          <Title title="Report an issue" color={colors.black} />
          <View style={{ width: 24 }} />
        </View>

     {REPORT_REASONS.map((item, index) => (
  <TouchableOpacity
    key={index}
    style={styles.optionRow}
    onPress={() => handleSelect(index)}
  >
    <View style={styles.radioOuter}>
      {selected === index && <View style={styles.radioInner} />}
    </View>
    <CustomText style={styles.optionText}>{item}</CustomText>
  </TouchableOpacity>
))}


        {/* Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <CustomText style={styles.backText}>Back</CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.submitBtn,
              !selected && { opacity: 0.5 },
            ]}
            disabled={selected === null}
          >
            <CustomText style={styles.submitText}>Submit</CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
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
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  optionText: {
    fontSize: 14,
    color: colors.black,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF385C",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  backBtn: {
    borderWidth: 1,
    borderColor: "#FF385C",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backText: {
    color: "#FF385C",
    fontWeight: "600",
  },
  submitBtn: {
    backgroundColor: "#FF385C",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default ReportIssue;
