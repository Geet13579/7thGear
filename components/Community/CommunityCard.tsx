import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import TextProfileSection from "../../universal/textWithProfile";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_WIDTH = SCREEN_WIDTH - 40;
import { colors } from "../../constants/Colors";
import CustomText from "../../universal/text";
import Description from "./description";
import ImageSlider from "../../universal/imageSlider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import VideoPlayer from "./VideoPlayer";
import { IMAGE_URL } from "../../constants/apiEndpoints";
import moment from "moment";

const CommunityCard = ({
  post,
  onOpenComments,
}: {
  post: any;
  onOpenComments: (postId: string, eventId: string) => void;
}) => {
  type RootStackParamList = {
    communityDetails: undefined;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.card}>
      {/* Top Section - User who posted */}
      <View style={{ paddingTop: 5, paddingHorizontal: 10 }}>
        <TextProfileSection
          heading={post.user_f_name.trim() + " " + post.user_l_name.trim()}
          subHeading={post.user_city}
          location={"Posted " + moment(post.created_at).fromNow()}
          bg={colors.primary}
          profile={post.user_f_name.trim()[0] + post.user_l_name.trim()[0]}
          icon={false}
        />
      </View>

      {post.media_type === "IMAGE" && (
        <ImageSlider
          images={post.media_link.map((item) => IMAGE_URL + "/" + item)}
        />
      )}
      {post.media_type === "VIDEO" && (
        <VideoPlayer videoUrl={post.media_link} />
      )}

      {/* Bottom Section - Trip/Group Info */}
      <View style={{ paddingTop: 0, paddingHorizontal: 15 }}>
        <TextProfileSection
          heading={post.event_title}
          subHeading={
            "Hosted by " +
            post.manager_f_name.trim() +
            " " +
            post.manager_l_name.trim()
          }
          location={"📍 " + post.event_location}
          bg={colors.textSecondary}
          profile={
            post.manager_f_name.trim()[0] + post.manager_l_name.trim()[0]
          }
          icon={false}
        />
      </View>

      <Description
        description={post.short_desc}
        like_count={post.like_counter}
        comment_count={post.comment_counter}
        is_liked={post.is_liked}
        post_id={post.id}
        event_id={post.event_id}
        onOpenComments={onOpenComments}
        post={post}
      />

      {/* <TouchableOpacity
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
          View all {post.comment_counter} comments
        </CustomText>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginTop: 20,
    gap: 12,
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
});

export default CommunityCard;
