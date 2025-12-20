import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import TextProfileSection from "../../universal/textWithProfile";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH - 40;
import { colors } from "../../constants/Colors";
import CustomText from "../../universal/text";
import Description from "./description";
import ImageSlider from "../../universal/imageSlider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const CommunityCard = () => {
  type RootStackParamList = {
    communityDetails: undefined;
  };

  const images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
  ];

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.card}>
      {/* Top Section - User who posted */}
      <View style={{ paddingTop: 5, paddingHorizontal: 10 }}>
        <TextProfileSection
          heading="Priya Sharma"
          subHeading="Mumbai"
          location="2 hours ago"
          bg={colors.primary}
          profile="PS"
          icon={false}
        />
      </View>

        {/* Bottom Section - Trip/Group Info */}
      <View>
        <TextProfileSection
          heading="Himalayan Trek Adventure"
          subHeading="By Adventure Seekers"
          location="Manali, Himachal Pradesh"
          bg={colors.textSecondary}
          profile="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxctjU21pUENIsGN1F4qY21P7GfdEbhTMp2g&s"
          icon={true}
        />
      </View>

      <ImageSlider images={images} />

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
    paddingVertical:10,
    marginTop:20,
    gap: 12,
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
});

export default CommunityCard;