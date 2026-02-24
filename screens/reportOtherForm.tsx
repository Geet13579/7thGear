import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Container from "../universal/Container";
import Title from "../universal/Title";
import CustomText from "../universal/lightText";
import { colors } from "../constants/Colors";

const ReportOtherReason = () => {
  const navigation = useNavigation();
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason.trim()) return;

    console.log("Other reason:", reason);

    // API CALL HERE

    navigation.navigate("Home"); // or goBack()
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} color={colors.black} />
          </TouchableOpacity>
          <Title title="Report an issue" color={colors.black} />
          <View style={{ width: 24 }} />
        </View>

        {/* Text Area */}
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Please enter your reason here"
            placeholderTextColor="#9CA3AF"
            value={reason}
            onChangeText={setReason}
            multiline
            textAlignVertical="top"
          />
        </View>

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
              !reason.trim() && { opacity: 0.5 },
            ]}
            disabled={!reason.trim()}
            onPress={handleSubmit}
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
  textAreaContainer: {
    marginTop: 20,
  },
  textArea: {
    height: 180,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: colors.black,
    backgroundColor: "#fff",
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


export default ReportOtherReason;
