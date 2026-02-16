import React, { useState } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CustomText from "../../universal/lightText";
import { postRequest } from "../../api/commonQuery";
import { USER_LIKE_A_POST } from "../../constants/apiEndpoints";

type RootStackParamList = {
  eventDetail: undefined;
};

const MAX_LENGTH = 120; // *** character limit ***

const EventCard = ({
  description,
  like_count,
  comment_count,
  is_liked,
  post_id,
  event_id,
  setPosts,
}: {
  description: string;
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  post_id: string;
  event_id: string;
  setPosts: (posts: any) => void;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLong = description.length > MAX_LENGTH;
  const shownText = expanded ? description : description.slice(0, MAX_LENGTH);

  const likeAPost = async () => {
    try {
      setLoading(true);
      const res = await postRequest<{ status: any; message: string }>(
        USER_LIKE_A_POST,
        {
          post_id: post_id,
          event_id: event_id,
        },
      );

      if (res.status) {
        setPosts((prevPosts: any) =>
          prevPosts.map((p: any) =>
            p.id === post_id
              ? {
                  ...p,
                  is_liked: !p.is_liked,
                  like_counter: Boolean(p.is_liked)
                    ? Number(p.like_counter) - 1
                    : Number(p.like_counter) + 1,
                }
              : p,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Icons Row */}
      <View style={styles.iconRow}>
        <TouchableOpacity
          style={[styles.iconItem, loading && { opacity: 0.5 }]}
          onPress={likeAPost}
          activeOpacity={0.8}
          disabled={loading}
        >
          <FontAwesome
            name={is_liked ? "heart" : "heart-o"}
            size={20}
            color={is_liked ? colors.primary : colors.text}
          />
          <CustomText>{like_count}</CustomText>
        </TouchableOpacity>

        <View style={styles.iconItem}>
          <Ionicons name="chatbox-outline" size={20} />
          <CustomText>{comment_count}</CustomText>
        </View>

        {/* <View style={styles.iconItem}>
          <Feather name="send" size={20} />
          <CustomText>234</CustomText>
        </View> */}
      </View>

      {/* Description with View More/Less */}
      <View>
        <CustomText style={styles.descriptionText}>
          {shownText}
          {!expanded && isLong ? "..." : ""}
          {isLong && (
            <Pressable onPress={() => setExpanded(!expanded)}>
              <CustomText style={styles.viewMoreText}>
                {expanded ? "View less" : "View more"}
              </CustomText>
            </Pressable>
          )}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  iconRow: {
    flexDirection: "row",
    gap: 20,
  },

  iconItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  descriptionText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    fontFamily: "Geist-medium",
    lineHeight: 20,
  },

  viewMoreText: {
    color: "rgba(0, 122, 255, 1)",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 10,
  },
});

export default EventCard;
