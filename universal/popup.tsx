// universal/Popup.tsx
import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CustomText from "./text";

const { width } = Dimensions.get("window");

// Loading Popup
export const LoadingPopup = ({ visible }: { visible: boolean }) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [visible]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.loadingContainer}>
          <Animated.View
            style={[styles.spinner, { transform: [{ rotate: spin }] }]}
          >
            <View style={styles.spinnerInner} />
          </Animated.View>
          <CustomText style={styles.loadingText}>Loading...</CustomText>
        </View>
      </View>
    </Modal>
  );
};

// Success Popup
export const SuccessPopup = ({
  visible,
  message,
  onClose,
}: {
  visible: boolean;
  message: string;
  onClose: () => void;
}) => {
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }).start();
    } else {
      scaleValue.setValue(0);
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.popupContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <View style={styles.successIcon}>
            <View style={styles.checkmark}>
              <View style={styles.checkmarkStem} />
              <View style={styles.checkmarkKick} />
            </View>
          </View>
          <CustomText style={styles.successTitle}>Success!</CustomText>
          <CustomText style={styles.successMessage}>{message}</CustomText>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.successButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <CustomText style={styles.successButtonText}>Continue</CustomText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Error Popup
export const ErrorPopup = ({
  visible,
  message,
  onClose,
}: {
  visible: boolean;
  message: string;
  onClose: () => void;
}) => {
  const shakeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(shakeValue, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeValue, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeValue, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeValue, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.popupContainer,
            { transform: [{ translateX: shakeValue }] },
          ]}
        >
          <View style={styles.errorIcon}>
            <View style={styles.crossLine1} />
            <View style={styles.crossLine2} />
          </View>
          <CustomText style={styles.errorTitle}>Oops!</CustomText>
          <CustomText style={styles.errorMessage}>{message}</CustomText>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.errorButton}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <CustomText style={styles.errorButtonText}>Try Again</CustomText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "#FFE5EC",
    borderTopColor: "#FF385C",
    marginBottom: 15,
  },
  spinnerInner: {
    width: 52,
    height: 52,
  },
  loadingText: {
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "600",
  },
  popupContainer: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    width: width * 0.85,
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  checkmark: {
    width: 40,
    height: 40,
    position: "relative",
  },
  checkmarkStem: {
    position: "absolute",
    width: 4,
    height: 24,
    backgroundColor: "#fff",
    left: 22,
    top: 8,
    transform: [{ rotate: "45deg" }],
    borderRadius: 2,
  },
  checkmarkKick: {
    position: "absolute",
    width: 4,
    height: 12,
    backgroundColor: "#fff",
    left: 12,
    top: 20,
    transform: [{ rotate: "-45deg" }],
    borderRadius: 2,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  successButton: {
    backgroundColor: "#10B981",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 140,
    alignItems: "center",
  },
  successButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  crossLine1: {
    position: "absolute",
    width: 4,
    height: 32,
    backgroundColor: "#fff",
    transform: [{ rotate: "45deg" }],
    borderRadius: 2,
  },
  crossLine2: {
    position: "absolute",
    width: 4,
    height: 32,
    backgroundColor: "#fff",
    transform: [{ rotate: "-45deg" }],
    borderRadius: 2,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  errorButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 140,
    alignItems: "center",
  },
  errorButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
