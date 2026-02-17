import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { colors } from "../../../constants/Colors";
import CustomText from "../../../universal/lightText";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { USER_LIKE_A_POST } from "../../../constants/apiEndpoints";
import { postRequest } from "../../../api/commonQuery";
import { useCommunityPostStore } from "../../../store/communityPostStore";

const MAX_LENGTH = 120; // *** character limit ***

const Description = ({
  description,
  like_count,
  is_liked,
  comment_count,
  post_id,
  event_id,
}: {
  description: string;
  like_count: number;
  is_liked: boolean;
  comment_count: number;
  post_id: string;
  event_id: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likeAndComment, setLikeAndComment] = useState({
    like_count: like_count,
    comment_count: comment_count,
    is_liked: is_liked,
  });
  const posts = useCommunityPostStore((state) => state.posts);
  const setPosts = useCommunityPostStore((state) => state.setPosts);

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
        setPosts(
          posts.map((post) => {
            return post.id === post_id
              ? {
                  ...post,
                  is_liked: !post.is_liked,
                  like_counter: Boolean(post.is_liked)
                    ? Number(post.like_counter) - 1
                    : Number(post.like_counter) + 1,
                }
              : post;
          }),
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    for (let i = 0; i < posts.length; i++) {
      const element = posts[i];
      if (element.id === post_id) {
        setLikeAndComment({
          is_liked: element.is_liked,
          like_count: element.like_counter,
          comment_count: element.comment_counter,
        });
      }
    }
  }, [posts]);

  return (
    <View style={styles.container}>
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

      {/* Icons Row */}
      <View style={styles.iconRow}>
        <TouchableOpacity
          style={[styles.iconItem, loading && { opacity: 0.5 }]}
          onPress={likeAPost}
          activeOpacity={0.8}
          disabled={loading}
        >
          <FontAwesome
            name={likeAndComment.is_liked ? "heart" : "heart-o"}
            size={20}
            color={likeAndComment.is_liked ? colors.primary : colors.text}
          />
          <CustomText>{likeAndComment.like_count}</CustomText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconItem} activeOpacity={0.7}>
          <Ionicons name="chatbox-outline" size={20} />
          <CustomText>{likeAndComment.comment_count}</CustomText>
        </TouchableOpacity>
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

export default Description;
