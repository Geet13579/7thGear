import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import TextProfileSection from "../../universal/textWithProfile";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH - 40; // Accounting for card padding
import { colors } from "../../constants/Colors";
import CustomText from "../../universal/text";
import Description from "./description";
import ImageSlider from "../../universal/imageSlider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const CommunityCard = () => {
  type RootStackParamList = {
    communityDetails: undefined;
    // Add other screens as needed
  };
  // Replace these with your actual images
  const images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
  ];

  // Google's sample videos (publicly available)
  const videoArray = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  ];

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.card}>
      <View style={{ paddingTop: 5, paddingHorizontal: 10 }}>
        <TextProfileSection
          heading="Hosted by Adventure Seekers"
          subHeading="Member since 2019"
          bg={colors.primary}
          profile="AS"
          icon={false}
        />
      </View>

      <ImageSlider images={images} />
      {/* <VideoSlider videos={videoArray} /> */}

      <Description description="Priya Sharma Day 3 at 15,000ft! The sunrise from the summit was absolutely magical. Shoutout to our amazing group and guide for making this journey unforgettable. Best decision ever! 🏔️✨" />

      <TouchableOpacity
        activeOpacity={0.7}
        style={{ paddingHorizontal: 10 }}
        onPress={() => navigation.navigate("communityDetails")}
      >
        <CustomText
          style={{
            fontSize: 12,
            color: colors.textSecondary,
            fontWeight: "800",
          }}
        >
          View all 42 comments
        </CustomText>
      </TouchableOpacity>

      <View>
        <TextProfileSection
          heading="Himalayan Trek Adventure"
          subHeading="Member since 2019"
          bg={colors.textSecondary}
          profile="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxctjU21pUENIsGN1F4qY21P7GfdEbhTMp2g&s"
          icon={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    borderRadius: 12,
    marginTop: 20,
    paddingTop: 10,
    gap: 12,
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  sliderContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dotContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  counterContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default CommunityCard;
