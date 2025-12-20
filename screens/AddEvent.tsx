import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/Colors";
import CustomText from "../universal/lightText";
import Title from "../universal/Title";
import { useNavigation } from "@react-navigation/native";
import Container from "../universal/Container";

const AddEvent = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [includedItems, setIncludedItems] = useState([
    "Professional trek leader and support staff",
  ]);
  const [newIncludedItem, setNewIncludedItem] = useState("");
  const [itineraryItems, setItineraryItems] = useState([
    {
      day: 1,
      title: "Arrival & Acclimatization",
      description: "Meet at base camp, gear check, and local sightseeing",
    },
  ]);
  const [newItineraryDay, setNewItineraryDay] = useState("");
  const [newItineraryTitle, setNewItineraryTitle] = useState("");
  const [newItineraryDesc, setNewItineraryDesc] = useState("");

  const navigation = useNavigation();

  const addIncludedItem = () => {
    if (newIncludedItem.trim()) {
      setIncludedItems([...includedItems, newIncludedItem.trim()]);
      setNewIncludedItem("");
    }
  };

  const addItineraryItem = () => {
    if (newItineraryDay && newItineraryTitle.trim()) {
      setItineraryItems([
        ...itineraryItems,
        {
          day: parseInt(newItineraryDay),
          title: newItineraryTitle.trim(),
          description: newItineraryDesc.trim(),
        },
      ]);
      setNewItineraryDay("");
      setNewItineraryTitle("");
      setNewItineraryDesc("");
    }
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity activeOpacity={0.7} style={styles.backButton}>
              <Feather
                name="chevron-left"
                size={24}
                color={colors.black}
                onPress={() => navigation.goBack()}
              />
            </TouchableOpacity>
            <Title title="Add Event" color={colors.black} />
            <TouchableOpacity activeOpacity={0.7} style={styles.menuButton}>
              <Feather name="more-vertical" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>

          {/* Host Badge */}
          <View style={styles.hostBadge}>
            <View style={styles.hostInfo}>
              <View style={styles.hostAvatar}>
                <CustomText style={styles.hostAvatarText}>AS</CustomText>
              </View>
              <View>
                <CustomText style={styles.hostName}>
                  Hosted by Adventure Seekers
                </CustomText>
                <CustomText style={styles.hostSince}>
                  Member since 2020
                </CustomText>
              </View>
            </View>
            <View style={styles.verifiedBadge}>
              <CustomText style={styles.verifiedText}>Verified</CustomText>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Event Title */}
            <View style={styles.formFieldFull}>
              <CustomText style={styles.fieldLabel}>Event Title</CustomText>
              <TextInput
                style={styles.input}
                placeholder="Enter first name"
                placeholderTextColor="#9CA3AF"
                value={eventTitle}
                onChangeText={setEventTitle}
              />
            </View>

            {/* Location */}
            <View style={styles.formFieldFull}>
              <CustomText style={styles.fieldLabel}>Location</CustomText>
              <TextInput
                style={styles.input}
                placeholder="10-digit mobile number"
                placeholderTextColor="#9CA3AF"
                value={location}
                onChangeText={setLocation}
              />
            </View>

            {/* Start Date & Time */}
            <View style={styles.section}>
              <CustomText style={styles.fieldLabel}>Start Date</CustomText>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <TextInput
                    style={styles.input}
                    placeholder="00:00 AM"
                    placeholderTextColor="#9CA3AF"
                    value={startTime}
                    onChangeText={setStartTime}
                  />
                </View>
                <View style={styles.formField}>
                  <TextInput
                    style={styles.input}
                    placeholder="DD/MM/YYY"
                    placeholderTextColor="#9CA3AF"
                    value={startDate}
                    onChangeText={setStartDate}
                  />
                </View>
              </View>
            </View>

            {/* End Date & Time */}
            <View style={styles.section}>
              <CustomText style={styles.fieldLabel}>End Date</CustomText>
              <View style={styles.formRow}>
                <View style={styles.formField}>
                  <TextInput
                    style={styles.input}
                    placeholder="00:00 AM"
                    placeholderTextColor="#9CA3AF"
                    value={endTime}
                    onChangeText={setEndTime}
                  />
                </View>
                <View style={styles.formField}>
                  <TextInput
                    style={styles.input}
                    placeholder="DD/MM/YYY"
                    placeholderTextColor="#9CA3AF"
                    value={endDate}
                    onChangeText={setEndDate}
                  />
                </View>
              </View>
            </View>

            {/* Date Range Selector */}
            <TouchableOpacity style={styles.dateRangeButton} activeOpacity={0.7}>
              <Feather name="calendar" size={16} color="#E91E63" />
              <CustomText style={styles.dateRangeText}>
                Total Days Count - 06 Days & 5 Nights
              </CustomText>
            </TouchableOpacity>

            {/* About This Experience */}
            <View style={styles.section}>
              <CustomText style={styles.sectionTitle}>
                About This Experience
              </CustomText>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter event description here"
                placeholderTextColor="#9CA3AF"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* What's Included */}
            <View style={styles.section}>
              <CustomText style={styles.sectionTitle}>
                What's Included
              </CustomText>
              
              {includedItems.map((item, index) => (
                <View key={index} style={styles.checkItem}>
                  <Feather name="check" size={16} color="#10B981" />
                  <CustomText style={styles.checkItemText}>{item}</CustomText>
                </View>
              ))}

              <View style={styles.addItemRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Enter 2nd"
                  placeholderTextColor="#9CA3AF"
                  value={newIncludedItem}
                  onChangeText={setNewIncludedItem}
                />
              </View>

              <TouchableOpacity
                style={styles.addMoreButton}
                activeOpacity={0.7}
                onPress={addIncludedItem}
              >
                <CustomText style={styles.addMoreText}>Add More</CustomText>
              </TouchableOpacity>
            </View>

            {/* Itinerary */}
            <View style={styles.section}>
              <CustomText style={styles.sectionTitle}>Itinerary</CustomText>
              
              {itineraryItems.map((item, index) => (
                <View key={index} style={styles.itineraryCard}>
                  <View style={styles.itineraryHeader}>
                    <View style={styles.dayBadge}>
                      <CustomText style={styles.dayBadgeText}>{item.day}</CustomText>
                    </View>
                    <CustomText style={styles.itineraryDay}>Day {item.day}</CustomText>
                  </View>
                  <CustomText style={styles.itineraryTitle}>
                    {item.title}
                  </CustomText>
                  <CustomText style={styles.itineraryDesc}>
                    {item.description}
                  </CustomText>
                </View>
              ))}

              <View style={styles.addItineraryForm}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter 2nd"
                  placeholderTextColor="#9CA3AF"
                  value={newItineraryDay}
                  onChangeText={setNewItineraryDay}
                  keyboardType="numeric"
                />
              </View>

              <TouchableOpacity
                style={styles.addMoreButton}
                activeOpacity={0.7}
                onPress={addItineraryItem}
              >
                <CustomText style={styles.addMoreText}>Add More</CustomText>
              </TouchableOpacity>
            </View>

            {/* Important Information */}
            <View style={styles.section}>
              <CustomText style={styles.sectionTitle}>
                Important Information
              </CustomText>
              <View style={styles.addItemRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Add More"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} activeOpacity={0.7}>
              <CustomText style={styles.saveButtonText}>
                Save Event
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
  },
  hostBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    marginTop: 16,
  },
  hostInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  hostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF385C",
    alignItems: "center",
    justifyContent: "center",
  },
  hostAvatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  hostName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },
  hostSince: {
    fontSize: 12,
    color: colors.text,
    marginTop: 2,
  },
  verifiedBadge: {
    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  verifiedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    paddingTop: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 16,
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
  },
  formField: {
    flex: 1,
  },
  formFieldFull: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.black,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  dateRangeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFF1F2",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  dateRangeText: {
    fontSize: 12,
    color: "#E91E63",
    fontWeight: "500",
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 12,
  },
  checkItemText: {
    flex: 1,
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  addItemRow: {
    marginTop: 8,
    marginBottom: 12,
  },
  addMoreButton: {
    borderWidth: 1,
    borderColor: "#FF385C",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  addMoreText: {
    color: "#FF385C",
    fontSize: 14,
    fontWeight: "600",
  },
  itineraryCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  itineraryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  dayBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FF385C",
    alignItems: "center",
    justifyContent: "center",
  },
  dayBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  itineraryDay: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
  },
  itineraryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 4,
  },
  itineraryDesc: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  addItineraryForm: {
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#FF385C",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default AddEvent;