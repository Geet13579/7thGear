// CommunityCard.tsx - Full page version with sticky comment
import React from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import TextProfileSection from "../../../universal/textWithProfile";
import { colors } from "../../../constants/Colors";
import CustomText from "../../../universal/lightText";
import Description from "../description";
import ImageSlider from "../../../universal/imageSlider";
import { Entypo, Feather } from "@expo/vector-icons";
import AddComment from "./add-comment";

const CommunityCard = () => {
  const images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
  ];

  const handleCommentSubmit = (commentText: string): void => {
    console.log('New comment:', commentText);
  };

  return (
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={{ paddingHorizontal: 22 }}>
              <TextProfileSection
                heading="Hosted by Adventure Seekers"
                subHeading="Member since 2019"
                bg={colors.primary}
                profile="AS"
                icon={false}
              />
            </View>

            <ImageSlider images={images} />
            
            <View style={{ paddingHorizontal: 10, display: 'flex', flexDirection: 'column', gap: 15 }}>
              <Description description="Priya Sharma Day 3 at 15,000ft! The sunrise from the summit was absolutely magical. Shoutout to our amazing group and guide for making this journey unforgettable. Best decision ever! 🏔️✨" />

              <View style={{ paddingHorizontal: 10 }}>
                <CustomText style={{ backgroundColor: '#E2E8F0', padding: 10, borderRadius: 20, fontSize: 12, color: colors.text, fontWeight: '800' }}>
                  📍 Himalayan Trek Adventure by Adventure Seekers
                </CustomText>
              </View>
              
              <View style={{ paddingHorizontal: 10 }}>
                <CustomText style={{ fontSize: 12, color: colors.textSecondary }}>2 hours ago</CustomText>
              </View>

              <View style={{ borderTopWidth: 1, borderColor: '#E2E8F0', paddingTop: 10 }} />

              <View style={{ paddingHorizontal: 10, display: 'flex', flexDirection: 'column' }}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <View style={styles.content}>
                      <TextProfileSection
                        heading="Hosted by Adventure Seekers"
                        subHeading="This looks stunning! Adding to my bucket list 🙌"
                        bg={colors.primary}
                        profile="AS"
                        icon={false}
                        subHeadingColor={colors.text}
                      />

                      <View style={{ padding: 10, borderRadius: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Feather name="heart" size={20} color="#94A3B8" />
                      </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, paddingTop: 10, paddingBottom: 20, display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <CustomText style={{ fontSize: 12, color: colors.textSecondary }}>2 hours ago</CustomText>
                      <Entypo name="dot-single" size={20} color={colors.textSecondary} />
                      <CustomText style={{ fontSize: 12, color: colors.textSecondary }}>12 likes</CustomText>
                    </View>
                  </React.Fragment>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Sticky Add Comment at Bottom */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          style={styles.commentContainer}
        >
          <AddComment 
            onSubmit={handleCommentSubmit}
            placeholder="Add a comment..."
            userInitials="AS"
            backgroundColor={colors.primary}
          />
        </KeyboardAvoidingView>
      </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
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
  card: {
    backgroundColor: "#fff",
    marginTop: 20,
    gap: 12,
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    backgroundColor: '#F7FAFE',
    paddingHorizontal: 10,
    borderRadius: 12,
  },
 commentContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 5, // for Android shadow
}
});

export default CommunityCard;