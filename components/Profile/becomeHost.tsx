import {
  Image,
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
  ScrollView,
  Text,
} from "react-native";
import { colors } from "../../constants/Colors";
import { useEffect, useState } from "react";
import { Button } from "../../universal/Button";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
//@ts-expect-error null
import { NativeStackNavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../router/Routes";
import CustomText from "../../universal/text";
import { LoadingPopup, SuccessPopup, ErrorPopup } from "../../universal/popup";
import { useApi } from "../../hooks/useApi";
import { useEntranceAnimation } from "../../hooks/useEntranceAnimation";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getRequest, postRequest } from "../../api/commonQuery";
import {
  BECOME_A_HOST,
  GET_CATEGORY_LIST,
  SIGNUP,
} from "../../constants/apiEndpoints";
import moment from "moment";
import * as DocumentPicker from "expo-document-picker";
import CustomDropdown from "../../universal/CustomDropdown";
import useAuthStore from "../../store/authenticationStore";
import Label from "../../universal/Label";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import statesData from "../../constants/states.json";
import districtsData from "../../constants/districts.json";

const Signup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [hasExperience, setHasExperience] = useState<boolean>(false);
  const [eventTypes, setEventTypes] = useState<string>("");
  const [events, setEvents] = useState([]);
  const [showEventTypePicker, setShowEventTypePicker] =
    useState<boolean>(false);
  const [hostDescription, setHostDescription] = useState<string>("");
  const [portfolioLinks, setPortfolioLinks] = useState([""]);
  const [maxGroupSize, setMaxGroupSize] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Identity Verification states
  const [govIdType, setGovIdType] = useState<string>("");
  const [govIdNumber, setGovIdNumber] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [showIdTypePicker, setShowIdTypePicker] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [agreeToGuidelines, setAgreeToGuidelines] = useState<boolean>(false);
  const [showStatePicker, setShowStatePicker] = useState<boolean>(false);
  const [showDistrictPicker, setShowDistrictPicker] = useState<boolean>(false);
  const [selectedStateId, setSelectedStateId] = useState<string>("");
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("");

  const { fadeAnim, slideFromTop, slideFromBottom } = useEntranceAnimation();
  const user = useAuthStore((state) => state.user);

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
    handleErrorClose,
    setIsLoading,
    handleSuccessClose: baseHandleSuccessClose,
  } = useApi();

  const idTypes = [
    { label: "Aadhar Card", value: "aadhar" },
    { label: "PAN Card", value: "pan" },
    { label: "Driving License", value: "driving_license" },
    { label: "Passport", value: "passport" },
    { label: "Voter ID", value: "voter_id" },
  ];

  const stateOptions = statesData.data.map((item) => ({
    label: item.state_name,
    value: item.id,
  }));

  const districtOptions = selectedStateId
    ? (districtsData.data[selectedStateId] || []).map((item: any) => ({
        label: item.district_name,
        value: item.id,
      }))
    : [];

  const handleStateChange = (id: string) => {
    setSelectedStateId(id);
    const selectedState = statesData.data.find((s) => s.id === id);
    setState(selectedState?.state_name || "");
    setDistrict("");
    setSelectedDistrictId("");
  };

  const handleDistrictChange = (id: string) => {
    setSelectedDistrictId(id);
    const selectedDist = districtOptions.find((d) => d.value === id);
    setDistrict(selectedDist?.label || "");
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

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        copyToCacheDirectory: true,
      });

      console.log(result);

      if (!result.canceled) {
        setUploadedFile(result.assets[0]);
      }
    } catch (err) {
      console.error("Error picking document:", err);
      setErrorMessage("Failed to pick document");
      setShowError(true);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const onSubmit = async () => {
    if (contactNumber.length !== 10) {
      setErrorMessage("Please fill all required fields");
      setShowError(true);
      return;
    }

    if (!govIdType || !govIdNumber || !uploadedFile) {
      setErrorMessage("Please complete identity verification");
      setShowError(true);
      return;
    }

    if (!agreeToTerms || !agreeToGuidelines) {
      setErrorMessage("Please agree to all required terms");
      setShowError(true);
      return;
    }

    const postData = {
      // first_name: firstName,
      // last_name: lastName,
      // phone: contactNumber,
      // email: email,
      state: state,
      district: district,
      city: city,
      prior_experience: hasExperience,
      event_type: JSON.stringify(eventTypes),
      about_host: hostDescription,
      external_links: JSON.stringify(portfolioLinks),
      // max_group_size: maxGroupSize,
      gov_id_type: govIdType,
      gov_id_no: govIdNumber,
      gov_id_img: uploadedFile,
      // You'll need to handle file upload separately
    };

    // const formData = new FormData();
    // Object.entries(postData).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    try {
      setIsLoading(false);
      const res = await postRequest<{ status: boolean; message: string }>(
        BECOME_A_HOST,
        postData,
        true,
      );

      if (res.status) {
        setSuccessMessage("Hosting request submitted successfully!");
        setShowSuccess(true);
        navigation.navigate("ProfileStack");
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
    } finally{
      setIsLoading(true);
    }

    // navigation.navigate("experience");
  };

  const handleSuccessClose = () => {
    baseHandleSuccessClose();
    navigation.navigate("ProfileStack");
  };

  const addPortfolioLink = () => {
    setPortfolioLinks((prev) => [...prev, ""]);
  };

  const removePortfolioLink = (index: number) => {
    setPortfolioLinks((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.full_name);
      setContactNumber(user.mobile);
    }
  }, [user]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={signupStyles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={signupStyles.scrollView}
          contentContainerStyle={signupStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={signupStyles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#0F172A" />
            </TouchableOpacity>
            <CustomText style={signupStyles.headerTitle}>
              Become a Host
            </CustomText>
            <View style={{ width: 24 }} />
          </View>

          <Animated.View style={[signupStyles.content, { opacity: fadeAnim }]}>
            {/* Info Box */}
            <View style={signupStyles.infoBox}>
              <CustomText style={signupStyles.infoTitle}>
                Why become a host?
              </CustomText>
              <View style={signupStyles.infoBullet}>
                <Text style={signupStyles.bulletPoint}>•</Text>
                <CustomText style={signupStyles.infoText}>
                  Create and manage your own events
                </CustomText>
              </View>
              <View style={signupStyles.infoBullet}>
                <Text style={signupStyles.bulletPoint}>•</Text>
                <CustomText style={signupStyles.infoText}>
                  Build a community around your passion
                </CustomText>
              </View>
              <View style={signupStyles.infoBullet}>
                <Text style={signupStyles.bulletPoint}>•</Text>
                <CustomText style={signupStyles.infoText}>
                  Earn income from hosting
                </CustomText>
              </View>
              <View style={signupStyles.infoBullet}>
                <Text style={signupStyles.bulletPoint}>•</Text>
                <CustomText style={signupStyles.infoText}>
                  Get verified host badge
                </CustomText>
              </View>
            </View>

            {/* Personal Information Section */}
            <View style={signupStyles.section}>
              <CustomText style={signupStyles.sectionTitle}>
                Personal Information
              </CustomText>

              <Label label="Full Name *" />
              <TextInput
                style={signupStyles.input}
                placeholder="Enter Name"
                placeholderTextColor="#94A3B8"
                value={firstName}
                onChangeText={setFirstName}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
                editable={false}
              />

              <Label label="Contact Number *" />
              <TextInput
                style={signupStyles.input}
                placeholder="Enter Phone Number"
                placeholderTextColor="#94A3B8"
                value={contactNumber}
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, "");
                  if (numericText.length <= 10) setContactNumber(numericText);
                }}
                keyboardType="numeric"
                maxLength={10}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
                editable={false}
              />

              {/* <Label label="Email Address" />
              <TextInput
                style={signupStyles.input}
                placeholder="Enter Email Address"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              /> */}

              <View style={signupStyles.rowContainer}>
                <View style={[signupStyles.halfWidth, { zIndex: 30 }]}>
                  <CustomDropdown
                    label="State *"
                    value={selectedStateId}
                    options={stateOptions}
                    placeholder="Select State"
                    isOpen={showStatePicker}
                    setIsOpen={setShowStatePicker}
                    onChange={handleStateChange}
                  />
                </View>
                <View style={[signupStyles.halfWidth, { zIndex: 30 }]}>
                  <CustomDropdown
                    label="District *"
                    value={selectedDistrictId}
                    options={districtOptions}
                    placeholder="Select District"
                    isOpen={showDistrictPicker}
                    setIsOpen={setShowDistrictPicker}
                    onChange={handleDistrictChange}
                  />
                </View>
              </View>

              <Label label="City *" />
              <TextInput
                style={signupStyles.input}
                placeholder="Enter city name"
                placeholderTextColor="#94A3B8"
                value={city}
                onChangeText={setCity}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
            </View>

            {/* Experience & Expertise Section */}
            <View style={signupStyles.section}>
              <CustomText style={signupStyles.sectionTitle}>
                Experience & Expertise
              </CustomText>

              <Label label="Do you have prior experience hosting events?" />
              <View style={signupStyles.radioContainer}>
                <TouchableOpacity
                  style={signupStyles.radioButton}
                  onPress={() => setHasExperience(false)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      signupStyles.radioCircle,
                      !hasExperience && signupStyles.radioCircleSelected,
                    ]}
                  >
                    {!hasExperience && (
                      <View style={signupStyles.radioCircleInner} />
                    )}
                  </View>
                  <CustomText style={signupStyles.radioLabel}>No</CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={signupStyles.radioButton}
                  onPress={() => setHasExperience(true)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      signupStyles.radioCircle,
                      hasExperience && signupStyles.radioCircleSelected,
                    ]}
                  >
                    {hasExperience && (
                      <View style={signupStyles.radioCircleInner} />
                    )}
                  </View>
                  <CustomText style={signupStyles.radioLabel}>Yes</CustomText>
                </TouchableOpacity>
              </View>

              <CustomDropdown
                label="What type of events will you host? *"
                value={eventTypes}
                options={events}
                placeholder="Select an event type"
                isOpen={showEventTypePicker}
                setIsOpen={setShowEventTypePicker}
                onChange={setEventTypes}
                multiple
              />

              {/* <Label label="What type of events will you host? *" />
              <TextInput
                style={signupStyles.input}
                placeholder="Select event type"
                placeholderTextColor="#94A3B8"
                value={eventTypes}
                onChangeText={setEventTypes}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              /> */}

              <Label label="Tell us about yourself as a host" />
              <TextInput
                style={[signupStyles.input, signupStyles.textArea]}
                placeholder="Enter your experience"
                placeholderTextColor="#94A3B8"
                value={hostDescription}
                onChangeText={setHostDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />

              <Label label="Portfolio/Website Link *" />
              <View style={{ gap: 10 }}>
                {portfolioLinks.map((link, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <TextInput
                      style={[signupStyles.input, { flex: 1 }]}
                      placeholder="Enter your website or instagram link"
                      placeholderTextColor="#94A3B8"
                      value={link}
                      onChangeText={(value) =>
                        setPortfolioLinks((prev) => {
                          const newLinks = [...prev];
                          newLinks[index] = value;
                          return newLinks;
                        })
                      }
                      keyboardType="url"
                      allowFontScaling={false}
                      maxFontSizeMultiplier={1}
                    />
                    {portfolioLinks.length > 1 && (
                      <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color="#EF3053"
                        onPress={() => removePortfolioLink(index)}
                      />
                    )}
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={signupStyles.addMoreBtn}
                onPress={addPortfolioLink}
              >
                <CustomText style={signupStyles.addMoreBtnText}>
                  Add More
                </CustomText>
              </TouchableOpacity>

              <Label label="Maximum group size you can manage *" />
              <TextInput
                style={signupStyles.input}
                placeholder="Enter a number"
                placeholderTextColor="#94A3B8"
                value={maxGroupSize}
                onChangeText={setMaxGroupSize}
                keyboardType="numeric"
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
            </View>

            {/* Identity Verification Section */}
            <View style={signupStyles.section}>
              <CustomText style={signupStyles.sectionTitle}>
                Identity Verification
              </CustomText>

              <CustomDropdown
                label="Government ID Type *"
                value={govIdType}
                options={idTypes}
                placeholder="Select an ID type"
                isOpen={showIdTypePicker}
                setIsOpen={setShowIdTypePicker}
                onChange={setGovIdType}
              />

              <Label label="Government ID Number *" />
              <TextInput
                style={signupStyles.input}
                placeholder="Enter ID number"
                placeholderTextColor="#94A3B8"
                value={govIdNumber}
                onChangeText={setGovIdNumber}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />

              <Label label="Upload files" />
              <TouchableOpacity
                style={signupStyles.uploadBox}
                onPress={handleFilePick}
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={32}
                  color="#94A3B8"
                />
                <View>
                  <CustomText style={signupStyles.uploadText}>
                    Choose a file or drag & drop it here
                  </CustomText>
                  <CustomText style={signupStyles.uploadSubtext}>
                    JPEG, PNG, PDF formats, up to 50MB
                  </CustomText>
                </View>
              </TouchableOpacity>

              {uploadedFile && (
                <View style={signupStyles.filePreviewContainer}>
                  {uploadedFile.mimeType?.startsWith("image/") ||
                  uploadedFile.name?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <View style={signupStyles.imagePreviewWrapper}>
                      <Image
                        source={{ uri: uploadedFile.uri }}
                        style={signupStyles.idPreviewImage}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={signupStyles.removeImageHeader}
                        onPress={removeFile}
                      >
                        <Ionicons
                          name="close-circle"
                          size={24}
                          color="#EF3053"
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={signupStyles.filePreview}>
                      <View style={signupStyles.fileInfo}>
                        <Ionicons name="document" size={20} color="#EF3053" />
                        <View style={signupStyles.fileDetails}>
                          <CustomText style={signupStyles.fileName}>
                            {uploadedFile.name}
                          </CustomText>
                          <CustomText style={signupStyles.fileSize}>
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </CustomText>
                        </View>
                      </View>
                      <TouchableOpacity onPress={removeFile}>
                        <Ionicons
                          name="close-circle"
                          size={20}
                          color="#64748B"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>

            {/* Required Agreements Section */}
            <View style={signupStyles.section}>
              <CustomText style={signupStyles.sectionTitle}>
                Required Agreements
              </CustomText>

              <TouchableOpacity
                style={signupStyles.checkboxContainer}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    signupStyles.checkbox,
                    agreeToTerms && signupStyles.checkboxChecked,
                  ]}
                >
                  {agreeToTerms && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <Label label="I confirm the details provided are true." />
              </TouchableOpacity>

              <TouchableOpacity
                style={signupStyles.checkboxContainer}
                onPress={() => setAgreeToGuidelines(!agreeToGuidelines)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    signupStyles.checkbox,
                    agreeToGuidelines && signupStyles.checkboxChecked,
                  ]}
                >
                  {agreeToGuidelines && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <Label label="I agree to follow the platform safety and event guidelines." />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Submit Button */}
          <Animated.View
            style={[signupStyles.bottomSection, { opacity: fadeAnim }]}
          >
            <View style={signupStyles.buttonRow}>
              <TouchableOpacity
                style={signupStyles.backButton}
                onPress={() => navigation.goBack()}
              >
                <CustomText style={signupStyles.backButtonText}>
                  Back
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={signupStyles.submitButton}
                onPress={onSubmit}
              >
                <CustomText style={signupStyles.submitButtonText}>
                  Submit
                </CustomText>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingPopup visible={isLoading} />
      <SuccessPopup
        visible={showSuccess}
        message={successMessage}
        onClose={handleSuccessClose}
      />
      <ErrorPopup
        visible={showError}
        message={errorMessage}
        onClose={handleErrorClose}
      />
    </>
  );
};

const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Geist-Bold",
    color: "#0F172A",
  },
  content: {
    paddingHorizontal: 24,
  },
  infoBox: {
    backgroundColor: "#FFE8EC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 14,
    fontFamily: "Geist-Bold",
    color: "#EF3053",
    marginBottom: 12,
  },
  infoBullet: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#EF3053",
    marginRight: 8,
    lineHeight: 20,
  },
  infoText: {
    fontSize: 12,
    color: "#64748B",
    flex: 1,
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Geist-Bold",
    color: "#0F172A",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontFamily: "Geist-Medium",
    color: "#0F172A",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#0F172A",
    backgroundColor: "#FFFFFF",
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  radioContainer: {
    flexDirection: "row",
    gap: 24,
    marginTop: 8,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    borderColor: "#EF3053",
  },
  radioCircleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF3053",
  },
  radioLabel: {
    fontSize: 14,
    color: "#0F172A",
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  pickerButtonText: {
    fontSize: 15,
    color: "#0F172A",
  },
  placeholderText: {
    color: "#94A3B8",
  },
  pickerDropdown: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pickerOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  pickerOptionText: {
    fontSize: 15,
    color: "#0F172A",
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
    borderStyle: "dashed",
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  uploadText: {
    fontSize: 14,
    color: "#0F172A",
    marginTop: 12,
    fontFamily: "Geist-Medium",
  },
  uploadSubtext: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },
  filePreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  fileDetails: {
    marginLeft: 12,
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    color: "#0F172A",
    fontFamily: "Geist-Medium",
  },
  fileSize: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  filePreviewContainer: {
    marginTop: 12,
  },
  imagePreviewWrapper: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    position: "relative",
  },
  idPreviewImage: {
    width: "100%",
    height: "100%",
  },
  removeImageHeader: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxChecked: {
    backgroundColor: "#EF3053",
    borderColor: "#EF3053",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#0F172A",
    flex: 1,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: "Geist-SemiBold",
    color: "#0F172A",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#EF3053",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: "Geist-SemiBold",
    color: "#FFFFFF",
  },
  addMoreBtn: {
    borderColor: "#EF3053",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: 90,
  },
  addMoreBtnText: {
    fontSize: 14,
    fontFamily: "Geist-SemiBold",
    color: "#EF3053",
  },
});

export default Signup;
