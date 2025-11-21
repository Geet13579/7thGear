
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "../constants/Colors";
import Title from "../universal/Title";
import Description from "../universal/Description";
import { useState } from "react";
import { Button, SignupButton } from "../universal/Button";
import UpperSection from "../universal/UpperSection";
import { useNavigation } from "@react-navigation/native";
//@ts-expect-error null
import { NativeStackNavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../router/Routes";
import CustomText from "../universal/text";
import { LoadingPopup, SuccessPopup, ErrorPopup } from "../universal/popup";
import { post } from "../utils/api";
import { useApi } from "../hooks/useApi";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  
  // All popup states managed by custom hook
  const {
    isLoading,
    showSuccess,
    showError,
    errorMessage,
    successMessage,
    setIsLoading,
    setShowSuccess,
    setShowError,
    setErrorMessage,
    setSuccessMessage,
    handleErrorClose,
    handleSuccessClose: baseHandleSuccessClose,
  } = useApi();
 
  const onMobileChange = (text: string) => {
    if (text.length > 10) return;
    setMobileNumber(text);
  };

  const onSignIn = async () => {
    // Client-side validation
    if (mobileNumber.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      setShowError(true);
      return;
    }

    // Simple API call with automatic loading, success, and error handling
    // await post(
    //   API_ENDPOINTS.AUTH.SEND_OTP, 
    //   { mobile: mobileNumber },
    //   {
    //     callbacks: {
    //       onStart: () => setIsLoading(true),
    //       onSuccess: (data) => {
    //         setSuccessMessage(data?.message || "OTP sent successfully!");
    //         setShowSuccess(true);
    //       },
    //       onError: (message) => {
    //         console.log("Error: ", message);
    //         setErrorMessage(message);
    //         setShowError(true);
    //       },
    //       onFinally: () => setIsLoading(false),
    //     }
    //   }
    // );
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSuccessMessage("OTP sent successfully!");
            setShowSuccess(true);

  };

  const handleSuccessClose = () => {
    baseHandleSuccessClose();
   navigation.navigate("otpVerification", { mobileNumber });

  };

  return (
    <>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <UpperSection style={{ alignItems: "center" }}>
            <Image 
              source={require("../assets/logo.png")} 
              style={{ width: 100, height: 100 }} 
            />
            <Title title="Welcome to 7th Gear" color={colors.text} />
            <Description
              description="Login or sign up to continue"
              color={colors.text}
            />
          </UpperSection>

          <View style={styles.form}>
            <CustomText style={styles.label}>Mobile Number</CustomText>
            <View style={styles.input}>
              <TextInput
                placeholder="10-digit mobile number"
                value={mobileNumber}
                onChangeText={onMobileChange}
                keyboardType="numeric"
                placeholderTextColor={colors.placeholder}
                maxLength={10}
                style={styles.textInput}
                autoFocus
                allowFontScaling={false}
                maxFontSizeMultiplier={1}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Login" onClick={onSignIn} />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.divider} />
          </View>
          
          <SignupButton 
            title="Sign up" 
            onClick={() => navigation.navigate("signup")} 
          />
        </View>
      </KeyboardAvoidingView>

      {/* Popups - automatically managed by useApi hook */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  form: {
    flexDirection: "column",
    paddingHorizontal: 40,
    marginTop: 20,
  },
  input: {
    borderColor: "#94A3B8",
    borderWidth: 0.8,
    borderRadius: 5,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    fontFamily: 'Geist-Regular',
  },
  textInput: {
    paddingVertical: 15,
    flex: 1,
    color: "#000",
    fontFamily: 'Geist-Regular',
  },
  label: {
    color: "#0F172A",
    fontSize: 13,
    marginBottom: 6,
    fontFamily: 'Geist-Regular',
  },
  buttonContainer: {
    paddingHorizontal: 40,
    marginTop: 20,
  },
  bottomSection: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    gap: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#717171',
    fontSize: 14,
    fontFamily: 'Geist-Regular',
  },
});

export default Login;