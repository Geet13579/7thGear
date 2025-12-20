import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  ScrollView
} from "react-native";
import { colors } from "../constants/Colors";
import React, { useState } from "react";
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
import DescText from '../universal/lightText';

interface Experience {
  id: string;
  label: string;
  icon: string;
}

const experiences: Experience[] = [
  { id: 'biking', label: 'Biking', icon: '🚴' },
  { id: 'camping', label: 'Camping', icon: '🏕️' },
  { id: 'trekking', label: 'Trekking', icon: '🥾' },
  { id: 'wildlife', label: 'Wildlife', icon: '🦁' },
  { id: 'retreat', label: 'Retreat', icon: '🧘' },
  { id: 'beach', label: 'Beach', icon: '🏖️' },
  { id: 'adventure', label: 'Adventure', icon: '⛰️' },
  { id: 'wellness', label: 'Wellness', icon: '💆' },
];

const ExperienceSelection = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);

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

  const toggleExperience = (id: string) => {
    setSelectedExperiences(prev => 
      prev.includes(id) 
        ? prev.filter(exp => exp !== id)
        : [...prev, id]
    );
  };

  const onContinue = async () => {
    if (selectedExperiences.length === 0) {
      setErrorMessage("Please select at least one experience");
      setShowError(true);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccessMessage("Preferences saved successfully!");
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    baseHandleSuccessClose();
    // Navigate to next screen (e.g., home or dashboard)
    navigation.navigate("home");
  };

  const onGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={experienceStyles.container}>
        <ScrollView 
          style={experienceStyles.scrollView}
          contentContainerStyle={experienceStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingTop: 80 }}>
            <Ionicons 
              name="chevron-back" 
              size={24} 
              color="black" 
              onPress={() => navigation.goBack()} 
            />
          </View>

          <Animated.View style={[
            experienceStyles.content, 
            { opacity: fadeAnim, transform: [{ translateY: slideFromTop }] }
          ]}>
            <View style={{display: 'flex', flexDirection: 'column', gap:4, marginTop:20}}>
              <CustomText style={{ fontSize: 16, color: colors.text }} >What type of experiences excite you the most?</CustomText>
            
              <DescText style={{ fontSize: 16, color: colors.textSecondary }} >You can select multiple answers</DescText>
            </View>
            {/* Experience Options */}
            <View style={experienceStyles.experiencesContainer}>
              {experiences.map((experience) => (
                <TouchableOpacity
                  key={experience.id}
                  style={[
                    experienceStyles.experienceButton,
                    selectedExperiences.includes(experience.id) && 
                    experienceStyles.experienceButtonActive
                  ]}
                  onPress={() => toggleExperience(experience.id)}
                >
                  <CustomText style={experienceStyles.experienceIcon}>
                    {experience.icon}
                  </CustomText>
                  <CustomText style={[
                    experienceStyles.experienceText,
                    selectedExperiences.includes(experience.id) && 
                    experienceStyles.experienceTextActive
                  ]}>
                    {experience.label}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </ScrollView>

        <Animated.View style={[
          experienceStyles.bottomSection, 
          { opacity: fadeAnim, transform: [{ translateY: slideFromBottom }] }
        ]}>
          <Button title="Continue" onClick={onContinue} />
          <TouchableOpacity onPress={onGoBack} style={experienceStyles.goBackButton}>
            <CustomText style={experienceStyles.goBackText}>Go back</CustomText>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <LoadingPopup visible={isLoading} />
      <SuccessPopup visible={showSuccess} message={successMessage} onClose={handleSuccessClose} />
      <ErrorPopup visible={showError} message={errorMessage} onClose={handleErrorClose} />
    </>
  );
};

const experienceStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 200,
  },
  content: {
    flex: 1,
  },
  experiencesContainer: {
    marginTop: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
  },
  experienceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    
    // iOS shadow
    shadowColor: '#94A3B8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    
    // Android shadow
    elevation: 2,
  },
  experienceButtonActive: {
    backgroundColor: '#EF3053',
    borderColor: '#EF3053',
  },
  experienceIcon: {
    fontSize: 18,
  },
  experienceText: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Geist-Regular',
  },
  experienceTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Geist-Medium',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 40,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  goBackButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  goBackText: {
    fontSize: 15,
    color: '#64748B',
    fontFamily: 'Geist-Medium',
  },
});

export default ExperienceSelection;