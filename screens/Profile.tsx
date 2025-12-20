import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomText from '../universal/text';
import CustomLight from '../universal/lightText';
import {useEntranceAnimation } from "../hooks/useEntranceAnimation";
import Container from '../universal/Container';
import { colors } from '../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Profile/header';

const Profile = () => {
  const navigation = useNavigation();

  const stats = [
    { value: '12', label: 'Events joined' },
    { value: '8', label: 'Trips completed' },
    { value: '5', label: 'Communities' },
    { value: '0', label: 'Events hosted' },
  ];

  const achievements = [
    { icon: '🏔️', label: 'Trek Master' },
    { icon: '🌍', label: 'Explorer' },
    { icon: '⭐', label: 'Community Star' },
    { icon: '🏖️', label: 'Beach Person' },
  ];

  const settings = [
    { icon: '📌', label: 'My Bookings', color: '#FF385C' },
    { icon: '❤️', label: 'Wishlists', color: '#FF385C' },
    { icon: '✏️', label: 'Edit Profile', color: '#FFB800' },
  ];

    const {fadeAnim, slideFromTop, slideFromBottom} = useEntranceAnimation();

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
                  <Animated.View style={[ {opacity: fadeAnim, transform: [{translateY: slideFromTop}]}]}>

       <Header/>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <CustomText style={styles.avatarText}>AS</CustomText>
          </View>
          <View style={styles.profileInfo}>
            <CustomText style={styles.profileName}>Akash Singh Thakur</CustomText>
            <CustomLight style={styles.profileBio}>
              Adventure Seeker • Travel Enthusiast •{'\n'}Community Builder
            </CustomLight>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <CustomText style={styles.sectionTitle}>Your Stats</CustomText>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <CustomText style={styles.statValue}>{stat.value}</CustomText>
                <CustomText style={styles.statLabel}>{stat.label}</CustomText>
              </View>
            ))}
          </View>
        </View>
        </Animated.View>



        {/* Achievements Section */}
        <Animated.View style={[{marginTop:20},{opacity: fadeAnim, transform: [{translateY: slideFromBottom}]}]}>
          <CustomText style={styles.sectionTitle}>Achievements</CustomText>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <CustomText style={styles.achievementIcon}>
                  {achievement.icon}
                </CustomText>
                <CustomText style={styles.achievementLabel}>
                  {achievement.label}
                </CustomText>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Settings Section */}
        <Animated.View style={[{marginTop:20},{opacity: fadeAnim, transform: [{translateY: slideFromBottom}]}]}>
          <CustomText style={styles.sectionTitle}>Settings</CustomText>
          <View style={styles.settingsList}>
            {settings.map((setting, index) => (
              <TouchableOpacity key={index} style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <CustomText style={styles.settingIcon}>{setting.icon}</CustomText>
                  <CustomText style={styles.settingLabel}>{setting.label}</CustomText>
                </View>
                <Feather name="chevron-right" size={20} color="#999" />
              </TouchableOpacity>
            ))}
            
            {/* Become a Host Button */}
            <TouchableOpacity style={styles.hostButton} onPress={() => navigation.navigate('BecomeHost')}>
              <View style={styles.settingLeft}>
                <CustomText style={styles.settingIcon}>🎯</CustomText>
                <CustomText style={styles.hostButtonText}>Become a Host</CustomText>
              </View>
              <Feather name="chevron-right" size={20} color="#FF385C" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20,
    gap: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#FF385C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  profileBio: {
    fontSize: 12,
    color: '#717171',
    lineHeight: 18,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: 13,
    color: '#717171',
  },
  achievementsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  achievementCard: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  achievementIcon: {
    fontSize: 25,
  },
  achievementLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  settingsList: {
    gap: 0,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    fontSize: 20,
  },
  settingLabel: {   
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  hostButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFE5EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  hostButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF385C',
  },
});

export default Profile;