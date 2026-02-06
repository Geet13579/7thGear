import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../constants/Colors";
import CustomText from "../universal/lightText";
import Title from "../universal/Title";
import { useNavigation } from "@react-navigation/native";
import Container from "../universal/Container";
import TextProfileSection from "../universal/textWithProfile";
import CustomDropdown from "../universal/CustomDropdown";
import { GET_CATEGORY_LIST, POST_AN_EVENT } from "../constants/apiEndpoints";
import { getRequest, postRequest } from "../api/commonQuery";
import Label from "../universal/Label";
import { useApi } from "../hooks/useApi";
import { ErrorPopup, LoadingPopup, SuccessPopup } from "../universal/popup";
import useAuthStore from "../store/authenticationStore";

const EntryTypes = [
  {
    label: "Slot",
    value: "SLOT",
  },
  {
    label: "Open",
    value: "OPEN",
  },
];

const AddMoreButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.addMoreButton}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Feather name="plus" size={16} color="#FF385C" />
    <CustomText style={styles.addMoreText}>Add More</CustomText>
  </TouchableOpacity>
);

const AddEvent = () => {
  const [eventBanners, setEventBanners] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [location, setLocation] = useState("");

  // Date and Time states
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  // Picker visibility states
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [eventTypes, setEventTypes] = useState<string>("");
  const [events, setEvents] = useState([]);
  const [showEventTypePicker, setShowEventTypePicker] =
    useState<boolean>(false);
  const [slot_count, setSlotCount] = useState("");

  // Calculated days and nights
  const [totalDays, setTotalDays] = useState(0);
  const [totalNights, setTotalNights] = useState(0);

  const [description, setDescription] = useState("");
  const [includedItems, setIncludedItems] = useState([""]);
  const [itineraryItems, setItineraryItems] = useState([
    {
      day: 1,
      title: "",
      description: "",
    },
  ]);
  const [importantInfo, setImportantInfo] = useState([""]);
  const [entry_type, setEntryType] = useState("SLOT");
  const [price, setPrice] = useState("");
  const [event_highlights, setEventHighlights] = useState([""]);
  const [showEntryTypePicker, setShowEntryTypePicker] = useState(false);

  const navigation = useNavigation();
  const {
    isLoading,
    showSuccess,
    showError,
    errorMessage,
    successMessage,
    setShowSuccess,
    setShowError,
    setErrorMessage,
    setSuccessMessage,
    setIsLoading,
    handleErrorClose,
    handleSuccessClose,
  } = useApi();

  // Calculate total days and nights
  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Reset time to midnight for accurate day calculation
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setTotalDays(diffDays + 1); // +1 to include both start and end day
    setTotalNights(diffDays);
  }, [startDate, endDate]);

  // Format date to DD/MM/YYYY
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Format time to HH:MM AM/PM
  const formatTime = (date) => {
    const d = new Date(date);
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
  };

  // Date/Time picker handlers
  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const onEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

  // Request permissions and pick image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant permission to access photos",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 5, // Optional: limit to 5 images
      quality: 0.8,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri);
      setEventBanners((prev) => [...prev, ...newImages]);
    }
  };

  const removeBanner = (index) => {
    setEventBanners((prev) => prev.filter((_, i) => i !== index));
  };

  // Add new included item
  const addIncludedItem = () => {
    setIncludedItems([...includedItems, ""]);
  };

  // Update included item
  const updateIncludedItem = (index, value) => {
    const updated = [...includedItems];
    updated[index] = value;
    setIncludedItems(updated);
  };

  // Edit itinerary item
  const editItineraryItem = (index) => {
    const itemToEdit = itineraryItems[index];
    const updated = itineraryItems.filter((_, i) => i !== index);
    updated.push(itemToEdit);
    setItineraryItems(updated);
  };

  // Remove included item
  const removeIncludedItem = (index) => {
    if (includedItems.length > 1) {
      setIncludedItems(includedItems.filter((_, i) => i !== index));
    }
  };

  // Add new itinerary item
  const addItineraryItem = () => {
    const nextDay = itineraryItems.length + 1;
    setItineraryItems([
      ...itineraryItems,
      {
        day: nextDay,
        title: "",
        description: "",
      },
    ]);
  };

  // Update itinerary item
  const updateItineraryItem = (index, field, value) => {
    const updated = [...itineraryItems];
    updated[index][field] = value;
    setItineraryItems(updated);
  };

  // Remove itinerary item
  const removeItineraryItem = (index) => {
    if (itineraryItems.length > 1) {
      setItineraryItems(itineraryItems.filter((_, i) => i !== index));
    }
  };

  // Add new important info item
  const addImportantInfo = () => {
    setImportantInfo([...importantInfo, ""]);
  };

  // Update important info item
  const updateImportantInfo = (index, value) => {
    const updated = [...importantInfo];
    updated[index] = value;
    setImportantInfo(updated);
  };

  // Remove important info item
  const removeImportantInfo = (index) => {
    if (importantInfo.length > 1) {
      setImportantInfo(importantInfo.filter((_, i) => i !== index));
    }
  };

  const removeEventHighlight = (index: number) => {
    setEventHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  const addEventHighlight = () => {
    setEventHighlights((prev) => [...prev, ""]);
  };

  const handleSaveEvent = async () => {
    // Validate and save
    if (
      !eventTitle ||
      !description ||
      !location ||
      !entry_type ||
      !price ||
      !slot_count ||
      !eventTypes ||
      !eventBanners ||
      !includedItems ||
      !itineraryItems ||
      !importantInfo ||
      !startDate ||
      !startTime ||
      !endDate ||
      !endTime
    ) {
      setShowError(true);
      setErrorMessage("Please fill all the fields");
      return;
    }

    try {
      setIsLoading(true);
      const formattedBanners = eventBanners.map((uri, index) => {
        const fileName = uri.split("/").pop();
        const match = /\.(\w+)$/.exec(fileName);
        const type = match ? `image/${match[1]}` : `image`;
        return {
          uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
          name: fileName || `banner_${index}.jpg`,
          type,
        };
      });

      const postData = {
        event_cat_uid: eventTypes,
        event_banner: formattedBanners,
        event_title: eventTitle,
        event_highlights: JSON.stringify(event_highlights),
        short_desc: description,
        inclusion: JSON.stringify(includedItems.filter((item) => item.trim())),
        itinerary: JSON.stringify(
          itineraryItems.filter((item) => item.title.trim()),
        ),
        imp_info: JSON.stringify(importantInfo.filter((item) => item.trim())),
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        event_location: location,
        entry_type,
        price,
        slot_count,
      };

      const res = await postRequest<{ status: boolean; message: string }>(
        POST_AN_EVENT,
        postData,
        true, // asFormData
      );
      if (res?.status) {
        setSuccessMessage(res.message);
        setShowSuccess(true);
        navigation.navigate("HomeStack");
      } else {
        setErrorMessage(res.message);
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
      if (!error.status) {
        setErrorMessage(error.message);
        setShowError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    const response = await getRequest<{ status: boolean; data: any }>(
      GET_CATEGORY_LIST,
    );
    if (response.status) {
      setEvents(
        response.data.map((item: any) => {
          return {
            value: item.cat_uid,
            label: item.cat_name,
          };
        }),
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
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

            {/* Host Info */}
            <View style={styles.content1}>
              <TextProfileSection
                heading="Hosted by Adventure Seekers"
                subHeading="Member since 2019"
                bg={colors.primary}
                profile="AS"
              />
              <View style={styles.almostFullBadge}>
                <CustomText style={styles.badgeText}>Verified</CustomText>
              </View>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
              {/* Event Banner Upload */}
              <View style={styles.section}>
                <CustomText style={styles.sectionTitle}>
                  Event Banners
                </CustomText>
                {eventBanners.length > 0 ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12 }}
                  >
                    {eventBanners.map((uri, index) => (
                      <View key={index} style={styles.bannerThumbnailContainer}>
                        <Image
                          source={{ uri: uri }}
                          style={styles.bannerThumbnail}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          style={styles.removeThumbnailButton}
                          onPress={() => removeBanner(index)}
                        >
                          <Feather name="x" size={16} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    ))}

                    {eventBanners.length < 5 && (
                      <TouchableOpacity
                        style={[
                          styles.bannerUpload,
                          { width: 150, height: 100 },
                        ]}
                        activeOpacity={0.8}
                        onPress={pickImage}
                      >
                        <View style={styles.uploadPlaceholder}>
                          <Feather name="image" size={24} color="#CBD5E0" />
                        </View>
                      </TouchableOpacity>
                    )}
                  </ScrollView>
                ) : (
                  <TouchableOpacity
                    style={styles.bannerUpload}
                    activeOpacity={0.8}
                    onPress={pickImage}
                  >
                    <View style={styles.uploadPlaceholder}>
                      <Feather name="image" size={40} color="#CBD5E0" />
                      <CustomText style={styles.uploadText}>
                        Upload Event Banners
                      </CustomText>
                      <CustomText style={styles.uploadSubtext}>
                        Tap to select images
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                )}
              </View>

              {/* Event Title */}
              <View style={styles.formFieldFull}>
                <Label label="Event Title *" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter title here..."
                  placeholderTextColor="#9CA3AF"
                  value={eventTitle}
                  onChangeText={setEventTitle}
                />
              </View>

              <CustomDropdown
                label="What type of event will you host? *"
                value={eventTypes}
                options={events}
                placeholder="Select an event type"
                isOpen={showEventTypePicker}
                setIsOpen={setShowEventTypePicker}
                onChange={setEventTypes}
              />
              <View style={styles.section}>
                <Label label="Event Highlights *" />
                <View style={{ gap: 10, marginBottom: 10 }}>
                  {event_highlights.map((link, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Enter event highlight"
                        placeholderTextColor="#94A3B8"
                        value={link}
                        onChangeText={(value) =>
                          setEventHighlights((prev) => {
                            const highlights = [...prev];
                            highlights[index] = value;
                            return highlights;
                          })
                        }
                        keyboardType="url"
                        allowFontScaling={false}
                        maxFontSizeMultiplier={1}
                      />
                      {event_highlights.length > 1 && (
                        <Feather
                          name="x"
                          size={18}
                          color="#EF3053"
                          onPress={() => removeEventHighlight(index)}
                        />
                      )}
                    </View>
                  ))}
                </View>

                <AddMoreButton onPress={() => addEventHighlight()} />
              </View>

              {/* Location */}
              <View style={styles.formFieldFull}>
                <Label label="Location *" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter event location"
                  placeholderTextColor="#9CA3AF"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>

              {/* Start Date & Time */}
              <View style={styles.section}>
                <View style={styles.formRow}>
                  <View style={styles.formField}>
                    <Label label="Start Date *" />
                    <TouchableOpacity
                      style={styles.dateTimeInput}
                      onPress={() => setShowStartDatePicker(true)}
                    >
                      <CustomText style={styles.dateTimeText}>
                        {formatDate(startDate)}
                      </CustomText>
                      <Feather name="calendar" size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.formField}>
                    <Label label="End Date *" />
                    <TouchableOpacity
                      style={styles.dateTimeInput}
                      onPress={() => setShowEndDatePicker(true)}
                    >
                      <CustomText style={styles.dateTimeText}>
                        {formatDate(endDate)}
                      </CustomText>
                      <Feather name="calendar" size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                  {/* <View style={styles.formField}>
                    <TouchableOpacity
                      style={styles.dateTimeInput}
                      onPress={() => setShowStartTimePicker(true)}
                    >
                      <CustomText style={styles.dateTimeText}>
                        {formatTime(startTime)}
                      </CustomText>
                      <Feather name="clock" size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>

              {/* End Date & Time */}
              {/* <View style={styles.section}>
                <Label label="End Date *" />
                <View style={styles.formRow}>
                  <View style={styles.formField}>
                    <TouchableOpacity
                      style={styles.dateTimeInput}
                      onPress={() => setShowEndDatePicker(true)}
                    >
                      <CustomText style={styles.dateTimeText}>
                        {formatDate(endDate)}
                      </CustomText>
                      <Feather name="calendar" size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.formField}>
                    <TouchableOpacity
                      style={styles.dateTimeInput}
                      onPress={() => setShowEndTimePicker(true)}
                    >
                      <CustomText style={styles.dateTimeText}>
                        {formatTime(endTime)}
                      </CustomText>
                      <Feather name="clock" size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View> */}

              {/* Date Time Pickers */}
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onStartDateChange}
                  minimumDate={new Date()}
                />
              )}
              {showStartTimePicker && (
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onStartTimeChange}
                />
              )}
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onEndDateChange}
                  minimumDate={startDate}
                />
              )}
              {showEndTimePicker && (
                <DateTimePicker
                  value={endTime}
                  mode="time"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onEndTimeChange}
                />
              )}

              {/* Date Range Display */}
              <View style={styles.dateRangeButton}>
                <Feather name="calendar" size={16} color="#E91E63" />
                <CustomText style={styles.dateRangeText}>
                  Total Days Count - {String(totalDays).padStart(2, "0")} Days &{" "}
                  {totalNights} Nights
                </CustomText>
              </View>

              {/* Participants */}
              <View style={[styles.formRow, { marginBottom: 10 }]}>
                <View style={styles.formField}>
                  <Label label="Participants *" />
                  <TextInput
                    style={styles.input}
                    placeholder="Maximum participants"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    value={slot_count}
                    onChangeText={setSlotCount}
                    multiline={false} // ✅ REQUIRED
                    numberOfLines={1}
                    textAlignVertical="center"
                  />
                </View>
                <View style={styles.formField}>
                  <Label label="Price (per slot) *" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter price per slot"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                  />
                </View>
              </View>

              <CustomDropdown
                label="Entry Type *"
                value={entry_type}
                options={EntryTypes}
                placeholder="Select an event type"
                isOpen={showEntryTypePicker}
                setIsOpen={setShowEntryTypePicker}
                onChange={setEntryType}
              />

              {/* About This Experience */}
              <View style={[styles.section]}>
                <Label label="About This Experience *" />
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
                <Label label="What's Included *" />

                {includedItems.map((item, index) => (
                  <View key={index} style={styles.dynamicItemRow}>
                    {item && index < includedItems.length - 1 ? (
                      <View style={styles.checkItem}>
                        <Feather name="check" size={16} color="#10B981" />
                        <CustomText style={styles.checkItemText}>
                          {item}
                        </CustomText>
                        <TouchableOpacity
                          onPress={() => removeIncludedItem(index)}
                        >
                          <Feather name="x" size={18} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.inputWithIcon}>
                        <TextInput
                          style={[styles.input, { flex: 1 }]}
                          placeholder={`Enter item ${index + 1}`}
                          placeholderTextColor="#9CA3AF"
                          value={item}
                          onChangeText={(value) =>
                            updateIncludedItem(index, value)
                          }
                        />
                        {includedItems.length > 1 && (
                          <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeIncludedItem(index)}
                          >
                            <Feather name="x" size={18} color="#EF4444" />
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                ))}
                <AddMoreButton onPress={addIncludedItem} />
              </View>

              {/* Itinerary */}
              <View style={styles.section}>
                <Label label="Itinerary *" />

                {itineraryItems.map((item, index) => (
                  <View key={index} style={styles.itineraryCard}>
                    {/* <View style={styles.itineraryHeader}> */}

                    {item.title && index < itineraryItems.length - 1 ? (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 10,
                        }}
                      >
                        <View style={styles.dayBadge}>
                          <CustomText style={styles.dayBadgeText}>
                            {item.day}
                          </CustomText>
                          <View
                            style={{
                              position: "absolute",
                              borderColor: "#9c9899ff",
                              borderWidth: 1,
                              height: 30,
                              top: 35,
                            }}
                          ></View>
                        </View>
                        <View>
                          <CustomText style={styles.itineraryDay}>
                            Day {item.day}
                          </CustomText>

                          <CustomText style={styles.itineraryTitle}>
                            {item.title}
                          </CustomText>
                          <CustomText style={styles.itineraryDesc}>
                            {item.description}
                          </CustomText>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <TextInput
                          style={[styles.input, { marginBottom: 8 }]}
                          placeholder="Enter title"
                          placeholderTextColor="#9CA3AF"
                          value={item.title}
                          onChangeText={(value) =>
                            updateItineraryItem(index, "title", value)
                          }
                        />
                        <TextInput
                          style={[
                            styles.input,
                            styles.textArea,
                            { height: 80 },
                          ]}
                          placeholder="Enter description"
                          placeholderTextColor="#9CA3AF"
                          value={item.description}
                          onChangeText={(value) =>
                            updateItineraryItem(index, "description", value)
                          }
                          multiline
                          textAlignVertical="top"
                        />
                      </View>
                    )}

                    <View style={styles.itemActions}>
                      {item.title && index < itineraryItems.length - 1 && (
                        <TouchableOpacity
                          style={styles.editButton}
                          onPress={() => editItineraryItem(index)}
                        >
                          <Feather name="edit-2" size={16} color="#3B82F6" />
                        </TouchableOpacity>
                      )}
                      {itineraryItems.length > 1 && (
                        <TouchableOpacity
                          style={styles.removeItineraryButton}
                          onPress={() => removeItineraryItem(index)}
                        >
                          <Feather name="trash-2" size={16} color="#EF4444" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>

                  // </View>
                ))}
                <AddMoreButton onPress={addItineraryItem} />
              </View>

              {/* Important Information */}
              <View style={styles.section}>
                <Label label="Important Information *" />

                {importantInfo.map((item, index) => (
                  <View key={index} style={styles.dynamicItemRow}>
                    {item && index < importantInfo.length - 1 ? (
                      <View style={styles.infoItem}>
                        <Feather
                          name="alert-circle"
                          size={16}
                          color="#F59E0B"
                        />
                        <CustomText style={styles.infoItemText}>
                          {item}
                        </CustomText>
                        <TouchableOpacity
                          onPress={() => removeImportantInfo(index)}
                        >
                          <Feather name="x" size={18} color="#EF4444" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.inputWithIcon}>
                        <TextInput
                          style={[styles.input, { flex: 1 }]}
                          placeholder="Add important information"
                          placeholderTextColor="#9CA3AF"
                          value={item}
                          onChangeText={(value) =>
                            updateImportantInfo(index, value)
                          }
                        />
                        {importantInfo.length > 1 && (
                          <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeImportantInfo(index)}
                          >
                            <Feather name="x" size={18} color="#EF4444" />
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                ))}
                <AddMoreButton onPress={addImportantInfo} />
              </View>

              {/* Save Button */}
              <TouchableOpacity
                style={styles.saveButton}
                activeOpacity={0.7}
                onPress={handleSaveEvent}
              >
                <CustomText style={styles.saveButtonText}>
                  Save Event
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <LoadingPopup visible={isLoading} />
      <ErrorPopup
        visible={showError}
        message={errorMessage}
        onClose={handleErrorClose}
      />
      <SuccessPopup
        visible={showSuccess}
        message={successMessage}
        onClose={handleSuccessClose}
      />
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
  content1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderColor: "#E2E8F0",
  },
  almostFullBadge: {
    backgroundColor: "#34C759",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    paddingTop: 24,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
    marginBottom: 16,
  },
  bannerUpload: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E2E8F0",
    borderStyle: "dashed",
  },
  bannerImageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  editOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  editIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadPlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  uploadText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
  },
  bannerThumbnailContainer: {
    width: 150,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  bannerThumbnail: {
    width: "100%",
    height: "100%",
  },
  removeThumbnailButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
  },
  formField: {
    flex: 1,
  },
  formFieldFull: {
    marginBottom: 12,
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
  dateTimeInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateTimeText: {
    fontSize: 14,
    color: colors.black,
  },
  placeholderText: {
    color: "#9CA3AF",
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
    marginBottom: 12,
  },
  dateRangeText: {
    fontSize: 12,
    color: "#E91E63",
    fontWeight: "500",
  },
  dynamicItemRow: {
    marginBottom: 12,
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F0FDF4",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#86EFAC",
  },
  checkItemText: {
    flex: 1,
    fontSize: 14,
    color: colors.black,
  },
  itemActions: {
    position: "absolute",
    right: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editButton: {
    padding: 4,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFBEB",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FDE68A",
  },
  infoItemText: {
    flex: 1,
    fontSize: 14,
    color: colors.black,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  removeButton: {
    padding: 8,
  },
  addMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  itineraryWrapper: {
    marginBottom: 16,
    position: "relative",
  },
  savedItineraryCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  editItineraryCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  savedItineraryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  savedDayNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  savedDayNumberText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  savedDayLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },
  savedItineraryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 12,
  },
  savedItineraryDesc: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  itineraryInputTitle: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.black,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  itineraryInputDesc: {
    height: 100,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 14,
    color: colors.black,
    backgroundColor: "#fff",
  },
  itineraryActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 8,
  },
  itineraryEditBtn: {
    padding: 8,
  },
  itineraryDeleteBtn: {
    padding: 8,
  },
  importantInfoWrapper: {
    marginBottom: 12,
    position: "relative",
  },
  savedInfoItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  editInfoItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  savedInfoHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  savedInfoNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  savedInfoNumberText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  savedInfoText: {
    flex: 1,
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  infoInput: {
    height: 48,
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    color: colors.black,
    backgroundColor: "#fff",
  },
  infoActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 8,
  },
  infoEditBtn: {
    padding: 8,
  },
  infoDeleteBtn: {
    padding: 8,
  },
  itineraryCard: {
    // backgroundColor: "#F8FAFC",
    borderRadius: 12,
    // padding: 16,
    marginBottom: 12,
    // borderWidth: 1,
    // borderColor: "#E2E8F0",
  },
  itineraryHeader: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  dayBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
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
    fontWeight: "500",
    color: colors.text,
    flex: 1,
  },
  removeItineraryButton: {
    padding: 4,
  },
  itineraryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 8,
  },

  itineraryDesc: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
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
