// components/BottomSheet.tsx - Updated with nested sheet support
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import CustomText from '../universal/lightText';
import { colors } from '../constants/Colors';

const { height } = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onAddPost: () => void;
  onAddEvent: () => void;
  onAddContest: () => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  onAddPost,
  onAddEvent,
  onAddContest,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const [showEventOptions, setShowEventOptions] = useState(false);

  useEffect(() => {
    if (visible) {
      // Reset nested sheet when main sheet opens
      setShowEventOptions(false);
      
      // Animate in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleEventContestClick = () => {
    setShowEventOptions(true);
  };

  const handleBack = () => {
    setShowEventOptions(false);
  };

  const handleEventClick = () => {
    onAddEvent();
    onClose();
  };

  const handleContestClick = () => {
    onAddContest();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View 
          style={[
            styles.overlay,
            {
              opacity: opacityAnim,
            }
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.bottomSheet,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Handle Bar */}
              <View style={styles.handleBar} />

              {/* Main Options */}
              {!showEventOptions ? (
                <View style={styles.optionsContainer}>
                  {/* Add Post Button */}
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => {
                      onAddPost();
                      onClose();
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.iconContainer}>
                      <CustomText style={styles.icon}>📝</CustomText>
                    </View>
                    <CustomText style={styles.optionTitle}>Add Post</CustomText>
                  </TouchableOpacity>

                  {/* Add Event/Contest Button */}
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={handleEventContestClick}
                    activeOpacity={0.7}
                  >
                    <View style={styles.iconContainer}>
                      <CustomText style={styles.icon}>📅</CustomText>
                    </View>
                    <CustomText style={styles.optionTitle}>
                      Add Event/Contest
                    </CustomText>
                  </TouchableOpacity>
                </View>
              ) : (
                /* Event/Contest Options */
                <View>
                  {/* Back Button */}
                  <TouchableOpacity 
                    style={styles.backButton}
                    onPress={handleBack}
                    activeOpacity={0.7}
                  >
                    <CustomText style={styles.backText}>← Back</CustomText>
                  </TouchableOpacity>

                  <View style={styles.optionsContainer}>
                    {/* Add Event Button */}
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={handleEventClick}
                      activeOpacity={0.7}
                    >
                      <View style={styles.iconContainer}>
                        <CustomText style={styles.icon}>📅</CustomText>
                      </View>
                      <CustomText style={styles.optionTitle}>Add Event</CustomText>
                    </TouchableOpacity>

                    {/* Add Contest Button */}
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={handleContestClick}
                      activeOpacity={0.7}
                    >
                      <View style={styles.iconContainer}>
                        <CustomText style={styles.icon}>🏆</CustomText>
                      </View>
                      <CustomText style={styles.optionTitle}>Add Contest</CustomText>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingTop: 10,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
  },
  handleBar: {
    width: 50,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  optionButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FAFAFA',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
});

export default BottomSheet;