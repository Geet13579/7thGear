import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/Colors";
import CustomText from "../universal/lightText";
import Title from "../universal/Title";
import { useNavigation } from "@react-navigation/native";
import PriceButtonTextSection from "../universal/priceButtonCard";
import Container from "../universal/Container";
import { postRequest } from "../api/commonQuery";
import RazorpayCheckout from "react-native-razorpay";
import { useApi } from "../hooks/useApi";
import { BOOK_SLOT_IN_EVENT, CREATE_ORDER } from "../constants/apiEndpoints";
import { ErrorPopup, SuccessPopup } from "../universal/popup";

const SelectSlots = ({ route }: any) => {
  const [travellers, setTravellers] = useState(1);

  const navigation = useNavigation();
  const {
    cat_uid,
    event_id,
    manager_id,
    status,
    entry_type,
    price,
    slots_left,
  } = route.params;
  const gstRate = 0.18;

  const subtotal = price * travellers;
  const gst = Math.round(subtotal * gstRate);
  const total = subtotal + gst;

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

  const incrementTravellers = () => {
    console.log(travellers, slots_left);
    if (travellers < slots_left) {
      setTravellers(travellers + 1);
    }
  };

  const decrementTravellers = () => {
    if (travellers > 1) {
      setTravellers(travellers - 1);
    }
  };

  const startPayment = async () => {
    setIsLoading(true);
    try {
      const postData = {
        amount: total,
      };
      // Step 1: Create order on the backend
      const data = await postRequest<{ data: { razorpay_order_id: string } }>(
        CREATE_ORDER,
        postData,
      );
      console.log(data);
      const order = data.data.razorpay_order_id;

      if (!order) {
        console.log(order);
        setShowError(true);
        setErrorMessage("Something went wrong");
      }

      // Step 2: Open Razorpay payment UI
      const options = {
        description: "Slot booking Payment",
        image: "https://myhealthyplan.in/favicon.ico",
        currency: "INR",
        key: "rzp_test_LVFf8hbVXDm2z2",
        // key: "rzp_test_LVFf8hbVXDm2z2",
        amount: total,
        name: "7thGear",
        order_id: order,
        prefill: {
          email: "",
          contact: "",
          name: "Sathish",
        },
        theme: { color: colors.primary },
      };

      RazorpayCheckout.open(options)
        .then(async (paymentData: any) => {
          const postData = {
            razorpay_order_id: order,
            razorpay_payment_id: paymentData.razorpay_payment_id,
            razorpay_signature: paymentData.razorpay_signature,
            cat_uid: cat_uid,
            event_id: event_id,
            manager_id: manager_id,
            slot_count: travellers,
            entry_type: entry_type,
            total_amt: total,
          };

          console.log(postData);

          const verifyResponse = await postRequest(
            BOOK_SLOT_IN_EVENT,
            postData,
          );
          console.log(verifyResponse);

          if (verifyResponse.status) {
            setShowSuccess(true);
            setSuccessMessage("Slot booked successfully");
          } else {
            setShowError(true);
            setErrorMessage("Slot booking failed");
          }
        })
        .catch((error: any) => {
          console.log(error);
          setShowError(true);
          setErrorMessage("Slot booking failed");
        });
    } catch (error) {
      console.log(error);
      setShowError(true);
      setErrorMessage("Slot booking failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onClosingSucessModal = () => {
    handleSuccessClose();
    navigation.goBack();
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView style={styles.container}>
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
            <Title title="Select Slots" color={colors.black} />
            <View style={{ width: 24 }} />
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* How many spots section */}
            <View style={styles.section}>
              <CustomText style={styles.sectionTitle}>
                How many spots?
              </CustomText>
              <CustomText style={styles.sectionSubtitle}>
                Select the number of people joining
              </CustomText>

              <View style={styles.travellerCounter}>
                <View style={styles.travellerInfo}>
                  <Feather name="users" size={20} color={colors.text} />
                  <CustomText style={styles.travellerText}>
                    Participants
                  </CustomText>
                </View>

                <View style={styles.counterControls}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.counterButton,
                      travellers === 1 && styles.counterButtonDisabled,
                    ]}
                    onPress={decrementTravellers}
                    disabled={travellers === 1}
                  >
                    <Feather
                      name="minus"
                      size={20}
                      color={travellers === 1 ? "#ccc" : colors.text}
                    />
                  </TouchableOpacity>

                  <CustomText style={styles.counterValue}>
                    {travellers}
                  </CustomText>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.counterButton,
                      travellers === 20 && styles.counterButtonDisabled,
                    ]}
                    onPress={incrementTravellers}
                    disabled={travellers === slots_left}
                  >
                    <Feather
                      name="plus"
                      size={20}
                      color={travellers === slots_left ? "#ccc" : colors.text}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {travellers >= 17 && (
                <CustomText style={styles.warningText}>
                  Only {20 - travellers + 1} spots left
                </CustomText>
              )}
            </View>

            {/* Price Details */}
            <View style={styles.priceSection}>
              <CustomText style={styles.priceTitle}>Payment Summary</CustomText>

              <View style={styles.priceRow}>
                <CustomText style={styles.priceLabel}>
                  ₹{price.toLocaleString("en-IN")} × {travellers} Slot(s)
                </CustomText>
                <CustomText style={styles.priceValue}>
                  ₹{subtotal.toLocaleString("en-IN")}
                </CustomText>
              </View>

              <View style={styles.priceRow}>
                <CustomText style={styles.priceLabel}>GST (18%)</CustomText>
                <CustomText style={styles.priceValue}>
                  ₹{gst.toLocaleString("en-IN")}
                </CustomText>
              </View>

              <View style={styles.priceRow}>
                <CustomText style={styles.priceLabel}>Platform Fee</CustomText>
                <CustomText style={styles.priceValue}>₹0</CustomText>
              </View>

              <View style={[styles.priceRow, styles.totalRow]}>
                <CustomText style={styles.totalLabel}>Total</CustomText>
                <CustomText style={styles.totalValue}>
                  ₹{total.toLocaleString("en-IN")}
                </CustomText>
              </View>
            </View>
          </View>

          {/* Bottom Button */}
          <View style={styles.bottomSection}>
            <PriceButtonTextSection
              price={"₹" + total.toLocaleString("en-IN")}
              priceHeading=""
              subHeading="Inc. GST"
              buttonText="Proceed to payment"
              onClickFunc={startPayment}
              // payment page
            />
          </View>
        </ScrollView>
      </ScrollView>

      <SuccessPopup
        visible={showSuccess}
        message={successMessage}
        onClose={onClosingSucessModal}
      />
      <ErrorPopup
        visible={showError}
        message={errorMessage}
        onClose={handleErrorClose}
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
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  content: {
    paddingTop: 24,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 24,
  },
  travellerCounter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
  },
  travellerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  travellerText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black,
  },
  counterControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  counterButtonDisabled: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
  },
  counterValue: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.black,
    minWidth: 24,
    textAlign: "center",
  },
  warningText: {
    fontSize: 12,
    color: "#FF385C",
    marginTop: 12,
    fontWeight: "500",
  },
  formSection: {
    marginBottom: 32,
  },
  formRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
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
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "#EFF6FF",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#0066CC",
    lineHeight: 18,
  },
  priceSection: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    gap: 8,
  },
  priceTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLabel: {
    fontSize: 14,
    color: colors.text,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.black,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 16,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF385C",
  },
  bottomSection: {
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
  bottomTotal: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.black,
  },
  bottomSubtext: {
    fontSize: 12,
    color: colors.text,
    marginTop: 2,
  },
  continueButton: {
    backgroundColor: "#FF385C",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default SelectSlots;
