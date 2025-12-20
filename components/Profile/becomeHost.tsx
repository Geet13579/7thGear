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
  Text
} from "react-native";
import { colors } from "../../constants/Colors";
import { useState } from "react";
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
import { postRequest } from "../../api/commonQuery";
import { SIGNUP } from "../../constants/apiEndpoints";
import moment from "moment";
import * as DocumentPicker from 'expo-document-picker';

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
  const [hasExperience, setHasExperience] = useState<string>("");
  const [eventTypes, setEventTypes] = useState<string>("");
  const [hostDescription, setHostDescription] = useState<string>("");
  const [portfolioLink, setPortfolioLink] = useState<string>("");
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

  const { fadeAnim, slideFromTop, slideFromBottom } = useEntranceAnimation();
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
    handleSuccessClose: baseHandleSuccessClose,
  } = useApi();

  const idTypes = [
    { label: "Aadhar Card", value: "aadhar" },
    { label: "PAN Card", value: "pan" },
    { label: "Driving License", value: "driving_license" },
    { label: "Passport", value: "passport" },
    { label: "Voter ID", value: "voter_id" },
  ];

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setUploadedFile(result);
      }
    } catch (err) {
      console.error('Error picking document:', err);
      setErrorMessage('Failed to pick document');
      setShowError(true);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const onSignUp = async () => {
    if (!firstName || !lastName || contactNumber.length !== 10) {
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
      first_name: firstName,
      last_name: lastName,
      phone: contactNumber,
      email: email,
      state: state,
      district: district,
      city: city,
      has_experience: hasExperience,
      event_types: eventTypes,
      host_description: hostDescription,
      portfolio_link: portfolioLink,
      max_group_size: maxGroupSize,
      gov_id_type: govIdType,
      gov_id_number: govIdNumber,
      // You'll need to handle file upload separately
    };

    const res = await postRequest<{status: boolean, message: string}>(SIGNUP, postData);
    if(res.status){
      setSuccessMessage("Registration successful!");
      setShowSuccess(true);
    }else{
      setErrorMessage(res.message);
      setShowError(true);
    }
    
    navigation.navigate("experience");
  };

  const handleSuccessClose = () => {
    baseHandleSuccessClose();
    navigation.navigate("otpVerification", { mobileNumber: contactNumber });
  };

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
            <CustomText style={signupStyles.headerTitle}>Become a Host</CustomText>
            <View style={{ width: 24 }} />
          </View>

          <Animated.View style={[signupStyles.content, { opacity: fadeAnim }]}>
            {/* Info Box */}
            <View style={signupStyles.infoBox}>
              <CustomText style={signupStyles.infoTitle}>Why become a host?</CustomText>
              <View style={signupStyles.infoBullet}>
                <Text style={signupStyles.bulletPoint}>•</Text>
                <CustomText style={signupStyles.infoText}>Create and manage your own events</CustomText>
              </View>
              <View style={signupStyles.infoBullet}>
                <Text style={signupStyles.bulletPoint}>•</Text>
                <CustomText style={signupStyles.infoText}>Build a community around your passion</CustomText>
              </View>
              <View style={signupStyles.infoBullet}>
                <Text style={signupStyles.bulletPoint}>•</Text>
                <CustomText style={signupStyles.infoText}>Earn income from hosting</CustomText>
              </View>
              <View style={signupStyles.infoBullet}>
                <Text style={signupStyles.bulletPoint}>•</Text>
                <CustomText style={signupStyles.infoText}>Get verified host badge</CustomText>
              </View>
            </View>

            {/* Personal Information Section */}
            <View style={signupStyles.section}>
              <CustomText style={signupStyles.sectionTitle}>Personal Information</CustomText>
              
              <CustomText style={signupStyles.label}>Full Name</CustomText>
              <TextInput
                style={signupStyles.input}
                placeholder="Akash Thakur"
                placeholderTextColor="#94A3B8"
                value={firstName}
                onChangeText={setFirstName}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />

              <CustomText style={signupStyles.label}>Contact Number</CustomText>
              <TextInput
                style={signupStyles.input}
                placeholder="+91-9876543210"
                placeholderTextColor="#94A3B8"
                value={contactNumber}
                onChangeText={(text) => {
                  const numericText = text.replace(/[^0-9]/g, '');
                  if (numericText.length <= 10) setContactNumber(numericText);
                }}
                keyboardType="numeric"
                maxLength={10}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />

              <CustomText style={signupStyles.label}>Email Address</CustomText>
              <TextInput
                style={signupStyles.input}
                placeholder="akash@gmail.com"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />

              <View style={signupStyles.rowContainer}>
                <View style={signupStyles.halfWidth}>
                  <CustomText style={signupStyles.label}>State *</CustomText>
                  <TextInput
                    style={signupStyles.input}
                    placeholder="Select State"
                    placeholderTextColor="#94A3B8"
                    value={state}
                    onChangeText={setState}
                    allowFontScaling={false}
                    maxFontSizeMultiplier={1}
                  />
                </View>
                <View style={signupStyles.halfWidth}>
                  <CustomText style={signupStyles.label}>District *</CustomText>
                  <TextInput
                    style={signupStyles.input}
                    placeholder="Select District"
                    placeholderTextColor="#94A3B8"
                    value={district}
                    onChangeText={setDistrict}
                    allowFontScaling={false}
                    maxFontSizeMultiplier={1}
                  />
                </View>
              </View>

              <CustomText style={signupStyles.label}>City *</CustomText>
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
              <CustomText style={signupStyles.sectionTitle}>Experience & Expertise</CustomText>
              
              <CustomText style={signupStyles.label}>Do you have prior experience hosting events?</CustomText>
              <View style={signupStyles.radioContainer}>
                <TouchableOpacity
                  style={signupStyles.radioButton}
                  onPress={() => setHasExperience("no")}
                >
                  <View style={[
                    signupStyles.radioCircle,
                    hasExperience === "no" && signupStyles.radioCircleSelected
                  ]}>
                    {hasExperience === "no" && <View style={signupStyles.radioCircleInner} />}
                  </View>
                  <CustomText style={signupStyles.radioLabel}>No</CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={signupStyles.radioButton}
                  onPress={() => setHasExperience("yes")}
                >
                  <View style={[
                    signupStyles.radioCircle,
                    hasExperience === "yes" && signupStyles.radioCircleSelected
                  ]}>
                    {hasExperience === "yes" && <View style={signupStyles.radioCircleInner} />}
                  </View>
                  <CustomText style={signupStyles.radioLabel}>Yes</CustomText>
                </TouchableOpacity>
              </View>

              <CustomText style={signupStyles.label}>What type of events will you host? *</CustomText>
              <TextInput
                style={signupStyles.input}
                placeholder="Select event type"
                placeholderTextColor="#94A3B8"
                value={eventTypes}
                onChangeText={setEventTypes}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />

              <CustomText style={signupStyles.label}>Tell us about yourself as a host</CustomText>
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

              <CustomText style={signupStyles.label}>Portfolio/Website Link *</CustomText>
              <TextInput
                style={signupStyles.input}
                placeholder="Enter your website or instagram link"
                placeholderTextColor="#94A3B8"
                value={portfolioLink}
                onChangeText={setPortfolioLink}
                keyboardType="url"
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />

              <CustomText style={signupStyles.label}>Maximum group size you can manage *</CustomText>
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
              <CustomText style={signupStyles.sectionTitle}>Identity Verification</CustomText>
              
              <CustomText style={signupStyles.label}>Government ID Type *</CustomText>
              <TouchableOpacity 
                style={signupStyles.pickerButton}
                onPress={() => setShowIdTypePicker(!showIdTypePicker)}
              >
                <CustomText style={[
                  signupStyles.pickerButtonText,
                  !govIdType && signupStyles.placeholderText
                ]}>
                  {govIdType ? idTypes.find(t => t.value === govIdType)?.label : "Select an ID type"}
                </CustomText>
                <Ionicons name="chevron-down" size={20} color="#64748B" />
              </TouchableOpacity>

              {showIdTypePicker && (
                <View style={signupStyles.pickerDropdown}>
                  {idTypes.map((type) => (
                    <TouchableOpacity
                      key={type.value}
                      style={signupStyles.pickerOption}
                      onPress={() => {
                        setGovIdType(type.value);
                        setShowIdTypePicker(false);
                      }}
                    >
                      <CustomText style={signupStyles.pickerOptionText}>
                        {type.label}
                      </CustomText>
                      {govIdType === type.value && (
                        <Ionicons name="checkmark" size={20} color="#EF3053" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <CustomText style={signupStyles.label}>Government ID Number *</CustomText>
              <TextInput
                style={signupStyles.input}
                placeholder="Enter ID number"
                placeholderTextColor="#94A3B8"
                value={govIdNumber}
                onChangeText={setGovIdNumber}
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />

              <CustomText style={signupStyles.label}>Upload files</CustomText>
              <TouchableOpacity 
                style={signupStyles.uploadBox}
                onPress={handleFilePick}
              >
                <Ionicons name="cloud-upload-outline" size={32} color="#94A3B8" />
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
                    <Ionicons name="close-circle" size={20} color="#64748B" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Required Agreements Section */}
            <View style={signupStyles.section}>
              <CustomText style={signupStyles.sectionTitle}>Required Agreements</CustomText>
              
              <TouchableOpacity 
                style={signupStyles.checkboxContainer}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              >
                <View style={[
                  signupStyles.checkbox,
                  agreeToTerms && signupStyles.checkboxChecked
                ]}>
                  {agreeToTerms && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <CustomText style={signupStyles.checkboxLabel}>
                  I confirm the details provided are true.
                </CustomText>
              </TouchableOpacity>

              <TouchableOpacity 
                style={signupStyles.checkboxContainer}
                onPress={() => setAgreeToGuidelines(!agreeToGuidelines)}
              >
                <View style={[
                  signupStyles.checkbox,
                  agreeToGuidelines && signupStyles.checkboxChecked
                ]}>
                  {agreeToGuidelines && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
                <CustomText style={signupStyles.checkboxLabel}>
                  I agree to follow the platform safety and event guidelines.
                </CustomText>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Submit Button */}
          <Animated.View style={[signupStyles.bottomSection, { opacity: fadeAnim }]}>
            <View style={signupStyles.buttonRow}>
              <TouchableOpacity 
                style={signupStyles.backButton}
                onPress={() => navigation.goBack()}
              >
                <CustomText style={signupStyles.backButtonText}>Back</CustomText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={signupStyles.submitButton}
                onPress={onSignUp}
              >
                <CustomText style={signupStyles.submitButtonText}>Submit</CustomText>
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
    display:'flex',
    flexDirection:'row',
    gap:12
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
  bottomSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
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
});

export default Signup;