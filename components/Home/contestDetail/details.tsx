// CommunityCard.tsx - Complete version with Tabs
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from "react-native";
import TextProfileSection from "../../../universal/textWithProfile";
import { colors } from "../../../constants/Colors";
import CustomText from "../../../universal/lightText";
import ImageSlider from "../../../universal/imageSlider";
import Description from "../../../universal/Description";
import UpperSection from "../../../universal/UpperSection";
import Title from "../../../universal/Title";
import Subtitle from '../../../universal/subTitle';
import { Button } from "../../../universal/Button";

const CommunityCard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  interface CardItem {
    id: string;
    title: string;
    description: string;
  }

  interface Rule {
    id: string;
    text: string;
  }

  interface Prize {
    id: string;
    icon: string;
    title: string;
  }

  interface Submission {
    id: string;
    username: string;
    image: string;
    likes: number;
  }

  const cardItems: CardItem[] = [
    {
      id: '1',
      title: 'Date',
      description: 'Nov 15-17, 2025',
    },
    {
      id: '2',
      title: 'Participants',
      description: '16/30 Joined',
    },
    {
      id: '3',
      title: 'Entry Limit',
      description: 'Max 5 Photos',
    }
  ];

  const rules: Rule[] = [
    {
      id: '1',
      text: 'JPEG or PNG only. Max 20MB per file.',
    },
    {
      id: '2',
      text: 'No AI composites. Basic color and exposure edits only.',
    },
    {
      id: '3',
      text: 'Strict ethical wildlife practices. No baiting or disturbance.',
    },
    {
      id: '4',
      text: 'Photos must be taken during the contest period.',
    },
    {
      id: '5',
      text: 'All submissions must be original work.',
    },
  ];

  const prizes: Prize[] = [
    {
      id: '1',
      icon: '🏆',
      title: 'Wildlife Explorer Trip',
    },
    {
      id: '2',
      icon: '⭐',
      title: 'Gear + Feature on 7th Gear',
    },
  ];

  const mySubmissions: Submission[] = [
    {
      id: '1',
      username: 'You',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      likes: 24,
    },
    {
      id: '2',
      username: 'You',
      image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400',
      likes: 18,
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'brief', label: 'Brief & Rules' },
    { id: 'submissions', label: 'My Submissions' },
    { id: 'results', label: 'Results' },
  ];

  const images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
  ];

  const onSignIn = async () => {
    // Handle sign in logic
  };

  const renderRule = ({ item }: { item: Rule }) => (
    <View style={styles.ruleItem}>
      <CustomText style={styles.ruleBullet}>•</CustomText>
      <CustomText style={styles.ruleText}>{item.text}</CustomText>
    </View>
  );

  const renderPrize = ({ item }: { item: Prize }) => (
    <View style={styles.prizeCard}>
      <CustomText style={styles.prizeIcon}>{item.icon}</CustomText>
      <CustomText style={styles.prizeTitle}>{item.title}</CustomText>
    </View>
  );

  const renderSubmission = ({ item }: { item: Submission }) => (
    <View style={styles.submissionCard}>
      <View style={styles.submissionImage}>
        <CustomText style={styles.imageText}>📷</CustomText>
      </View>
      <View style={styles.submissionInfo}>
        <CustomText style={styles.submissionUsername}>{item.username}</CustomText>
        <CustomText style={styles.submissionLikes}>❤️ {item.likes} likes</CustomText>
      </View>
    </View>
  );

  // Overview Tab Content
  const renderOverview = () => (
    <View style={styles.tabContent}>


      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>Quick Info</CustomText>
        <View style={styles.infoRow}>
          <CustomText style={styles.infoLabel}>Timeline:</CustomText>
          <CustomText style={styles.infoValue}>Entries close in 7d 05h</CustomText>
        </View>
        <View style={styles.infoRow}>
          <CustomText style={styles.infoLabel}>Difficulty Level:</CustomText>
          <CustomText style={styles.infoValue}>Beginner-Friendly</CustomText>
        </View>
        <View style={styles.infoRow}>
          <CustomText style={styles.infoLabel}>Judging Phase:</CustomText>
          <CustomText style={styles.infoValue}>Jury Review starts in 8 days</CustomText>
        </View>
      </View>
    </View>
  );

  // Brief & Rules Tab Content
  const renderBriefAndRules = () => (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>Contest Theme</CustomText>
        <CustomText style={styles.briefText}>
          Capture authentic moments from the wild – portraits, behaviour, habitat and the unseen stories of nature.
        </CustomText>
      </View>

      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>Key Rules</CustomText>
        <FlatList
          data={rules}
          renderItem={renderRule}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.ethicsBox}>
        <CustomText style={styles.ethicsTitle}>Ethics First</CustomText>
        <CustomText style={styles.ethicsText}>
          Entries that violate ethical guidelines may be disqualified at any stage.
        </CustomText>
      </View>

      <View style={styles.section}>
        <CustomText style={styles.sectionTitle}>Prizes</CustomText>
        <FlatList
          data={prizes}
          renderItem={renderPrize}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </View>
  );

  // My Submissions Tab Content
  const renderMySubmissions = () => (
    <View style={styles.tabContent}>
      <View style={styles.submissionHeader}>
        <CustomText style={styles.sectionTitle}>My Entries</CustomText>
        <CustomText style={styles.submissionCount}>2/5 entries used</CustomText>
      </View>

      <FlatList
        data={mySubmissions}
        renderItem={renderSubmission}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.uploadButton}>
        <CustomText style={styles.uploadButtonText}>+ Upload New Photo</CustomText>
      </TouchableOpacity>
    </View>
  );

  // Results Tab Content
  const renderResults = () => (
    <View style={styles.tabContent}>
      <View style={styles.resultsPlaceholder}>
        <CustomText style={styles.resultsIcon}>🏆</CustomText>
        <CustomText style={styles.resultsTitle}>Results Coming Soon</CustomText>
        <CustomText style={styles.resultsText}>
          Winner Announcement Date: 30 Nov, 2025
        </CustomText>
        <CustomText style={styles.resultsSubtext}>
          Jury review starts in 8 days. Good luck to all participants!
        </CustomText>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'brief':
        return renderBriefAndRules();
      case 'submissions':
        return renderMySubmissions();
      case 'results':
        return renderResults();
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <ImageSlider images={images} />

          <View style={styles.header}>
            <UpperSection style={{ paddingTop: 20 }}>
              <Title title="Ranthambore National Park" color={colors.black} />
              <Subtitle description="Ranthambore, Rajasthan" />
            </UpperSection>
          </View>

          <View style={styles.content}>
            <TextProfileSection
              heading="Hosted by Adventure Seekers"
              subHeading="Member since 2019"
              bg={colors.primary}
              profile="AS"
              icon={false}
            />
            <View style={styles.almostFullBadge}>
              <CustomText style={styles.badgeText}>Verified</CustomText>
            </View>
          </View>
          <View style={{ paddingHorizontal: 10, display: 'flex', flexDirection: 'column', gap: 15 }}>
            <Description description="Experience the wild beauty of Ranthambhore National Park and take part in an exciting photography challenge capturing its iconic tigers and landscapes." />

            <View style={styles.cardsContainer}>
              <View style={styles.row}>
                {cardItems.map((item) => (
                  <View key={item.id} style={styles.card1}>
                    <CustomText style={styles.cardTitle}>{item.title}</CustomText>
                    <CustomText style={styles.cardDescription}>{item.description}</CustomText>
                  </View>
                ))}
              </View>
            </View>

           

          </View>
 <View style={styles.buttonContainer}>
              <Button title="Join" onClick={onSignIn} />
            </View>

          {/* Tabs Section */}
          <View style={styles.tabsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabsScrollContent}
            >
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  style={[
                    styles.tab,
                    activeTab === tab.id && styles.activeTab
                  ]}
                  onPress={() => setActiveTab(tab.id)}
                >
                  <CustomText
                    style={[
                      styles.tabText,
                      activeTab === tab.id && styles.activeTabText
                    ]}
                  >
                    {tab.label}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Tab Content */}
          <View style={styles.contentContainer}>
            {renderTabContent()}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  almostFullBadge: {
    backgroundColor: "#34C759",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 26,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 20,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  cardsContainer: {
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
  },
  card1: {
    width: '48%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  cardDescription: {
    fontSize: 12,
    color: '#717171',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 20,
    marginHorizontal: 16,
    borderColor: "#E2E8F0",
  },
  // Tabs Styles
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginTop: 20,
    marginHorizontal: 16,
  },
  tabsScrollContent: {
    paddingRight: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#717171',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  contentContainer: {
    paddingHorizontal: 26,
    paddingTop: 20,
  },
  tabContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 12,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 10,
  },
  ruleBullet: {
    fontSize: 16,
    color: colors.text,
    marginRight: 10,
    lineHeight: 20,
  },
  ruleText: {
    fontSize: 14,
    color: '#717171',
    flex: 1,
    lineHeight: 20,
  },
  prizeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    gap: 12,
    backgroundColor: '#fff',
  },
  prizeIcon: {
    fontSize: 24,
  },
  prizeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 14,
    color: '#717171',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  briefText: {
    fontSize: 14,
    color: '#717171',
    lineHeight: 20,
  },
  ethicsBox: {
    backgroundColor: '#FEF2F2',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    marginTop: 20,
  },
  ethicsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 5,
  },
  ethicsText: {
    fontSize: 13,
    color: '#991B1B',
    lineHeight: 18,
  },
  submissionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  submissionCount: {
    fontSize: 14,
    color: '#717171',
  },
  submissionCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    gap: 12,
  },
  submissionImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 32,
  },
  submissionInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  submissionUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  submissionLikes: {
    fontSize: 13,
    color: '#717171',
  },
  uploadButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  resultsPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  resultsIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 10,
  },
  resultsText: {
    fontSize: 14,
    color: '#717171',
    textAlign: 'center',
    marginBottom: 8,
  },
  resultsSubtext: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default CommunityCard;