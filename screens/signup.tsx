import {
  Image,
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated
} from "react-native";
import { colors } from "../constants/Colors";
import { useState } from "react";
import { Button } from "../universal/Button";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
//@ts-expect-error null
import { NativeStackNavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../router/Routes";
import CustomText from "../universal/text";
import { LoadingPopup, SuccessPopup, ErrorPopup } from "../universal/popup";
import { useApi } from "../hooks/useApi";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import UpperSection from "../universal/UpperSection";
import Title from "../universal/Title";
import Description from "../universal/Description";
import DateTimePicker from '@react-native-community/datetimepicker';


const Signup = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

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

  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const onSignUp = async () => {
    if (!firstName || !lastName || mobileNumber.length !== 10) {
      setErrorMessage("Please fill all required fields");
      setShowError(true);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccessMessage("Registration successful!");
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    baseHandleSuccessClose();
    navigation.navigate("otpVerification", { mobileNumber });
  };

  return (
    <>
      <KeyboardAvoidingView
        style={signupStyles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >


        <View style={signupStyles.scrollContent}>

          <View style={{ paddingTop: 80 }}>
            <Ionicons name="chevron-back" size={24} color="black" onPress={() => navigation.goBack()} />

          </View>

          <Animated.View style={[signupStyles.content, { opacity: fadeAnim, transform: [{ translateY: slideFromTop }] }]}>


            <UpperSection style={{ alignItems: "center", paddingTop: 10 }}>

              <Image
                source={require("../assets/logo.png")}
              />
              <Title title="Sign Up" color={colors.text} />
              <Description
                description="Register your self and get ready for adventure"
                color={colors.text}
              />
            </UpperSection>



            {/* Form Fields */}
            <View style={signupStyles.form}>
              {/* Name Row */}
              <View style={signupStyles.rowContainer}>
                <View style={signupStyles.halfWidth}>
                  <CustomText style={signupStyles.label}>First Name</CustomText>
                  <TextInput
                    style={signupStyles.input}
                    placeholder="Enter first name"
                    placeholderTextColor="#94A3B8"
                    value={firstName}
                    onChangeText={setFirstName}
                    allowFontScaling={false}
                    maxFontSizeMultiplier={1}
                  />
                </View>
                <View style={signupStyles.halfWidth}>
                  <CustomText style={signupStyles.label}>Last Name</CustomText>
                  <TextInput
                    style={signupStyles.input}
                    placeholder="Enter last name"
                    placeholderTextColor="#94A3B8"
                    value={lastName}
                    onChangeText={setLastName}
                    allowFontScaling={false}
                    maxFontSizeMultiplier={1}
                  />
                </View>
              </View>

              {/* Mobile Number */}
              <View style={signupStyles.fieldContainer}>
                <CustomText style={signupStyles.label}>Mobile Number</CustomText>
                <TextInput
                  style={signupStyles.input}
                  placeholder="10-digit mobile number"
                  placeholderTextColor="#94A3B8"
                  value={mobileNumber}
                  onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, '');
                    if (numericText.length <= 10) setMobileNumber(numericText);
                  }}
                  keyboardType="numeric"
                  maxLength={10}
                  allowFontScaling={false}
                  maxFontSizeMultiplier={1}
                />
              </View>

              {/* Gender */}
              <View style={signupStyles.fieldContainer}>
                <CustomText style={signupStyles.label}>Gender</CustomText>
                <View style={signupStyles.genderContainer}>
                  {['Male', 'Female', 'Other'].map((g) => (
                    <TouchableOpacity
                      key={g}
                      style={[
                        signupStyles.genderButton,
                        gender === g && signupStyles.genderButtonActive
                      ]}
                      onPress={() => setGender(g)}
                    >
                      <CustomText style={[
                        signupStyles.genderText,
                        gender === g && signupStyles.genderTextActive
                      ]}>
                        {g}
                      </CustomText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Date of Birth */}
              <View style={signupStyles.fieldContainer}>
                <CustomText style={signupStyles.label}>Date of Birth</CustomText>
                <TouchableOpacity
                  style={signupStyles.dateInput}
                  onPress={() => setShowDatePicker(true)}
                >
                  <CustomText style={signupStyles.dateText}>{formatDate(dateOfBirth)}</CustomText>
                  <CustomText style={signupStyles.calendarIcon}>📅</CustomText>
                </TouchableOpacity>
              </View>

              {/* Date Picker */}
              {showDatePicker && (
                <DateTimePicker
                  value={dateOfBirth}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>


          </Animated.View>


        </View>
        <Animated.View style={[signupStyles.bottomSection, { opacity: fadeAnim, transform: [{ translateY: slideFromBottom }] }]}>

          <Button title="Sign Up" onClick={onSignUp} />
        </Animated.View>
      </KeyboardAvoidingView >

      <LoadingPopup visible={isLoading} />
      <SuccessPopup visible={showSuccess} message={successMessage} onClose={handleSuccessClose} />
      <ErrorPopup visible={showError} message={errorMessage} onClose={handleErrorClose} />
    </>
  );
};

const signupStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  backButton: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backIcon: {
    fontSize: 24,
    color: '#0F172A',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  titleSection: {
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 24,
    fontFamily: 'Geist-Bold',
    color: '#0F172A',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
  },
  form: {
    marginBottom: 24,
    marginTop: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  halfWidth: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Geist-Medium',
    color: '#0F172A',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },


  genderButton: {
    boxShadow: 'rgba(148, 163, 184, 0.5) 0px 2px 2px 0px',

    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',


    // iOS shadow
    shadowColor: '#94A3B8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    // Android shadow
    elevation: 4,

    alignItems: 'center',
    justifyContent: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#EF3053',
    borderColor: '#EF3053',
  },
  genderText: {
    fontSize: 14,
    color: '#64748B',
  },
  genderTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Geist-Medium',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontSize: 15,
    color: '#0F172A',
  },
  calendarIcon: {
    fontSize: 18,
  },
  bottomSection: {
    paddingHorizontal: 40,
    paddingBottom: 80,
    gap: 10,
  },
});

export default Signup;