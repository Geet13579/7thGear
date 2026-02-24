import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  Animated,
} from "react-native";
import { colors } from "../constants/Colors";
import CustomText from "../universal/text";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "../universal/Button";
import UpperSection from "../universal/UpperSection";
import Title from "../universal/Title";
import Description from "../universal/subTitle";
import { useApi } from "../hooks/useApi";
import { LoadingPopup, SuccessPopup, ErrorPopup } from "../universal/popup";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";
import { postRequest } from "../api/commonQuery";
import { SEND_OTP, VERIFY_OTP } from "../constants/apiEndpoints";
import useAuthStore from "../store/authenticationStore";
import { jwtDecode } from "jwt-decode";

type RootStackParamList = {
  OTPVerification: { mobileNumber: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "OTPVerification">;

interface TokenData {
  access_token: string;
  refresh_token: string;
}

const OTP_LENGTH = 6;

const OTPVerification = ({ route, navigation }: Props) => {
  const { mobileNumber } = route.params;
  const logIn = useAuthStore((state) => state.logIn);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [resendTimer, setResendTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const otpInputs = useRef<(TextInput | null)[]>([]);

  const { fadeAnim, slideFromTop, slideFromBottom } = useEntranceAnimation();
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

  // ---------------- TIMER ----------------
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // ---------------- OTP CHANGE ----------------
  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      Keyboard.dismiss();
      handleVerifyOtp();
    }
  }, [otp]);

  // ---------------- RESEND OTP ----------------
  const handleResendOtp = async () => {
    try {
      setIsLoading(true);

      const res = await postRequest<{ status: boolean; message: string }>(
        SEND_OTP,
        { phone: mobileNumber }
      );

      if (res.status) {
        setSuccessMessage("OTP sent successfully!");
        setShowSuccess(true);
      } else {
        setErrorMessage(res.message);
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- VERIFY OTP ----------------
  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== OTP_LENGTH) {
      setErrorMessage("Please enter a valid OTP");
      setShowError(true);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const res = await postRequest<{
        status: boolean;
        message: string;
        data: TokenData;
      }>(VERIFY_OTP, {
        phone: mobileNumber,
        otp: otpCode,
      });

      if (res.status) {
        const decoded = jwtDecode(res.data.access_token);
        console.log("decoded", decoded)
        logIn(res.data.access_token, res.data.refresh_token, decoded);
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong. Please try again.");
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    baseHandleSuccessClose();
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <Animated.View
            style={[
              styles.content,
              { opacity: fadeAnim, transform: [{ translateY: slideFromTop }] },
            ]}
          >
            <UpperSection
              style={{ gap: 4, paddingVertical: 20, paddingHorizontal: 10 }}
            >
              <Title title="Input verification code" color={colors.text} />
              <Description
                description={`Please enter the code we sent to ${mobileNumber}`}
                color={colors.textSecondary}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.goBack()}
              >
                <CustomText style={styles.changeNumber}>Change</CustomText>
              </TouchableOpacity>
            </UpperSection>

            <View style={styles.otpContainer}>
              {Array(OTP_LENGTH)
                .fill(0)
                .map((_, index) => (
                  <View key={index} style={styles.otpInputWrapper}>
                    <TextInput
                      //@ts-expect-error null
                      ref={(ref) => (otpInputs.current[index] = ref)}
                      style={styles.otpInput}
                      value={otp[index]}
                      onChangeText={(text) => handleOtpChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      keyboardType="number-pad"
                      maxLength={1}
                      selectTextOnFocus
                      autoFocus={index === 0}
                      selectionColor={colors.primary}
                    />
                    <View
                      style={[
                        styles.otpUnderline,
                        otp[index] ? styles.otpUnderlineFilled : null,
                      ]}
                    />
                  </View>
                ))}
            </View>

            <View style={styles.resendSection}>
              <View style={styles.resendRow}>
                <CustomText style={styles.resendLabel}>
                  Resend code for reload
                </CustomText>
                <CustomText style={styles.timerText}>
                  {formatTime(resendTimer)}
                </CustomText>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideFromBottom }],
              },
            ]}
          >
            <View style={styles.resendLinkContainer}>
              <CustomText style={styles.resendQuestion}>
                Don't receive an OTP?{" "}
              </CustomText>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleResendOtp}
                disabled={isResendDisabled}
              >
                <CustomText
                  style={[
                    styles.resendLink,
                    isResendDisabled && styles.resendLinkDisabled,
                  ]}
                >
                  Resend now
                </CustomText>
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.7} style={styles.verifyButton}>
              <View>
                <Button title="Verify & Continue" onClick={handleVerifyOtp} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>

      {/* POPUPS */}
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
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 5 },
  changeNumber: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
    fontFamily: "Geist-Medium",
    textDecorationLine: "underline",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  otpInputWrapper: { alignItems: "center" },
  otpInput: {
    width: 45,
    height: 50,
    textAlign: "center",
    fontSize: 24,
    color: "#1A1A1A",
    fontFamily: "Geist-Medium",
    paddingBottom: 8,
  },
  otpUnderline: {
    width: 45,
    height: 1.5,
    backgroundColor: "#383838",
  },
  otpUnderlineFilled: { backgroundColor: colors.primary },
  resendSection: { marginBottom: 24 },
  resendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resendLabel: { fontSize: 14, color: "#6B7280" },
  timerText: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "600",
    fontFamily: "Geist-SemiBold",
  },
  resendLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: "space-between",
    marginTop: "auto",
    marginBottom: 10,
  },
  resendQuestion: { fontSize: 14, color: "#6B7280" },
  resendLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
    fontFamily: "Geist-SemiBold",
    textDecorationLine: "underline",
  },
  resendLinkDisabled: { color: "#9CA3AF" },
  verifyButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 40,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default OTPVerification;
